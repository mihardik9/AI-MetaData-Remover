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
    title: 'AI Metadata Remover – Remove Hidden Metadata Online | Airemover',
    metaDescription: 'Remove AI metadata, EXIF data, author information and hidden file tags online with Airemover. Clean supported images quickly and securely with 100% privacy.',
    h1: 'AI Metadata Remover',
    subtitle: 'Remove AI metadata, EXIF markers, generation prompts, and C2PA Content Credentials from supported files online with complete client-side privacy.',
    activeTool: 'image',
    badgeText: '100% Quality Preserved • Prompts & EXIF Purged',
    keywords: 'AI metadata remover, metadata remover, remove metadata online, remove AI metadata, image metadata remover, EXIF remover, remove EXIF data, metadata cleaner, remove hidden metadata, AI generated image metadata remover',
    ogTitle: 'AI Metadata Remover – Remove Hidden Metadata Online | Airemover',
    ogDescription: 'Remove AI metadata, EXIF data, author information and hidden file tags online with Airemover. 100% client-side privacy.',
    faqList: [
      {
        question: 'What is metadata?',
        answer: 'Metadata is information embedded within a digital file describing how, when, and with what parameters the file was generated. In digital images, metadata can include camera models, timestamps, GPS locations, creator names, color profiles, and technical software logs.',
      },
      {
        question: 'What is AI metadata?',
        answer: 'AI metadata is non-visual technical data embedded into media files by generative artificial intelligence systems like Midjourney, Stable Diffusion, DALL-E, Flux, and ComfyUI. It typically includes the exact positive prompt, negative prompt, seed number, CFG guidance scale, sampler name, model checkpoint, and digital provenance signatures like C2PA Content Credentials.',
      },
      {
        question: 'Can I remove metadata from images?',
        answer: 'Yes. AIremover removes metadata from PNG, JPEG/JPG, WebP, and AVIF images. It performs binary surgery to strip non-critical metadata segments (such as PNG tEXt/zTXt/iTXt chunks and JPEG APP1 EXIF) while keeping 100% of the raw visual pixel data intact.',
      },
      {
        question: 'What is EXIF data?',
        answer: 'EXIF (Exchangeable Image File Format) is an international standard for storing technical details inside photo headers. It records camera settings (aperture, ISO, shutter speed), equipment identifiers, date and time stamps, editing software history, and sometimes exact GPS coordinates.',
      },
      {
        question: 'Can metadata be removed from files online?',
        answer: 'Yes. With AIremover, metadata is removed instantly inside your web browser. There is no software installation required, and because the processing happens locally in browser memory, your files are never transmitted to any third-party server.',
      },
      {
        question: 'Does removing metadata affect image quality?',
        answer: 'No. Removing metadata only purges ancillary text chunks and header markers. In binary mode, the compressed image pixel stream (IDAT in PNG, scan data in JPEG) is untouched, preserving 100% bit-level visual quality with zero recompression or artifacts.',
      },
      {
        question: 'What information can metadata contain?',
        answer: 'Metadata can store sensitive details including full generative AI prompts, proprietary prompt engineering techniques, camera serial numbers, geographical GPS coordinates, author usernames, device configurations, and editing histories.',
      },
      {
        question: 'Does Airemover store uploaded files?',
        answer: 'No. AIremover executes 100% client-side in your device browser memory using HTML5 Canvas and Web APIs. Your images, text inputs, and files are never uploaded to any remote server, cloud storage, or external database.',
      },
      {
        question: 'Is AIremover free?',
        answer: 'Yes, AIremover is completely free to use. There are no subscriptions, hidden fees, account requirements, or daily limits.',
      },
      {
        question: 'What file formats are supported?',
        answer: 'For image metadata and AI tag removal, AIremover supports PNG, JPEG/JPG, WebP, and AVIF files. For text hyphen and dash cleaning, any text can be processed in the AI Hyphen Remover.',
      },
    ],
    contentSections: [
      {
        heading: 'What is Metadata & Why Remove It?',
        body: [
          'Digital files carry extensive non-visual records known as metadata. When you capture a photograph or render an image using generative AI (such as Midjourney, Stable Diffusion, DALL-E 3, or Flux), technical markers are written directly into the file headers.',
          'These records include original text prompts, negative prompts, seed numbers, sampler settings, camera EXIF, device info, and C2PA Content Credentials. Removing this metadata safeguards your creative privacy, protects prompt engineering recipes, and reduces file size.',
        ],
      },
      {
        heading: 'How AI Metadata Removal Works',
        body: [
          'AIremover uses advanced client-side binary parsing. When you select an image, our engine scans the byte stream and isolates metadata chunks (such as PNG tEXt, zTXt, iTXt, and JPEG APP1/APP11 markers) without modifying the raw pixel payload.',
          'For maximum compatibility, you can also use our 100% quality canvas re-encoding engine. Both approaches guarantee that no sensitive metadata leaves with the file.',
        ],
      },
      {
        heading: 'How to Use AIremover',
        body: [
          '1. Drag and drop your image (PNG, JPG, WebP, AVIF) into the upload area or click Browse Image.',
          '2. The tool instantly inspects embedded AI tags, EXIF parameters, and provenance data in real time.',
          '3. Click the download button to save your sanitized, clean image with 100% visual quality.',
          '4. Switch to the AI Hyphen Remover tab whenever you need to clean unnatural em dashes and en dashes from AI-generated text.',
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
    keywords: 'AI metadata remover, remove AI metadata, AI metadata cleaner, strip AI metadata, prompt remover, comfyui workflow remover, clean AI images',
    ogTitle: 'AI Metadata Remover – Strip Prompts, Seeds & EXIF Online | AIremover',
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
        answer: 'Yes, standard camera EXIF data, software attribution tags, and device timestamps are removed automatically.',
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

  '/image-metadata-remover': {
    path: '/image-metadata-remover',
    canonicalUrl: `${BASE_CANONICAL_DOMAIN}/image-metadata-remover`,
    title: 'Image Metadata Remover – Remove EXIF, GPS & Hidden Tags | AIremover',
    metaDescription: 'Free online image metadata remover. Clean EXIF data, GPS coordinates, camera specs, and AI tags from PNG, JPEG, WebP, and AVIF images with 100% quality.',
    h1: 'Image Metadata Remover',
    subtitle: 'Strip camera EXIF tags, GPS location coordinates, software history, and AI prompts from your images online without quality degradation.',
    activeTool: 'image',
    badgeText: 'Lossless EXIF & Tag Removal • PNG, JPG, WebP',
    keywords: 'image metadata remover, remove image metadata, strip EXIF from photos, photo metadata remover, clean picture metadata, delete image tags online',
    ogTitle: 'Image Metadata Remover – Clean EXIF & Photo Tags Online',
    ogDescription: 'Remove EXIF data, GPS location coordinates, and embedded tags from images with 100% privacy and zero compression loss.',
    faqList: [
      {
        question: 'What metadata is stored in digital images?',
        answer: 'Images often contain EXIF data (camera make, model, shutter speed, aperture, ISO), IPTC metadata (author, copyrights, keywords), GPS coordinates pinpointing where the picture was taken, and software edit logs.',
      },
      {
        question: 'Why should I remove image metadata before sharing photos online?',
        answer: 'Removing metadata protects your physical privacy by removing GPS coordinates that could reveal your home or work location, and prevents exposure of your equipment serial numbers and creative workflows.',
      },
      {
        question: 'Does this tool support PNG, JPG, WebP, and AVIF?',
        answer: 'Yes. AIremover supports PNG, JPEG/JPG, WebP, and AVIF files. It cleans EXIF, XMP, IPTC, and AI chunks cleanly.',
      },
      {
        question: 'Will image resolution or colors be altered?',
        answer: 'No. The image resolution, color profile, and pixel detail remain completely unchanged.',
      },
    ],
    contentSections: [
      {
        heading: 'Why Clean Image Metadata?',
        body: [
          'Modern smartphones and digital cameras automatically inject rich metadata into every photograph you take. This includes high-precision GPS coordinates, capture dates, camera serial numbers, and device specifications.',
          'When you upload photos to social platforms, forums, or portfolios, this hidden data can expose personal details. Stripping image metadata ensures only the visual image is shared.',
        ],
      },
      {
        heading: 'Universal Compatibility',
        body: [
          'Our image metadata cleaner handles photographs from smartphones (iPhone, Android, Samsung, Pixel), professional DSLRs (Sony, Canon, Nikon), and digital art tools, outputting clean, sanitized files in seconds.',
        ],
      },
    ],
  },

  '/exif-remover': {
    path: '/exif-remover',
    canonicalUrl: `${BASE_CANONICAL_DOMAIN}/exif-remover`,
    title: 'EXIF Remover – Remove EXIF Data from Photos Online Free | AIremover',
    metaDescription: 'Remove EXIF data, camera settings, timestamps, and GPS geotags from photos online for free. Clean EXIF tags securely in your browser with AIremover.',
    h1: 'EXIF Remover',
    subtitle: 'Quickly remove EXIF data, camera profiles, timestamps, and geolocation tags from photos online with 100% client-side privacy.',
    activeTool: 'image',
    badgeText: 'Fast EXIF Cleaner • GPS & Camera Specs Purged',
    keywords: 'EXIF remover, remove EXIF data, delete EXIF, clear EXIF data, photo EXIF cleaner, remove GPS from photo, online EXIF stripper',
    ogTitle: 'EXIF Remover – Remove EXIF Data from Photos Online Free',
    ogDescription: 'Strip EXIF data, camera settings, and GPS geotags from photos online with 100% privacy and zero quality loss.',
    faqList: [
      {
        question: 'What is EXIF data in a photo?',
        answer: 'EXIF (Exchangeable Image File Format) contains technical camera settings including shutter speed, aperture, ISO, lens model, timestamp, and often exact GPS latitude and longitude.',
      },
      {
        question: 'How do I remove EXIF data with AIremover?',
        answer: 'Upload your photo to the drop area. The tool identifies all EXIF headers and strips them instantly. You can then download the sanitized image with all EXIF markers cleared.',
      },
      {
        question: 'Can GPS coordinates be stripped from smartphone photos?',
        answer: 'Yes. AIremover purges GPS coordinates, altitude data, and location tags from all uploaded photos.',
      },
      {
        question: 'Is EXIF removal permanent?',
        answer: 'Yes. Once stripped, the downloaded file contains zero EXIF metadata markers.',
      },
    ],
    contentSections: [
      {
        heading: 'Protect Your Geolocation and Camera Data',
        body: [
          'Every time you take a photo with location services enabled, your device embeds exact geographical coordinates in the EXIF APP1 header. Publishing these photos online allows anyone to view where the picture was taken.',
          'Using AIremover as an EXIF remover clears geotags, camera serials, and timestamps while preserving full image clarity.',
        ],
      },
      {
        heading: 'Zero Cloud Storage Guarantee',
        body: [
          'All EXIF removal operations are performed locally in your browser memory. Your personal photos are never transmitted to any external server or saved in the cloud.',
        ],
      },
    ],
  },

  '/remove-metadata-online': {
    path: '/remove-metadata-online',
    canonicalUrl: `${BASE_CANONICAL_DOMAIN}/remove-metadata-online`,
    title: 'Remove Metadata Online – Free Hidden Metadata Cleaner | AIremover',
    metaDescription: 'Remove metadata online for free. Strip hidden EXIF tags, AI generation prompts, and author information from supported image files with AIremover.',
    h1: 'Remove Metadata Online',
    subtitle: 'Free, browser-based tool to remove hidden metadata, author information, EXIF markers, and AI prompts from your files online.',
    activeTool: 'image',
    badgeText: 'Instant Online Metadata Cleaner • 100% Private',
    keywords: 'remove metadata online, clean metadata online, free online metadata remover, strip file metadata online, metadata scrubber online',
    ogTitle: 'Remove Metadata Online – Free Hidden Metadata Cleaner',
    ogDescription: 'Remove hidden metadata, author information, EXIF markers, and AI prompts from supported files online with AIremover.',
    faqList: [
      {
        question: 'How do I remove metadata online for free?',
        answer: 'Simply open AIremover in any browser, drop your image or paste your text, and click download. The file is cleaned in seconds with zero cost and no account sign-up.',
      },
      {
        question: 'Is it safe to remove metadata online?',
        answer: 'Yes, with AIremover it is 100% safe because your files never leave your computer. Processing occurs entirely in your browser memory without server uploads.',
      },
      {
        question: 'Does this tool remove AI prompts and seeds?',
        answer: 'Yes. AI prompts, negative prompts, seed numbers, and ComfyUI workflow JSON are completely sanitized from image files.',
      },
      {
        question: 'Are there any limits on file size or count?',
        answer: 'AIremover has no artificial usage limits. You can process images and text as often as needed.',
      },
    ],
    contentSections: [
      {
        heading: 'Convenient Online Metadata Cleaning',
        body: [
          'Traditional metadata removal requires downloading bulky command-line utilities or paid photo editors. AIremover provides a fast, lightweight, and modern web application that works in any browser on desktop, tablet, or phone.',
          'With instant drag-and-drop processing, you can inspect and scrub metadata from your files without installing software.',
        ],
      },
      {
        heading: 'Privacy First Architecture',
        body: [
          'Unlike conventional online conversion websites that upload your files to remote cloud servers, AIremover runs locally using WebAssembly, JavaScript, and HTML5 APIs. Your data remains strictly on your device.',
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
    ogTitle: 'AI Tag Remover – Strip AI Tags Online Free | AIremover',
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
  // Normalize pathname: strip trailing slash except for root '/'
  const normalized = pathname.length > 1 && pathname.endsWith('/') ? pathname.slice(0, -1) : pathname;
  return SEO_ROUTES[normalized] || SEO_ROUTES['/'];
}
