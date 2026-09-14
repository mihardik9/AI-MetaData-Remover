import { CleanEngine, CleanFormat, SanitizationConfig } from '../types';

/**
 * Sanitizes an image by stripping all AI metadata, EXIF tags, C2PA manifests, and text chunks.
 */
export async function sanitizeImage(
  file: File,
  config: SanitizationConfig
): Promise<{ blob: Blob; mimeType: string; width: number; height: number }> {
  const mimeType = resolveMimeType(file, config.format);

  // If maintaining original format or binary engine is requested, try lossless binary strip first
  const tryBinary = config.engine === 'binary' || (config.format === 'auto' && (file.type.includes('png') || file.type.includes('jpeg')));

  if (tryBinary) {
    try {
      const buffer = await file.arrayBuffer();
      const stripped = stripBinaryMetadata(buffer, file.type);
      if (stripped && stripped.byteLength > 0) {
        const { width, height } = await getImageDimensions(file);
        return {
          blob: new Blob([stripped], { type: file.type }),
          mimeType: file.type,
          width,
          height,
        };
      }
    } catch (e) {
      console.warn('Binary strip fallback to canvas re-encoding:', e);
    }
  }

  // Canvas raster re-encoding with 100% maximum quality
  return await sanitizeViaCanvas(file, mimeType, config.jpegQuality ?? 1.0);
}

function resolveMimeType(file: File, format: CleanFormat): string {
  if (format === 'png') return 'image/png';
  if (format === 'jpeg') return 'image/jpeg';
  if (format === 'webp') return 'image/webp';

  // auto: preserve original format if recognized
  const type = file.type.toLowerCase();
  if (type.includes('png')) return 'image/png';
  if (type.includes('webp')) return 'image/webp';
  return 'image/jpeg';
}

async function sanitizeViaCanvas(
  file: File,
  mimeType: string,
  quality: number
): Promise<{ blob: Blob; mimeType: string; width: number; height: number }> {
  let imgBitmap: ImageBitmap | HTMLImageElement;
  let width = 0;
  let height = 0;

  if (typeof createImageBitmap === 'function') {
    try {
      imgBitmap = await createImageBitmap(file);
      width = imgBitmap.width;
      height = imgBitmap.height;
    } catch {
      const img = await loadHtmlImage(file);
      imgBitmap = img;
      width = img.naturalWidth;
      height = img.naturalHeight;
    }
  } else {
    const img = await loadHtmlImage(file);
    imgBitmap = img;
    width = img.naturalWidth;
    height = img.naturalHeight;
  }

  // Draw to clean canvas
  let cleanBlob: Blob;

  if (typeof OffscreenCanvas !== 'undefined') {
    const canvas = new OffscreenCanvas(width, height);
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) throw new Error('Could not get OffscreenCanvas 2D context');
    
    // Fill white background for JPEG if source had transparency
    if (mimeType === 'image/jpeg') {
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, width, height);
    }

    ctx.drawImage(imgBitmap, 0, 0);

    const exportQuality = mimeType === 'image/jpeg' ? quality : undefined;
    cleanBlob = await canvas.convertToBlob({
      type: mimeType,
      quality: exportQuality,
    });
  } else {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) throw new Error('Could not get Canvas 2D context');

    if (mimeType === 'image/jpeg') {
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, width, height);
    }

    ctx.drawImage(imgBitmap, 0, 0);

    cleanBlob = await new Promise<Blob>((resolve, reject) => {
      canvas.toBlob(
        (b) => {
          if (b) resolve(b);
          else reject(new Error('Canvas export failed'));
        },
        mimeType,
        mimeType === 'image/jpeg' ? quality : undefined
      );
    });
  }

  // Clean up ImageBitmap if applicable
  if ('close' in imgBitmap && typeof imgBitmap.close === 'function') {
    imgBitmap.close();
  }

  return {
    blob: cleanBlob,
    mimeType,
    width,
    height,
  };
}

function loadHtmlImage(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve(img);
    };
    img.onerror = (err) => {
      URL.revokeObjectURL(url);
      reject(err);
    };
    img.src = url;
  });
}

async function getImageDimensions(file: File): Promise<{ width: number; height: number }> {
  try {
    const img = await loadHtmlImage(file);
    return { width: img.naturalWidth, height: img.naturalHeight };
  } catch {
    return { width: 0, height: 0 };
  }
}

/**
 * Binary surgery for PNG and JPEG to strip metadata segments while leaving raw pixel streams untouched.
 */
function stripBinaryMetadata(buffer: ArrayBuffer, mimeType: string): ArrayBuffer | null {
  const bytes = new Uint8Array(buffer);

  // PNG surgery
  if (mimeType.includes('png') || (bytes.length > 8 && bytes[0] === 0x89 && bytes[1] === 0x50)) {
    return stripPngChunks(bytes);
  }

  // JPEG surgery
  if (mimeType.includes('jpeg') || (bytes.length > 3 && bytes[0] === 0xFF && bytes[1] === 0xD8)) {
    return stripJpegSegments(bytes);
  }

  return null;
}

function stripPngChunks(bytes: Uint8Array): ArrayBuffer {
  // Retain PNG signature (8 bytes)
  // Keep only IHDR, PLTE, IDAT, IEND, tRNS, sRGB, gAMA
  // Discard tEXt, zTXt, iTXt, eXIf, caDA, caHA, dSIG
  const allowedChunks = new Set(['IHDR', 'PLTE', 'IDAT', 'IEND', 'tRNS', 'sRGB', 'gAMA']);
  const chunksToKeep: Uint8Array[] = [bytes.subarray(0, 8)];

  let offset = 8;
  while (offset + 8 <= bytes.length) {
    const length = (bytes[offset] << 24) | (bytes[offset + 1] << 16) | (bytes[offset + 2] << 8) | bytes[offset + 3];
    const chunkType = String.fromCharCode(bytes[offset + 4], bytes[offset + 5], bytes[offset + 6], bytes[offset + 7]);
    const totalChunkLength = 12 + length; // 4 len + 4 type + data + 4 crc

    if (offset + totalChunkLength > bytes.length) break;

    if (allowedChunks.has(chunkType)) {
      chunksToKeep.push(bytes.subarray(offset, offset + totalChunkLength));
    }

    offset += totalChunkLength;
  }

  const totalLength = chunksToKeep.reduce((acc, curr) => acc + curr.length, 0);
  const result = new Uint8Array(totalLength);
  let pos = 0;
  for (const chunk of chunksToKeep) {
    result.set(chunk, pos);
    pos += chunk.length;
  }

  return result.buffer;
}

function stripJpegSegments(bytes: Uint8Array): ArrayBuffer {
  // Retain SOI (0xFFD8)
  // Drop APP1 (0xFFE1 EXIF/XMP), APP11 (0xFFEB C2PA), APP13 (0xFFED IPTC), COM (0xFFFE)
  // Retain APP0 (JFIF standard), DQT, DHT, SOF0, SOS, etc.
  const droppedMarkers = new Set([0xE1, 0xEB, 0xED, 0xFE]);
  const parts: Uint8Array[] = [bytes.subarray(0, 2)]; // 0xFF 0xD8

  let offset = 2;
  while (offset < bytes.length) {
    if (bytes[offset] !== 0xFF) {
      offset++;
      continue;
    }

    const marker = bytes[offset + 1];

    // SOS (Start of Scan) marks the beginning of the compressed image stream
    if (marker === 0xDA) {
      // Append everything from SOS to end of file (including SOS marker)
      parts.push(bytes.subarray(offset));
      break;
    }

    // Standalone markers
    if (marker === 0xD9) { // EOI
      parts.push(bytes.subarray(offset, offset + 2));
      break;
    }

    // Variable length markers
    if (offset + 4 > bytes.length) break;
    const length = (bytes[offset + 2] << 8) | bytes[offset + 3];

    if (droppedMarkers.has(marker)) {
      // Skip this metadata segment
      offset += 2 + length;
    } else {
      // Keep segment
      parts.push(bytes.subarray(offset, offset + 2 + length));
      offset += 2 + length;
    }
  }

  const totalLength = parts.reduce((acc, curr) => acc + curr.length, 0);
  const result = new Uint8Array(totalLength);
  let pos = 0;
  for (const part of parts) {
    result.set(part, pos);
    pos += part.length;
  }

  return result.buffer;
}
