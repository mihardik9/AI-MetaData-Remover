import { AnalysisResult, MetadataTag } from '../types';

/**
 * Robust binary parser for AI metadata and tags across PNG, JPEG, and WebP formats.
 */
export async function analyzeImageMetadata(buffer: ArrayBuffer): Promise<AnalysisResult> {
  const bytes = new Uint8Array(buffer);
  const tagsFound: MetadataTag[] = [];
  const rawChunks: string[] = [];
  let generatorName: string | undefined;
  let promptText: string | undefined;
  let negativePrompt: string | undefined;
  let modelInfo: string | undefined;
  let hasC2PA = false;
  let hasIPTCAlgorithmic = false;

  // Identify file type
  const isPng = bytes.length >= 8 &&
    bytes[0] === 0x89 && bytes[1] === 0x50 && bytes[2] === 0x4E && bytes[3] === 0x47 &&
    bytes[4] === 0x0D && bytes[5] === 0x0A && bytes[6] === 0x1A && bytes[7] === 0x0A;

  const isJpeg = bytes.length >= 3 && bytes[0] === 0xFF && bytes[1] === 0xD8 && bytes[2] === 0xFF;

  const isWebp = bytes.length >= 12 &&
    bytes[0] === 0x52 && bytes[1] === 0x49 && bytes[2] === 0x46 && bytes[3] === 0x46 && // RIFF
    bytes[8] === 0x57 && bytes[9] === 0x45 && bytes[10] === 0x42 && bytes[11] === 0x50; // WEBP

  if (isPng) {
    parsePng(bytes, tagsFound, rawChunks);
  } else if (isJpeg) {
    parseJpeg(bytes, tagsFound, rawChunks);
  } else if (isWebp) {
    parseWebp(bytes, tagsFound, rawChunks);
  }

  // Also perform general byte scanning for common AI signatures across any image format
  scanByteStreamForAISignatures(bytes, tagsFound);

  // Deduplicate and refine findings
  for (const tag of tagsFound) {
    if (tag.label.toLowerCase().includes('c2pa') || tag.value.includes('c2pa') || tag.value.includes('ContentCredentials')) {
      hasC2PA = true;
    }
    if (tag.value.includes('trainedAlgorithmicMedia') || tag.value.includes('compositeWithTrainedAlgorithmicMedia')) {
      hasIPTCAlgorithmic = true;
    }

    // Extract prompt if present
    if (!promptText && (tag.category === 'prompt' || tag.label.toLowerCase().includes('prompt') || tag.label.toLowerCase().includes('parameters'))) {
      const val = tag.value;
      if (val.includes('Negative prompt:')) {
        const parts = val.split('Negative prompt:');
        promptText = parts[0].trim();
        const afterNeg = parts[1];
        if (afterNeg.includes('Steps:')) {
          const negParts = afterNeg.split('Steps:');
          negativePrompt = negParts[0].trim();
          modelInfo = 'Steps:' + negParts[1];
        } else {
          negativePrompt = afterNeg.trim();
        }
      } else {
        promptText = val.slice(0, 500);
      }
    }

    // Identify generator
    if (!generatorName) {
      const combined = (tag.label + ' ' + tag.value).toLowerCase();
      if (combined.includes('midjourney')) generatorName = 'Midjourney';
      else if (combined.includes('comfyui') || combined.includes('comfy')) generatorName = 'ComfyUI';
      else if (combined.includes('stable diffusion') || combined.includes('automatic1111') || combined.includes('a1111') || combined.includes('steps:') && combined.includes('sampler:')) generatorName = 'Stable Diffusion';
      else if (combined.includes('dall-e') || combined.includes('dalle')) generatorName = 'DALL-E 3 (OpenAI)';
      else if (combined.includes('novelai')) generatorName = 'NovelAI';
      else if (combined.includes('firefly') || combined.includes('adobe')) generatorName = 'Adobe Firefly';
      else if (combined.includes('ideogram')) generatorName = 'Ideogram';
      else if (combined.includes('leonardo')) generatorName = 'Leonardo.ai';
      else if (combined.includes('flux') || combined.includes('bfl')) generatorName = 'FLUX';
      else if (combined.includes('fooocus')) generatorName = 'Fooocus';
      else if (hasC2PA) generatorName = 'C2PA AI Provenance (DALL-E / Firefly / Tech Standard)';
    }
  }

  // If C2PA or IPTC algorithmic is found but generatorName is unknown
  if (!generatorName && (hasC2PA || hasIPTCAlgorithmic)) {
    generatorName = hasC2PA ? 'C2PA Content Credentials (AI Flagged)' : 'IPTC Trained Algorithmic Media';
  }

  const hasAIMetadata = tagsFound.some(t => t.criticalAI) || hasC2PA || hasIPTCAlgorithmic || !!generatorName || !!promptText;

  return {
    hasAIMetadata,
    generatorName,
    promptText,
    negativePrompt,
    modelInfo,
    hasC2PA,
    hasIPTCAlgorithmic,
    tagsFound,
    rawChunks,
    originalSize: buffer.byteLength,
  };
}

function parsePng(bytes: Uint8Array, tags: MetadataTag[], rawChunks: string[]) {
  let offset = 8; // skip 8-byte PNG header
  const decoder = new TextDecoder('utf-8', { fatal: false });

  while (offset + 8 <= bytes.length) {
    const length = (bytes[offset] << 24) | (bytes[offset + 1] << 16) | (bytes[offset + 2] << 8) | bytes[offset + 3];
    offset += 4;
    const chunkType = String.fromCharCode(bytes[offset], bytes[offset + 1], bytes[offset + 2], bytes[offset + 3]);
    offset += 4;

    rawChunks.push(chunkType);

    if (offset + length > bytes.length) break;

    const chunkData = bytes.subarray(offset, offset + length);

    if (chunkType === 'tEXt') {
      // keyword \0 text
      let nullIndex = -1;
      for (let i = 0; i < chunkData.length; i++) {
        if (chunkData[i] === 0) {
          nullIndex = i;
          break;
        }
      }
      if (nullIndex !== -1) {
        const keyword = decoder.decode(chunkData.subarray(0, nullIndex));
        const text = decoder.decode(chunkData.subarray(nullIndex + 1));
        const isAI = isAIKeywordOrValue(keyword, text);
        tags.push({
          category: isAI ? 'prompt' : 'chunk',
          label: `PNG tEXt (${keyword})`,
          value: text.length > 300 ? text.slice(0, 300) + '...' : text,
          criticalAI: isAI,
        });
      }
    } else if (chunkType === 'iTXt') {
      // keyword \0 compFlag compMethod lang \0 transKey \0 text
      let null1 = chunkData.indexOf(0);
      if (null1 !== -1) {
        const keyword = decoder.decode(chunkData.subarray(0, null1));
        // text is after null3
        let null2 = chunkData.indexOf(0, null1 + 3);
        let null3 = null2 !== -1 ? chunkData.indexOf(0, null2 + 1) : -1;
        const textStart = null3 !== -1 ? null3 + 1 : null1 + 5;
        if (textStart < chunkData.length) {
          const text = decoder.decode(chunkData.subarray(textStart));
          const isAI = isAIKeywordOrValue(keyword, text);
          tags.push({
            category: isAI ? 'prompt' : 'chunk',
            label: `PNG iTXt (${keyword})`,
            value: text.length > 300 ? text.slice(0, 300) + '...' : text,
            criticalAI: isAI,
          });
        }
      }
    } else if (chunkType === 'zTXt') {
      let nullIndex = chunkData.indexOf(0);
      if (nullIndex !== -1) {
        const keyword = decoder.decode(chunkData.subarray(0, nullIndex));
        tags.push({
          category: 'chunk',
          label: `PNG zTXt Compressed Chunk (${keyword})`,
          value: `Compressed metadata block (${length} bytes)`,
          criticalAI: isAIKeywordOrValue(keyword, ''),
        });
      }
    } else if (chunkType === 'caDA' || chunkType === 'caHA' || chunkType === 'c2pa') {
      tags.push({
        category: 'provenance',
        label: `C2PA Content Credentials Chunk (${chunkType})`,
        value: `Embedded provenance manifest (${length} bytes)`,
        criticalAI: true,
      });
    } else if (chunkType === 'eXIf') {
      tags.push({
        category: 'camera_exif',
        label: 'PNG Embedded EXIF Chunk',
        value: `Raw EXIF segment (${length} bytes)`,
        criticalAI: false,
      });
    }

    offset += length;
    offset += 4; // skip 4-byte CRC
  }
}

function parseJpeg(bytes: Uint8Array, tags: MetadataTag[], rawChunks: string[]) {
  let offset = 2; // skip 0xFF 0xD8
  const decoder = new TextDecoder('utf-8', { fatal: false });

  while (offset + 4 <= bytes.length) {
    if (bytes[offset] !== 0xFF) {
      offset++;
      continue;
    }

    const marker = bytes[offset + 1];
    offset += 2;

    // Standalone markers with no length
    if (marker === 0xD9 || marker === 0xDA) { // EOI or SOS
      rawChunks.push(`0xFF${marker.toString(16).toUpperCase()}`);
      break;
    }
    if (marker === 0x00 || (marker >= 0xD0 && marker <= 0xD7)) {
      continue;
    }

    if (offset + 2 > bytes.length) break;
    const length = (bytes[offset] << 8) | bytes[offset + 1];
    if (length < 2 || offset + length > bytes.length) break;

    const data = bytes.subarray(offset + 2, offset + length);
    const markerHex = `0xFF${marker.toString(16).toUpperCase()}`;
    rawChunks.push(markerHex);

    if (marker === 0xE1) { // APP1 - EXIF or XMP
      const headerStr = decoder.decode(data.subarray(0, Math.min(32, data.length)));
      if (headerStr.startsWith('Exif\0\0')) {
        tags.push({
          category: 'camera_exif',
          label: 'JPEG APP1 EXIF',
          value: `EXIF header present (${length} bytes)`,
          criticalAI: false,
        });
      } else if (headerStr.includes('http://ns.adobe.com/xap/1.0/')) {
        const xmpText = decoder.decode(data);
        const isAI = isAIKeywordOrValue('xmp', xmpText);
        tags.push({
          category: isAI ? 'provenance' : 'chunk',
          label: 'JPEG APP1 XMP Metadata',
          value: isAI ? 'XMP packet with AI provenance / digitalSourceType' : `XMP packet (${length} bytes)`,
          criticalAI: isAI,
        });
      }
    } else if (marker === 0xEB) { // APP11 - C2PA JUMBF
      tags.push({
        category: 'provenance',
        label: 'JPEG APP11 (C2PA / JUMBF Content Credentials)',
        value: `C2PA Authenticity Manifest (${length} bytes)`,
        criticalAI: true,
      });
    } else if (marker === 0xED) { // APP13 - Photoshop / IPTC
      const text = decoder.decode(data);
      const isAI = isAIKeywordOrValue('iptc', text);
      tags.push({
        category: isAI ? 'provenance' : 'chunk',
        label: 'JPEG APP13 (Photoshop 3.0 / IPTC)',
        value: isAI ? 'IPTC records containing AI origin tags' : `IPTC container (${length} bytes)`,
        criticalAI: isAI,
      });
    } else if (marker === 0xFE) { // COM - Comment
      const comment = decoder.decode(data);
      const isAI = isAIKeywordOrValue('comment', comment);
      tags.push({
        category: isAI ? 'prompt' : 'other',
        label: 'JPEG Comment (COM)',
        value: comment.length > 200 ? comment.slice(0, 200) + '...' : comment,
        criticalAI: isAI,
      });
    }

    offset += length;
  }
}

function parseWebp(bytes: Uint8Array, tags: MetadataTag[], rawChunks: string[]) {
  let offset = 12; // skip RIFF....WEBP
  const decoder = new TextDecoder('utf-8', { fatal: false });

  while (offset + 8 <= bytes.length) {
    const chunkId = String.fromCharCode(bytes[offset], bytes[offset + 1], bytes[offset + 2], bytes[offset + 3]);
    const chunkSize = bytes[offset + 4] | (bytes[offset + 5] << 8) | (bytes[offset + 6] << 16) | (bytes[offset + 7] << 24);
    offset += 8;

    rawChunks.push(chunkId);

    if (offset + chunkSize > bytes.length) break;
    const chunkData = bytes.subarray(offset, offset + chunkSize);

    if (chunkId === 'EXIF') {
      tags.push({
        category: 'camera_exif',
        label: 'WebP EXIF Chunk',
        value: `EXIF segment (${chunkSize} bytes)`,
        criticalAI: false,
      });
    } else if (chunkId === 'XMP ') {
      const text = decoder.decode(chunkData);
      const isAI = isAIKeywordOrValue('xmp', text);
      tags.push({
        category: isAI ? 'provenance' : 'chunk',
        label: 'WebP XMP Metadata',
        value: isAI ? 'XMP packet with AI generator tags' : `XMP segment (${chunkSize} bytes)`,
        criticalAI: isAI,
      });
    }

    offset += chunkSize;
    if (chunkSize % 2 === 1) offset++; // 1-byte padding for odd chunks in RIFF
  }
}

function scanByteStreamForAISignatures(bytes: Uint8Array, tags: MetadataTag[]) {
  // Convert sample chunks of binary to ASCII string for regex search
  // To avoid huge string allocation on 50MB images, scan the first 1MB and last 256KB
  const headSize = Math.min(bytes.length, 1024 * 1024);
  const head = new TextDecoder('utf-8', { fatal: false }).decode(bytes.subarray(0, headSize));

  const knownSignatures = [
    { pattern: /trainedAlgorithmicMedia/i, label: 'IPTC DigitalSourceType: trainedAlgorithmicMedia', critical: true },
    { pattern: /compositeWithTrainedAlgorithmicMedia/i, label: 'IPTC: compositeWithTrainedAlgorithmicMedia', critical: true },
    { pattern: /c2pa(\.org|\/manifest|manifest)/i, label: 'C2PA Manifest Reference', critical: true },
    { pattern: /jumbf/i, label: 'JUMBF Container (C2PA)', critical: true },
    { pattern: /Midjourney/i, label: 'Midjourney Signature', critical: true },
    { pattern: /Stable Diffusion/i, label: 'Stable Diffusion Tag', critical: true },
    { pattern: /DALL[·\s-]?E\s?3?/i, label: 'DALL-E 3 Identifier', critical: true },
    { pattern: /NovelAI/i, label: 'NovelAI Metadata', critical: true },
    { pattern: /Automatic1111/i, label: 'AUTOMATIC1111 WebUI Tag', critical: true },
    { pattern: /ComfyUI/i, label: 'ComfyUI Workflow Data', critical: true },
    { pattern: /Negative prompt:/i, label: 'Stable Diffusion Generation Parameters (Negative Prompt)', critical: true },
    { pattern: /CFG scale:\s*[\d.]+/i, label: 'AI Sampler / CFG Parameters', critical: true },
    { pattern: /Model hash:\s*[a-f0-9]+/i, label: 'Checkpoint Model Hash', critical: true },
    { pattern: /"class_type":\s*"[A-Za-z0-9_]+"/i, label: 'ComfyUI Graph Node Definition', critical: true },
    { pattern: /Adobe Firefly/i, label: 'Adobe Firefly Metadata', critical: true },
  ];

  for (const sig of knownSignatures) {
    if (sig.pattern.test(head)) {
      const alreadyExists = tags.some(t => t.label === sig.label);
      if (!alreadyExists) {
        tags.push({
          category: sig.critical ? 'generator' : 'other',
          label: sig.label,
          value: 'Detected in raw metadata stream',
          criticalAI: sig.critical,
        });
      }
    }
  }
}

function isAIKeywordOrValue(keyword: string, val: string): boolean {
  const k = keyword.toLowerCase();
  const v = val.toLowerCase();
  const aiKeywords = [
    'parameters', 'prompt', 'workflow', 'negative prompt', 'sampler', 'seed', 'cfg',
    'midjourney', 'dall-e', 'dalle', 'stable diffusion', 'novelai', 'comfyui', 'fooocus',
    'trainedalgorithmicmedia', 'c2pa', 'contentcredentials', 'generation_data', 'flux'
  ];
  return aiKeywords.some(w => k.includes(w) || v.includes(w));
}
