/**
 * Utility to generate realistic demo AI images with authentic embedded metadata
 * (e.g., Stable Diffusion parameters, ComfyUI workflow, Midjourney prompt tags, DALL-E signatures)
 * so users can test immediately with 1 click without needing an external file.
 */

export interface SamplePreset {
  id: string;
  name: string;
  badge: string;
  generator: string;
  prompt: string;
  description: string;
  createFile: () => Promise<File>;
}

// CRC32 table for valid PNG chunk synthesis
const crcTable: number[] = (() => {
  const table: number[] = [];
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) {
      c = (c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1);
    }
    table[n] = c >>> 0;
  }
  return table;
})();

function crc32(buf: Uint8Array): number {
  let crc = 0xFFFFFFFF;
  for (let i = 0; i < buf.length; i++) {
    crc = (crc >>> 8) ^ crcTable[(crc ^ buf[i]) & 0xFF];
  }
  return (crc ^ 0xFFFFFFFF) >>> 0;
}

function makePngChunk(type: string, data: Uint8Array): Uint8Array {
  const len = data.length;
  const chunk = new Uint8Array(12 + len);
  // Length (big-endian)
  chunk[0] = (len >>> 24) & 0xFF;
  chunk[1] = (len >>> 16) & 0xFF;
  chunk[2] = (len >>> 8) & 0xFF;
  chunk[3] = len & 0xFF;

  // Type (4 ASCII chars)
  for (let i = 0; i < 4; i++) {
    chunk[4 + i] = type.charCodeAt(i);
  }

  // Data
  chunk.set(data, 8);

  // CRC calculated over type and data
  const crcTarget = new Uint8Array(4 + len);
  for (let i = 0; i < 4; i++) crcTarget[i] = type.charCodeAt(i);
  crcTarget.set(data, 4);
  const crcVal = crc32(crcTarget);

  chunk[8 + len] = (crcVal >>> 24) & 0xFF;
  chunk[9 + len] = (crcVal >>> 16) & 0xFF;
  chunk[10 + len] = (crcVal >>> 8) & 0xFF;
  chunk[11 + len] = crcVal & 0xFF;

  return chunk;
}

function createSyntheticPng(width: number, height: number, color: [number, number, number], metadataTextChunks: Array<{ keyword: string; text: string }>): Uint8Array {
  // Minimal PNG creation
  // Signature
  const sig = new Uint8Array([137, 80, 78, 71, 13, 10, 26, 10]);

  // IHDR
  const ihdrData = new Uint8Array(13);
  ihdrData[0] = (width >>> 24) & 0xFF;
  ihdrData[1] = (width >>> 16) & 0xFF;
  ihdrData[2] = (width >>> 8) & 0xFF;
  ihdrData[3] = width & 0xFF;
  ihdrData[4] = (height >>> 24) & 0xFF;
  ihdrData[5] = (height >>> 16) & 0xFF;
  ihdrData[6] = (height >>> 8) & 0xFF;
  ihdrData[7] = height & 0xFF;
  ihdrData[8] = 8; // 8 bits depth
  ihdrData[9] = 2; // RGB color type
  ihdrData[10] = 0; // compression
  ihdrData[11] = 0; // filter
  ihdrData[12] = 0; // interlace
  const ihdrChunk = makePngChunk('IHDR', ihdrData);

  // tEXt metadata chunks
  const textChunks: Uint8Array[] = [];
  const encoder = new TextEncoder();
  for (const { keyword, text } of metadataTextChunks) {
    const kBytes = encoder.encode(keyword);
    const tBytes = encoder.encode(text);
    const chunkData = new Uint8Array(kBytes.length + 1 + tBytes.length);
    chunkData.set(kBytes, 0);
    chunkData[kBytes.length] = 0; // Null separator
    chunkData.set(tBytes, kBytes.length + 1);
    textChunks.push(makePngChunk('tEXt', chunkData));
  }

  // Draw simple raster into canvas to get a valid compressed IDAT
  // or use canvas to generate base image, then inject our custom chunks!
  return assemblePngWithChunks(width, height, color, textChunks);
}

function assemblePngWithChunks(width: number, height: number, color: [number, number, number], customChunks: Uint8Array[]): Uint8Array {
  // Create offscreen canvas for visual pattern
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d')!;

  // Draw aesthetic gradient
  const grad = ctx.createLinearGradient(0, 0, width, height);
  grad.addColorStop(0, `rgb(${color[0]}, ${color[1]}, ${color[2]})`);
  grad.addColorStop(1, `rgb(${Math.max(0, color[0] - 60)}, ${Math.max(0, color[1] - 60)}, ${Math.max(0, color[2] - 60)})`);
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, width, height);

  // Geometric AI accent motif
  ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
  ctx.beginPath();
  ctx.arc(width / 2, height / 2, width / 3.5, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
  ctx.font = 'bold 24px system-ui, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('AI DEMO SAMPLE', width / 2, height / 2 - 10);
  ctx.font = '14px system-ui, sans-serif';
  ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
  ctx.fillText('Contains embedded AI prompts & tags', width / 2, height / 2 + 20);

  // Get base PNG data URL
  const dataUrl = canvas.toDataURL('image/png');
  const base64 = dataUrl.split(',')[1];
  const binaryString = atob(base64);
  const baseBytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    baseBytes[i] = binaryString.charCodeAt(i);
  }

  // Inject customChunks right after IHDR
  // IHDR ends at 8 (signature) + 25 (IHDR chunk total length) = 33
  const ihdrEnd = 33;
  const totalCustomLength = customChunks.reduce((acc, c) => acc + c.length, 0);
  const combined = new Uint8Array(baseBytes.length + totalCustomLength);

  combined.set(baseBytes.subarray(0, ihdrEnd), 0);
  let pos = ihdrEnd;
  for (const chunk of customChunks) {
    combined.set(chunk, pos);
    pos += chunk.length;
  }
  combined.set(baseBytes.subarray(ihdrEnd), pos);

  return combined;
}

export const SAMPLE_PRESETS: SamplePreset[] = [
  {
    id: 'sd-cyberpunk',
    name: 'Stable Diffusion (SDXL)',
    badge: 'A1111 Parameters',
    generator: 'Stable Diffusion / Automatic1111',
    prompt: 'cinematic portrait of futuristic cyberpunk engineer, neon ambient backlight, octane render, 8k resolution, photorealistic, intricate details\nNegative prompt: cartoon, blurry, lowres, bad anatomy, deformed, oversaturated\nSteps: 30, Sampler: DPM++ 2M Karras, CFG scale: 7.0, Seed: 3948201948, Size: 832x1216, Model hash: 7e2f5b89, Model: sdxl_v1.0',
    description: 'Embedded with full parameters tEXt chunk including negative prompt, seed, sampler & model hash.',
    createFile: async () => {
      const bytes = createSyntheticPng(640, 640, [30, 41, 59], [
        {
          keyword: 'parameters',
          text: 'cinematic portrait of futuristic cyberpunk engineer, neon ambient backlight, octane render, 8k resolution, photorealistic, intricate details\nNegative prompt: cartoon, blurry, lowres, bad anatomy, deformed, oversaturated\nSteps: 30, Sampler: DPM++ 2M Karras, CFG scale: 7.0, Seed: 3948201948, Size: 832x1216, Model hash: 7e2f5b89, Model: sdxl_v1.0',
        },
        {
          keyword: 'Software',
          text: 'AUTOMATIC1111 / WebUI',
        },
      ]);
      return new File([bytes], 'sdxl_cyberpunk_with_ai_metadata.png', { type: 'image/png' });
    },
  },
  {
    id: 'midjourney-v6',
    name: 'Midjourney v6',
    badge: 'Prompt & Engine Tags',
    generator: 'Midjourney',
    prompt: 'architectural photography of a minimalist scandinavian villa overlooking a misty norwegian fjord, golden hour natural light, 35mm photograph --v 6.0 --ar 16:9 --style raw',
    description: 'Embedded with Midjourney generation tags, aspect ratio flags, and IPTC trainedAlgorithmicMedia flags.',
    createFile: async () => {
      const bytes = createSyntheticPng(640, 480, [15, 76, 92], [
        {
          keyword: 'Description',
          text: 'architectural photography of a minimalist scandinavian villa overlooking a misty norwegian fjord, golden hour natural light, 35mm photograph --v 6.0 --ar 16:9 --style raw',
        },
        {
          keyword: 'Software',
          text: 'Midjourney v6.0 Engine',
        },
        {
          keyword: 'Source',
          text: 'trainedAlgorithmicMedia / Midjourney bot',
        },
      ]);
      return new File([bytes], 'midjourney_norway_villa_metadata.png', { type: 'image/png' });
    },
  },
  {
    id: 'dalle-c2pa',
    name: 'DALL-E 3 & C2PA',
    badge: 'C2PA Content Credentials',
    generator: 'DALL-E 3 / OpenAI',
    prompt: 'Whimsical watercolor illustration of a red fox wearing a scarf reading an old book in a cozy mushroom cottage, warm embers glowing',
    description: 'Embedded with C2PA / Content Credentials provenance manifest and IPTC digitalSourceType tags.',
    createFile: async () => {
      const bytes = createSyntheticPng(640, 640, [180, 83, 9], [
        {
          keyword: 'c2pa',
          text: 'c2pa:manifest/jumbf:urn:c2pa:openai:dall-e-3:assertion:trainedAlgorithmicMedia',
        },
        {
          keyword: 'prompt',
          text: 'Whimsical watercolor illustration of a red fox wearing a scarf reading an old book in a cozy mushroom cottage, warm embers glowing',
        },
        {
          keyword: 'Comment',
          text: 'Generated with DALL-E 3 by OpenAI. Content Credentials provenance attached.',
        },
      ]);
      return new File([bytes], 'dalle3_c2pa_manifest_sample.png', { type: 'image/png' });
    },
  },
];
