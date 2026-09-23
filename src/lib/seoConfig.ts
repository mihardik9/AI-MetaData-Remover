export interface RouteSeoConfig {
  path: string;
  canonicalUrl: string;
  title: string;
  metaDescription: string;
  h1: string;
  subtitle: string;
  activeTool: 'image' | 'hyphen';
  badgeText: string;
  keywords: string;
  ogTitle: string;
  ogDescription: string;
  faqList: { question: string; answer: string }[];
  contentSections: {
    heading: string;
    body: string[];
  }[];
}

export const BASE_CANONICAL_DOMAIN = 'https://airemover.online';

export const SEO_ROUTES: Record<string, RouteSeoConfig> = {
  '/': {
    path: '/',
    canonicalUrl: `${BASE_CANONICAL_DOMAIN}/`,
    title: 'AI Tag Remover – Remove AI Metadata & Tags Online Free | AIremover',
    metaDescription: 'Remove AI-related metadata and tags from supported files online with AIremover. Fast, simple and privacy-focused AI tag removal tool.',
    h1: 'AI Tag Remover',
    subtitle: 'Remove AI-related metadata, tags, embedded prompts, EXIF markers, and C2PA Content Credentials from supported files online with AIremover.',
    activeTool: 'image',
    badgeText: '100% Quality Preserved • Prompts & Provenance Purged',
    keywords: 'AI tag remover, AI metadata remover, remove AI metadata, AI-generated metadata, metadata cleaner, remove AI tags, online AI tag remover, free AI tag remover',
    ogTitle: 'AI Tag Remover – AIremover',
    ogDescription: 'Remove AI-related tags and metadata from supported files with AIremover.',
    faqList: [
      {
        question: 'What is an AI tag remover?',
        answer: 'An AI tag remover is a specialized tool that strips machine-generated metadata, identification tags, embedded prompt texts, sampler configurations, and cryptographic provenance headers (such as C2PA Content Credentials) from files produced by generative AI tools.',
      },
      {
        question: 'What is AI metadata?',
        answer: 'AI metadata refers to technical data written into media files during generation. This includes embedded positive and negative text prompts, random seed numbers, model checkpoint names, sampler settings, workflow graphs (such as ComfyUI JSON), and digital authenticity signatures like C2PA or IPTC digitalSourceType.',
      },
      {
        question: 'Can AI metadata be removed from images?',
        answer: 'Yes. AIremover removes AI metadata from PNG, JPEG, WebP, and AVIF images by performing binary chunk surgery on header sections (such as PNG tEXt/zTXt/iTXt chunks, JPEG APP1 EXIF, and APP11 JUMBF boxes) or by clean raster re-encoding, preserving exact visual pixel quality.',
      },
      {
        question: 'Does AIremover store uploaded files?',
        answer: 'No. AIremover executes entirely client-side inside your web browser memory. Your images and text inputs are never uploaded to any remote server, cloud storage, or external database.',
      },
      {
        question: 'Is AIremover free?',
        answer: 'Yes, AIremover is 100% free to use. There are no subscriptions, hidden fees, account requirements, or daily usage caps.',
      },
      {
        question: 'What file formats are supported?',
        answer: 'For image metadata and AI tag removal, AIremover supports PNG, JPEG/JPG, WebP, and AVIF files. For the text AI Hyphen Remover, any copied or pasted text can be processed.',
      },
      {
        question: 'How does AIremover protect privacy?',
        answer: 'Because all image binary analysis, chunk stripping, and text normalization happen locally within your device browser via HTML5 Canvas and Web APIs, no private prompts, image files, or personal data ever transit across the internet.',
      },
    ],
    contentSections: [
      {
        heading: 'What is an AI Tag & Why Remove It?',
        body: [
          'When images or text are created by generative AI systems—such as Midjourney, Stable Diffusion, DALL-E 3, Flux, or ChatGPT—the software embeds identification tags and technical metadata directly into the output.',
          'In images, these AI tags consist of full text prompts, negative prompts, seed numbers, and C2PA Content Credentials markers. Removing these tags protects your creative workflows, prevents unintended prompt disclosure, and leaves your files clean and free of unnecessary technical overhead.',
        ],
      },
      {
        heading: 'How AI Metadata Removal Works',
        body: [
          'AIremover operates via client-side binary parsing. When you select an image, the tool inspects the file header byte structure. For PNG files, it locates and extracts metadata chunks like tEXt, zTXt, and iTXt without touching the compressed image pixel stream (IDAT chunks).',
          'For JPEG and WebP images, the engine sanitizes EXIF, IPTC, and JUMBF boxes. Because no compression recalculation is applied to raw pixel data during binary mode, visual fidelity remains 100% identical to the original file.',
        ],
      },
      {
        heading: 'How to Use AIremover',
        body: [
          '1. Upload or drag and drop your AI-generated image (PNG, JPG, WebP, AVIF) into the upload area.',
          '2. The tool automatically analyzes embedded AI tags, prompt chunks, and provenance data in real time.',
          '3. Review the identified tags and click the download button to save your sanitized, clean image instantly.',
          '4. Switch to the AI Hyphen Remover tab anytime to eliminate unnatural em dashes and en dashes from AI-generated text.',
        ],
      },
    ],
  },

  '/ai-tag-remover': {
    path: '/ai-tag-remover',
    canonicalUrl: `${BASE_CANONICAL_DOMAIN}/ai-tag-remover`,
    title: 'AI Tag Remover – Strip AI Tags & Prompts Online Free | AIremover',
    metaDescription: 'Free online AI tag remover to purge embedded AI tags, generation prompts, seed parameters, and provenance markers from images without quality loss.',
    h1: 'AI Tag Remover',
    subtitle: 'Easily strip AI tags, prompt headers, and synthetic media labels from your images online with complete client-side privacy.',
    activeTool: 'image',
    badgeText: 'Instant AI Tag Removal • Browser-Based & Private',
    keywords: 'AI tag remover, remove AI tags, strip AI tags, AI tags cleaner, remove tags from AI images, free online AI tag remover',
    ogTitle: 'AI Tag Remover – Strip AI Tags Online Free',
    ogDescription: 'Remove AI tags, prompts, and synthetic media markers from supported files online with AIremover.',
    faqList: [
      {
        question: 'What is an AI tag?',
        answer: 'An AI tag is an embedded metadata parameter added by generative models that flags an asset as AI-created, often storing the original prompt, seed number, model checkpoint, or digital provenance signature.',
      },
      {
        question: 'What does an AI tag remover do?',
        answer: 'An AI tag remover identifies and deletes embedded synthetic tags from file headers, ensuring the media file contains only clean, standard pixel data without external workflow traces.',
      },
      {
        question: 'Will removing AI tags affect image resolution?',
        answer: 'No. The image resolution, pixel dimensions, and visual detail are preserved exactly as in the original asset.',
      },
      {
        question: 'Is AIremover free to use?',
        answer: 'Yes. AIremover provides free, unlimited AI tag removal directly in your browser with no registration needed.',
      },
    ],
    contentSections: [
      {
        heading: 'Understanding AI Tags in Generative Media',
        body: [
          'Modern AI image generators tag created media with detailed parameters. Stable Diffusion tools like AUTOMATIC1111 embed your exact text prompt, CFG scale, and steps. Midjourney marks files with internal software identifiers, and DALL-E embeds C2PA digital signatures.',
          'Our AI tag remover safely extracts these headers so you can share, publish, or archive your images cleanly.',
        ],
      },
      {
        heading: 'Complete Client-Side Security',
        body: [
          'Unlike cloud conversion services that upload your media to third-party servers, AIremover processes every byte locally within your browser sandbox.',
          'Your intellectual property, proprietary prompts, and artwork never leave your personal computer or mobile device.',
        ],
      },
    ],
  },

  '/ai-metadata-remover': {
    path: '/ai-metadata-remover',
    canonicalUrl: `${BASE_CANONICAL_DOMAIN}/ai-metadata-remover`,
    title: 'AI Metadata Remover – Strip Prompts, Seeds & EXIF Online | AIremover',
    metaDescription: 'Remove AI metadata including generation prompts, negative prompts, seeds, ComfyUI workflows, and EXIF parameters from images at 100% visual quality.',
    h1: 'AI Metadata Remover',
    subtitle: 'Erase generation prompts, seeds, sampler settings, and ComfyUI workflow JSON from your images with 100% visual quality preserved.',
    activeTool: 'image',
    badgeText: '100% Quality Preserved • Prompts & EXIF Purged',
    keywords: 'AI metadata remover, remove AI metadata, AI metadata cleaner, strip AI metadata, prompt remover, comfyui workflow remover',
    ogTitle: 'AI Metadata Remover – AIremover',
    ogDescription: 'Remove AI metadata, prompts, and workflow graphs from images with 100% quality retention.',
    faqList: [
      {
        question: 'What is AI metadata?',
        answer: 'AI metadata is non-visual textual data embedded in image headers by AI software. It often contains your complete creative prompt, negative prompts, seed numbers, sampler settings, and full ComfyUI JSON graphs.',
      },
      {
        question: 'How does the AI metadata remover preserve 100% quality?',
        answer: 'By isolating and stripping only non-critical metadata chunks (such as text comments and EXIF headers) while keeping the raw compressed pixel stream completely untouched.',
      },
      {
        question: 'Can ComfyUI workflow nodes be removed?',
        answer: 'Yes. Full ComfyUI workflow trees and API prompt graphs stored in PNG text chunks are completely stripped.',
      },
      {
        question: 'Does this tool remove EXIF data?',
        answer: 'Yes, standard camera EXIF data and software attribution tags can be removed automatically.',
      },
    ],
    contentSections: [
      {
        heading: 'Why Strip AI Metadata?',
        body: [
          'Many digital artists and creators invest hours developing prompt recipes and custom ComfyUI nodes. When exporting images directly from AI interfaces, these sensitive configurations are embedded verbatim into the file headers.',
          'Anyone downloading the file can extract your exact technique. Stripping AI metadata safeguards your prompt engineering recipes while drastically reducing unnecessary file size overhead.',
        ],
      },
      {
        heading: 'Supported AI Platforms & Generators',
        body: [
          'AIremover supports metadata removal from Midjourney (v4, v5, v6), Stable Diffusion (1.5, 2.1, SDXL, Pony, SD3), Flux.1, ComfyUI, AUTOMATIC1111, Fooocus, DALL-E 3, Adobe Firefly, and Leonardo.ai.',
        ],
      },
    ],
  },

  '/ai-hyphen-remover': {
    path: '/ai-hyphen-remover',
    canonicalUrl: `${BASE_CANONICAL_DOMAIN}/ai-hyphen-remover`,
    title: 'AI Hyphen Remover – Clean Em Dashes & En Dashes in AI Text | AIremover',
    metaDescription: 'Remove repetitive em dashes (—), en dashes (–), and unnecessary hyphens from ChatGPT, Claude, and AI-generated text for natural, human readability.',
    h1: 'AI Hyphen Remover',
    subtitle: 'Eliminate repetitive em dashes (—), en dashes (–), and robotic hyphenation from AI text to restore natural human cadence and readability.',
    activeTool: 'hyphen',
    badgeText: 'AI Text Humanizer • Em & En Dash Purger',
    keywords: 'AI hyphen remover, remove em dashes AI, remove en dashes, AI dash remover, humanize AI text, remove hyphens from ChatGPT text',
    ogTitle: 'AI Hyphen Remover – Clean Em Dashes & En Dashes Online',
    ogDescription: 'Remove robotic em dashes and hyphens from AI-generated text while preserving natural punctuation and flow.',
    faqList: [
      {
        question: 'Why do AI models overuse em dashes (—)?',
        answer: 'Large language models like ChatGPT and Claude are trained on datasets where parenthetical clauses frequently use em dashes to connect ideas. In generated output, this creates an over-indexed, repetitive rhythm that is a hallmark pattern of AI writing.',
      },
      {
        question: 'How does the AI Hyphen Remover work?',
        answer: 'The tool uses intelligent natural language replacement rules to detect parenthetical em dashes, transitional clauses, and double hyphens, replacing them with context-appropriate commas, periods, or clean spaces.',
      },
      {
        question: 'Does it remove compound word hyphens like "user-friendly"?',
        answer: 'By default, legitimate compound word hyphens are preserved. However, you can enable the optional "remove word hyphens" toggle if you want a complete hyphen purge.',
      },
      {
        question: 'Is my text private?',
        answer: 'Yes. All text processing occurs strictly in your browser memory. No text is transmitted or logged.',
      },
    ],
    contentSections: [
      {
        heading: 'Why AI-Generated Text Overuses Dashes',
        body: [
          'One of the clearest visual giveaways of AI-generated content is the incessant use of em dashes (—) to insert parenthetical thoughts into sentences. While grammatically valid in moderation, AI models insert them across multiple consecutive sentences.',
          'AI content scanners and human readers alike quickly spot this repetitive rhythm. Our AI Hyphen Remover restores natural pacing by swapping robotic dashes with standard punctuation.',
        ],
      },
      {
        heading: 'Flexible Replacement Modes',
        body: [
          'Choose between Natural Flow (recommended for humanized editorial cadence), Standard Commas, Clean Spaces, or Strict Strip. You can view side-by-side diffs and copy your cleaned copy with a single click.',
        ],
      },
    ],
  },

  '/remove-ai-metadata': {
    path: '/remove-ai-metadata',
    canonicalUrl: `${BASE_CANONICAL_DOMAIN}/remove-ai-metadata`,
    title: 'Remove AI Metadata – Free Online Tool for AI Files | AIremover',
    metaDescription: 'Learn how to remove AI metadata and provenance tags from your files online. Free, fast, and 100% private client-side metadata cleaner.',
    h1: 'Remove AI Metadata',
    subtitle: 'Comprehensive guide and instant online tool to remove AI metadata, prompts, and provenance markers from supported files.',
    activeTool: 'image',
    badgeText: 'Client-Side Privacy • Universal AI Cleaner',
    keywords: 'remove AI metadata, how to remove AI metadata, clean AI metadata, remove AI prompt from image, delete AI tags online',
    ogTitle: 'Remove AI Metadata – Free Online Tool | AIremover',
    ogDescription: 'Instant client-side removal of AI metadata and tags from supported files with AIremover.',
    faqList: [
      {
        question: 'How do I remove AI metadata from my files?',
        answer: 'Simply drag and drop your file into the AIremover interface. The tool automatically detects all AI-related metadata chunks and strips them in your browser memory, allowing you to download a sanitized copy immediately.',
      },
      {
        question: 'What types of metadata does AIremover remove?',
        answer: 'It removes prompt texts, negative prompts, seed values, CFG scale, sampler configurations, model checkpoint names, C2PA Content Credentials, and camera EXIF records.',
      },
      {
        question: 'Is the removal permanent?',
        answer: 'Yes. The downloaded file contains purely clean binary data with all metadata headers permanently excluded.',
      },
      {
        question: 'Does AIremover require installation?',
        answer: 'No. AIremover works directly in any modern desktop or mobile web browser without plugins, extensions, or software installation.',
      },
    ],
    contentSections: [
      {
        heading: 'The Importance of Removing AI Metadata',
        body: [
          'Every time an AI model generates media, it injects metadata that can reveal your proprietary prompts, workflow secrets, or software versioning. Furthermore, platforms increasingly scan for provenance tags to categorize user uploads.',
          'Removing AI metadata gives you total control over what technical details remain attached to your work.',
        ],
      },
      {
        heading: 'Safe, Lossless & In-Memory',
        body: [
          'AIremover was built from the ground up with zero tracking, zero cloud dependencies, and zero image compression. Your files are processed instantly inside client memory.',
        ],
      },
    ],
  },

  '/remove-ai-metadata-from-images': {
    path: '/remove-ai-metadata-from-images',
    canonicalUrl: `${BASE_CANONICAL_DOMAIN}/remove-ai-metadata-from-images`,
    title: 'Remove AI Metadata from Images – PNG, JPEG, WebP | AIremover',
    metaDescription: 'Remove AI metadata from images (PNG, JPEG, WebP, AVIF) at 100% original quality. Strip C2PA credentials, Midjourney prompts, and Stable Diffusion EXIF.',
    h1: 'Remove AI Metadata from Images',
    subtitle: 'Losslessly strip embedded AI prompts, EXIF tags, and C2PA Content Credentials from PNG, JPEG, WebP, and AVIF images.',
    activeTool: 'image',
    badgeText: '100% Quality Retention • PNG, JPG, WebP, AVIF',
    keywords: 'remove AI metadata from images, clean image metadata, strip prompt from PNG, remove C2PA from JPEG, strip EXIF from AI image',
    ogTitle: 'Remove AI Metadata from Images – Lossless & Free',
    ogDescription: 'Strip prompts, C2PA credentials, and EXIF from AI images while preserving 100% visual quality.',
    faqList: [
      {
        question: 'Which image formats are supported?',
        answer: 'AIremover supports PNG, JPEG/JPG, WebP, and AVIF images created by any generative model or photography software.',
      },
      {
        question: 'How are PNG files sanitized?',
        answer: 'PNG files are processed by stripping ancillary chunks such as tEXt, zTXt, and iTXt while preserving the IHDR, PLTE, and IDAT image pixel chunks without recompression.',
      },
      {
        question: 'How are JPEG files sanitized?',
        answer: 'JPEG files have their APP1 (EXIF), APP2 (ICC profile preserved if selected), and APP11 (C2PA JUMBF) markers cleaned, or re-encoded at 100% maximum quality.',
      },
      {
        question: 'Can I inspect what metadata was in the image before removing it?',
        answer: 'Yes. AIremover includes an integrated metadata inspector that lets you view detected prompts, generator strings, and tags before downloading the clean file.',
      },
    ],
    contentSections: [
      {
        heading: 'How Image Headers Store AI Data',
        body: [
          'PNG and JPEG file specifications allow arbitrary text chunks and application markers. Generative platforms use these chunks to embed full generation strings. For example, Stable Diffusion stores JSON parameters in PNG "parameters" text chunks, while DALL-E embeds C2PA manifests in JPEG APP11 segments.',
          'Our tool specifically targets and eliminates these segments while leaving the core image data untouched.',
        ],
      },
      {
        heading: 'Lossless Visual Quality Assurance',
        body: [
          'Unlike ordinary compression tools that reduce image bitrate, AIremover maintains bit-for-bit pixel integrity on PNGs and 100% quality on JPEGs, ensuring zero banding, noise, or artifacts.',
        ],
      },
    ],
  },
};

export function getSeoConfigForPath(pathname: string): RouteSeoConfig {
  // Normalize pathname: remove trailing slash except for root
  const normalized = pathname.length > 1 && pathname.endsWith('/') ? pathname.slice(0, -1) : pathname;
  return SEO_ROUTES[normalized] || SEO_ROUTES['/'];
}
