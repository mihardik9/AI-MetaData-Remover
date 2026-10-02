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
  sectionHeading: string;
  sectionDescription: string;
  featurePillars: {
    title: string;
    description: string;
    icon: 'quality' | 'shield' | 'lock' | 'camera' | 'code' | 'sparkles' | 'sliders';
  }[];
  contentSections: {
    heading: string;
    body: string[];
  }[];
  faqList: {
    question: string;
    answer: string;
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
    keywords: 'AI metadata remover, metadata remover, remove metadata online, remove AI metadata, image metadata remover, EXIF remover, remove EXIF data, clean image metadata, remove hidden metadata',
    ogTitle: 'AI Metadata Remover – Remove Hidden Metadata Online | Airemover',
    ogDescription: 'Remove AI metadata, EXIF data, author information and hidden file tags online with Airemover. 100% client-side privacy.',
    sectionHeading: '',
    sectionDescription: '',
    featurePillars: [],
    contentSections: [],
    faqList: [],
  },

  '/ai-metadata-remover': {
    path: '/ai-metadata-remover',
    canonicalUrl: `${BASE_CANONICAL_DOMAIN}/ai-metadata-remover`,
    title: 'AI Metadata Remover – Strip Prompts, Seeds & Parameters | AIremover',
    metaDescription: 'Remove AI-generated image metadata, text prompts, negative prompts, seeds, CFG settings, and ComfyUI workflow JSON from PNG, JPG, and WebP images with 100% privacy.',
    h1: 'AI Metadata Remover: Remove AI Generation Parameters',
    subtitle: 'Erase generation prompts, negative prompts, seeds, and ComfyUI workflow JSON from your images with 100% visual quality preserved.',
    activeTool: 'image',
    badgeText: 'Generation Parameters & Workflow Graphs Purged',
    keywords: 'AI metadata remover, remove AI metadata, strip prompts from images, ComfyUI workflow remover, stable diffusion parameter remover, clean AI images, remove generation seeds',
    ogTitle: 'AI Metadata Remover – Strip Prompts, Seeds & Parameters | AIremover',
    ogDescription: 'Erase generation prompts, negative prompts, seeds, and ComfyUI workflow JSON from your images with 100% visual quality preserved.',
    sectionHeading: 'How AI Generation Metadata & Parameters are Removed',
    sectionDescription: 'A technical breakdown of prompts, seeds, model checkpoints, and workflow trees embedded in synthetic media.',
    featurePillars: [
      {
        title: 'Full Parameter Eradication',
        description: 'Eliminates positive/negative prompts, seed integers, CFG guidance scales, sampler steps, and scheduler names from image headers.',
        icon: 'code',
      },
      {
        title: 'Workflow Graph Stripping',
        description: 'Completely strips nested ComfyUI node trees, AUTOMATIC1111 parameter blocks, and Fooocus JSON structures.',
        icon: 'sliders',
      },
      {
        title: 'Lossless Visual Payload',
        description: 'Binary surgery excises metadata chunks while keeping raw compressed pixel buffers untouched with zero quality loss.',
        icon: 'quality',
      },
    ],
    contentSections: [
      {
        heading: 'What is AI Metadata in Synthetic Images?',
        body: [
          'When artificial intelligence systems generate media, they embed comprehensive textual logs into the resulting image container. Generative engines such as Stable Diffusion, ComfyUI, Midjourney, Flux, and DALL-E automatically write the precise generation parameters into non-visual header segments.',
          'This metadata typically includes the full positive prompt, negative prompt, random seed number, CFG (Classifier-Free Guidance) value, step count, denoising strength, sampler method, and even the cryptographic hashes of model checkpoints and LoRA adapters. Anyone who downloads the file can extract your exact prompt engineering techniques.',
        ],
      },
      {
        heading: 'Generation Parameters and Workflow Information',
        body: [
          'Advanced generation environments like ComfyUI embed an entire executable node graph containing dozens of interconnected node parameters, custom pipeline scripts, and API prompts. Similarly, WebUI interfaces (such as AUTOMATIC1111 and Fooocus) append structured text records directly into the file header.',
          'These records expose proprietary artistic workflows and significantly increase file size. Airemover isolates these workflow graphs and strips them cleanly without touching the rendered artwork.',
        ],
      },
      {
        heading: 'What Airemover Actually Removes',
        body: [
          'Airemover inspects and removes all embedded textual metadata records, including PNG ancillary chunks (such as tEXt, zTXt, and iTXt "parameters" and "workflow" blocks), JPEG APP1 EXIF records, APP11 C2PA JUMBF manifests, and WebP RIFF metadata chunks.',
          'Because our engine operates at the container byte level, non-critical metadata is dropped while critical display chunks (like PNG IHDR, PLTE, IDAT, and IEND) remain 100% intact.',
        ],
      },
      {
        heading: 'Supported Formats & Technical Limitations',
        body: [
          'This tool supports PNG, JPEG/JPG, WebP, and AVIF image formats produced by any generative AI platform or photography software.',
          'Limitations: Airemover cleans digital header metadata and embedded textual parameters. It does not alter visual pixels, remove visible burned-in text watermarks on the canvas, or modify imperceptible statistical noise patterns. It focuses strictly on eradicating file-level metadata and provenance records.',
        ],
      },
    ],
    faqList: [
      {
        question: 'What exact AI generation parameters does Airemover remove?',
        answer: 'Airemover removes positive prompts, negative prompts, seed numbers, CFG scales, step counts, samplers, model checkpoints, LoRA hashes, and full ComfyUI JSON node trees.',
      },
      {
        question: 'Does stripping AI metadata degrade image resolution or quality?',
        answer: 'No. The image pixel data (compressed scanlines in PNG or DCT coefficients in JPEG) is preserved with 100% visual fidelity without any recompression artifacts.',
      },
      {
        question: 'Can ComfyUI workflow JSON be recovered after using Airemover?',
        answer: 'No. Once stripped, the metadata chunks are permanently excised from the file byte stream, leaving no recoverable workflow traces.',
      },
      {
        question: 'Are my images uploaded to an external server?',
        answer: 'No. All processing happens entirely within your web browser memory via HTML5 Canvas and Web APIs. Your artwork and prompts never leave your local device.',
      },
    ],
  },

  '/image-metadata-remover': {
    path: '/image-metadata-remover',
    canonicalUrl: `${BASE_CANONICAL_DOMAIN}/image-metadata-remover`,
    title: 'Image Metadata Remover – Clean EXIF, GPS & Photo Tags | AIremover',
    metaDescription: 'Free online image metadata remover. Clean EXIF data, GPS coordinates, camera specs, timestamps, and editing history from PNG, JPG, WebP, and AVIF photos.',
    h1: 'Image Metadata Remover: Strip EXIF, GPS & Camera Tags',
    subtitle: 'Remove camera specifications, GPS location coordinates, capture timestamps, and author tags from photos online without quality degradation.',
    activeTool: 'image',
    badgeText: 'Lossless Photo Sanitizer • Camera, GPS & Author Tags',
    keywords: 'image metadata remover, remove image metadata, photo metadata cleaner, strip EXIF from photos, clear picture tags, delete camera metadata online',
    ogTitle: 'Image Metadata Remover – Clean EXIF, GPS & Photo Tags | AIremover',
    ogDescription: 'Remove camera specifications, GPS location coordinates, capture timestamps, and author tags from photos online without quality degradation.',
    sectionHeading: 'Comprehensive Guide to Image Metadata Removal',
    sectionDescription: 'Understand how camera profiles, geolocation data, equipment serials, and editing logs are stored and stripped.',
    featurePillars: [
      {
        title: 'Camera Profile Purge',
        description: 'Removes camera manufacturer, model name, lens serial number, focal length, aperture f-stops, and shutter speeds.',
        icon: 'camera',
      },
      {
        title: 'Geolocation Cleared',
        description: 'Strips GPS latitude, longitude, altitude coordinates, and compass heading metadata to prevent physical location discovery.',
        icon: 'shield',
      },
      {
        title: 'Timestamps & Author Data',
        description: 'Deletes original creation dates, digitization times, copyright notices, and editing software history logs.',
        icon: 'lock',
      },
    ],
    contentSections: [
      {
        heading: 'What is Image Metadata & Why Clean It?',
        body: [
          'Digital cameras, smartphones, and editing software automatically embed non-visual metadata into every captured photograph. Standardized formats like EXIF (Exchangeable Image File Format), IPTC, and Adobe XMP record technical details about the shooting environment.',
          'While useful for professional photographers organizing catalogs, sharing these uncleaned files on social media, discussion forums, or client portals exposes sensitive personal information about where, when, and with what equipment the photo was taken.',
        ],
      },
      {
        heading: 'Camera Equipment, Exposure Settings & Timestamps',
        body: [
          'Image metadata records the exact camera model, lens specification, focal length, aperture, shutter speed, ISO rating, and metering mode. It also stamps the exact date and second the shutter was pressed, along with subsequent modification timestamps from tools like Adobe Photoshop, Lightroom, or mobile gallery apps.',
          'Airemover strips these technical registries, ensuring your shared media contains only the visible pixels and no historical edit logs.',
        ],
      },
      {
        heading: 'GPS Geotagging & Physical Privacy Risks',
        body: [
          'Modern smartphones and GPS-equipped cameras inject exact geographic coordinates directly into image headers. This geotagging data includes precise decimal latitude, longitude, and elevation.',
          'Sharing geotagged photos of your home, family, workspace, or private gatherings can inadvertently reveal your daily whereabouts. Using Airemover before posting images ensures your physical privacy remains strictly protected.',
        ],
      },
      {
        heading: 'Supported Formats & Lossless Sanitization',
        body: [
          'Airemover cleans metadata across PNG, JPEG/JPG, WebP, and AVIF image formats. Whether your files originate from an iPhone, Samsung Galaxy, Google Pixel, Sony Alpha, Canon EOS, or Nikon DSLR, the metadata headers are stripped cleanly.',
          'Our in-memory sanitization performs bit-level excision, leaving your original resolution, color space, and pixel quality 100% unaltered.',
        ],
      },
    ],
    faqList: [
      {
        question: 'What types of metadata are stored in standard digital photos?',
        answer: 'Digital photos store EXIF data (camera body, lens, exposure), GPS coordinates (latitude, longitude, altitude), IPTC data (creator, copyright), and XMP modification logs.',
      },
      {
        question: 'Can GPS coordinates be extracted from smartphone photos?',
        answer: 'Yes. Unless disabled in camera settings, smartphones embed exact GPS coordinates in every picture. Airemover permanently removes all location tags.',
      },
      {
        question: 'Does cleaning metadata change the image dimensions or sharpness?',
        answer: 'No. The image dimensions, pixel sharpness, and color balance remain completely unchanged.',
      },
      {
        question: 'Is there a limit on how many photos I can clean?',
        answer: 'No. Airemover is free with no artificial daily limits or file count restrictions.',
      },
    ],
  },

  '/exif-remover': {
    path: '/exif-remover',
    canonicalUrl: `${BASE_CANONICAL_DOMAIN}/exif-remover`,
    title: 'EXIF Remover – Strip Camera Settings, GPS & Timestamps | AIremover',
    metaDescription: 'Remove EXIF data, camera model, lens specifications, exposure values, timestamps, and GPS coordinates from photos for free. Clean EXIF tags securely in your browser.',
    h1: 'EXIF Remover: Delete Camera Specs, Geotags & Timestamps',
    subtitle: 'Quickly remove EXIF headers, camera profiles, lens details, exposure settings, and GPS geotags from photos online with 100% client-side privacy.',
    activeTool: 'image',
    badgeText: 'Dedicated EXIF Cleaner • Hardware & Exposure Purged',
    keywords: 'EXIF remover, remove EXIF data, clear EXIF data, delete photo EXIF, photo EXIF cleaner, strip GPS coordinates, camera metadata remover online',
    ogTitle: 'EXIF Remover – Strip Camera Settings, GPS & Timestamps | AIremover',
    ogDescription: 'Quickly remove EXIF headers, camera profiles, lens details, exposure settings, and GPS geotags from photos online with 100% client-side privacy.',
    sectionHeading: 'Understanding EXIF Data & Privacy Protection',
    sectionDescription: 'Deep dive into camera hardware registers, exposure values, GPS coordinates, and the real-world privacy risks of raw EXIF tags.',
    featurePillars: [
      {
        title: 'EXIF Segment Excision',
        description: 'Specifically targets and deletes the APP1 EXIF segment containing TIFF header structures and IFD directories.',
        icon: 'camera',
      },
      {
        title: 'Geotag Privacy Shield',
        description: 'Permanently erases GPS IFD records (GPSLatitude, GPSLongitude, GPSAltitude, and GPSTimeStamp).',
        icon: 'shield',
      },
      {
        title: 'Zero Cloud Footprint',
        description: 'Processes images directly in client browser memory. Your personal photos never touch external servers or cloud storage.',
        icon: 'lock',
      },
    ],
    contentSections: [
      {
        heading: 'What is EXIF Data in Digital Photography?',
        body: [
          'EXIF stands for Exchangeable Image File Format, a standard created by JEITA (Japan Electronics and Information Technology Industries Association). It establishes specifications for recording technical details inside JPEG, TIFF, and other image file headers.',
          'Whenever you capture an image, the camera firmware creates an APP1 marker segment containing detailed tags organized into Image File Directories (IFDs). These tags capture hardware serial numbers, firmware versions, shutter actuation counts, and lens models.',
        ],
      },
      {
        heading: 'Camera Equipment, Exposure Specs & Settings',
        body: [
          'EXIF records contain exhaustive details about photographic exposure: shutter speed, aperture f-number, ISO sensitivity, metering mode, white balance temperature, flash strobe status, and focal length in 35mm equivalent.',
          'For professional photographers and hobbyists, this data can reveal trade secrets or equipment configurations. Airemover cleans these exposure fields cleanly while leaving the photograph looking identical.',
        ],
      },
      {
        heading: 'GPS Location Data & Critical Privacy Implications',
        body: [
          'The most critical component of modern EXIF data is the GPS Sub-IFD. Smartphones and connected cameras automatically query satellite navigation or cellular towers to write exact decimal coordinates into the file header.',
          'Publishing uncleaned photos on online forums, marketplace listings, or public blogs can expose home addresses, children’s schools, or private travel itineraries to cyberstalkers. Stripping EXIF tags is an essential digital security practice.',
        ],
      },
      {
        heading: 'Software Logs & Browser-Based Excision',
        body: [
          'In addition to hardware specs, post-processing applications like Adobe Photoshop, Lightroom, Capture One, or GIMP add software identification tags and modification histories into the EXIF block.',
          'Airemover detects the APP1 marker and excises the entire EXIF payload in browser RAM. Your sanitized file downloads instantly without any upload latency or cloud storage risks.',
        ],
      },
    ],
    faqList: [
      {
        question: 'What is the difference between EXIF and other metadata like IPTC or XMP?',
        answer: 'EXIF focuses on camera hardware settings and capture conditions, while IPTC stores editorial information (caption, creator, rights), and XMP stores extensible XML data used by editing software.',
      },
      {
        question: 'Can someone find my home location through a photo’s EXIF data?',
        answer: 'Yes, if the photo was taken with location services enabled, anyone with a metadata reader can extract the exact GPS coordinates. Airemover eliminates this risk by clearing all GPS tags.',
      },
      {
        question: 'Does removing EXIF reduce photo resolution or compression quality?',
        answer: 'No. EXIF data is stored in separate header chunks outside the image pixel data. Removing it preserves 100% bit-level photographic quality.',
      },
      {
        question: 'Do social media sites always remove EXIF data automatically?',
        answer: 'Some major platforms strip EXIF upon upload, but many forums, messaging apps, email attachments, cloud drives, and portfolio sites preserve the raw file with all EXIF data intact.',
      },
    ],
  },

  '/remove-metadata-online': {
    path: '/remove-metadata-online',
    canonicalUrl: `${BASE_CANONICAL_DOMAIN}/remove-metadata-online`,
    title: 'Remove Metadata Online – Free In-Browser Metadata Scrubber | AIremover',
    metaDescription: 'Remove metadata online for free. Understand what metadata is, supported file types, and how client-side in-browser processing scrubs files with zero server uploads.',
    h1: 'Remove Metadata Online: Fast, Secure In-Browser Sanitization',
    subtitle: 'Free, browser-based tool to remove hidden metadata, author information, EXIF markers, and AI prompts from your files online.',
    activeTool: 'image',
    badgeText: 'Zero-Upload Processing • In-Browser RAM Sanitization',
    keywords: 'remove metadata online, clean metadata online, free online metadata remover, metadata scrubber online, strip file metadata online, browser metadata cleaner',
    ogTitle: 'Remove Metadata Online – Free In-Browser Metadata Scrubber | AIremover',
    ogDescription: 'Remove metadata online for free. Understand what metadata is, supported file types, and how client-side in-browser processing scrubs files with zero server uploads.',
    sectionHeading: 'How In-Browser Online Metadata Sanitization Works',
    sectionDescription: 'Learn what digital metadata entails, supported file formats, browser memory mechanics, and realistic sanitization boundaries.',
    featurePillars: [
      {
        title: 'Instant Drag & Drop',
        description: 'Drop your files into the browser window for instant in-memory inspection and sanitization without software installation.',
        icon: 'sparkles',
      },
      {
        title: 'Zero Server Transmission',
        description: 'Runs entirely on your local machine using modern WebAssembly and JavaScript APIs. Zero bytes are uploaded to remote clouds.',
        icon: 'lock',
      },
      {
        title: 'Multi-Format Support',
        description: 'Seamlessly cleans PNG, JPEG, WebP, and AVIF image files, stripping ancillary chunks while retaining pure visual clarity.',
        icon: 'quality',
      },
    ],
    contentSections: [
      {
        heading: 'What is Digital Metadata & What Hidden Data Does it Carry?',
        body: [
          'Metadata is commonly defined as "data about data." In digital files, metadata consists of hidden, non-visual headers and structural records that describe how the file was created, edited, and formatted.',
          'Depending on the file origin, this hidden data can encompass camera settings, GPS coordinates, device serial numbers, creator names, copyright statements, software version histories, and complete generative AI prompt parameters.',
        ],
      },
      {
        heading: 'Supported Metadata Standards',
        body: [
          'Airemover supports the detection and removal of multiple metadata standards: EXIF (camera and exposure logs), IPTC Photo Metadata (author, title, keywords), Adobe XMP (extensible XML metadata packages), PNG text chunks (tEXt, zTXt, iTXt), and C2PA Content Credentials.',
          'Our tool analyzes the binary structure of your uploaded file and purges these non-critical blocks while preserving the visual content.',
        ],
      },
      {
        heading: 'How Browser-Based Processing Protects Your Data',
        body: [
          'Traditional online conversion websites require you to upload your confidential files to remote servers, where they may be stored, analyzed, or cached indefinitely.',
          'Airemover takes a fundamentally different architectural approach. Using client-side FileReader, HTML5 Canvas, and TypedArray binary manipulation, all processing takes place locally inside your web browser memory. Your files never travel across the internet.',
        ],
      },
      {
        heading: 'Technical Boundaries and Explicit Limitations',
        body: [
          'To ensure realistic expectations, it is important to understand the boundaries of metadata removal. Airemover cleans digital header records and non-visual metadata segments.',
          'It cannot remove visible watermarks that have been burned directly into the image pixels (such as a visible photographer signature or logo). It also requires a modern browser with JavaScript enabled to execute local memory operations.',
        ],
      },
    ],
    faqList: [
      {
        question: 'How can I remove metadata online without installing software?',
        answer: 'You can use Airemover directly in any desktop or mobile browser. Simply drag your file into the tool, and the metadata will be removed locally in your browser memory within seconds.',
      },
      {
        question: 'Why is client-side metadata removal safer than conventional tools?',
        answer: 'Client-side processing guarantees privacy because your files are never transmitted to a server or stored in a remote database. Everything happens inside your local device RAM.',
      },
      {
        question: 'Does this tool support batch metadata removal?',
        answer: 'Yes. You can process and clean multiple files sequentially with instant preview and download options.',
      },
      {
        question: 'Will removing metadata reduce the file size?',
        answer: 'Yes, especially for files with extensive ComfyUI workflows, high-resolution embedded thumbnails, or large XMP blocks, removing metadata often reduces file size by several kilobytes to megabytes.',
      },
    ],
  },

  '/remove-ai-metadata': {
    path: '/remove-ai-metadata',
    canonicalUrl: `${BASE_CANONICAL_DOMAIN}/remove-ai-metadata`,
    title: 'How to Remove AI Metadata – Complete Guide & Online Tool | AIremover',
    metaDescription: 'Discover how and why to remove AI metadata from generated media. Purge synthetic flags, generation parameters, and provenance markers with Airemover\'s private tool.',
    h1: 'How to Remove AI Metadata from Generated Media',
    subtitle: 'Comprehensive guide and online utility explaining why and how to detect, inspect, and remove AI generation signatures and provenance tags.',
    activeTool: 'image',
    badgeText: 'Creative Privacy & Provenance Control',
    keywords: 'remove AI metadata, how to remove AI metadata, clean AI metadata, remove AI prompt from image, synthetic media metadata removal, AI watermark removal guide',
    ogTitle: 'How to Remove AI Metadata – Complete Guide & Online Tool | AIremover',
    ogDescription: 'Discover how and why to remove AI metadata from generated media. Purge synthetic flags, generation parameters, and provenance markers with Airemover\'s private tool.',
    sectionHeading: 'Strategic Guide to Removing AI Metadata from Media',
    sectionDescription: 'Explore why digital artists and creators purge synthetic signatures, how different generative platforms embed metadata, and how to verify clean files.',
    featurePillars: [
      {
        title: 'Creative Prompt Privacy',
        description: 'Keep your proprietary prompt engineering formulas, style triggers, and seed combinations confidential.',
        icon: 'sparkles',
      },
      {
        title: 'Platform Neutrality',
        description: 'Prevent automated algorithms and portfolio platforms from deprioritizing your artwork based on embedded software tags.',
        icon: 'shield',
      },
      {
        title: 'Clean Client Deliverables',
        description: 'Provide pristine, professional image files to clients without messy internal workflow JSON or test prompts.',
        icon: 'quality',
      },
    ],
    contentSections: [
      {
        heading: 'Why Digital Creators Remove AI Metadata',
        body: [
          'As generative AI becomes integral to design workflows, creators face unique challenges regarding metadata transparency. Professional prompt engineers spend hours refining prompts, negative prompts, and LoRA weightings to achieve distinct aesthetic results.',
          'When images are exported directly from AI interfaces, these valuable recipes remain embedded in the file headers. Stripping AI metadata protects intellectual property, ensures clean client handoffs, and avoids automated platform flagging.',
        ],
      },
      {
        heading: 'How Different Generative Platforms Tag Media',
        body: [
          'Different AI systems inject metadata using distinct conventions. Midjourney embeds job hashes and parameter strings in EXIF and PNG chunks. Stable Diffusion (AUTOMATIC1111, Fooocus) writes raw text into PNG "parameters" chunks.',
          'ComfyUI saves the complete serialized node graph in "workflow" and "prompt" chunks. DALL-E 3 and Adobe Firefly attach C2PA Content Credentials manifests that explicitly flag assets as synthetic media.',
        ],
      },
      {
        heading: 'Generative AI Provenance vs Photographic EXIF',
        body: [
          'While traditional camera EXIF data records physical optical properties (aperture, focal length, sensor sensitivity), AI metadata records mathematical generation parameters and cryptographic provenance manifests.',
          'Purging AI metadata requires specialized parsing that recognizes both legacy photo tags and modern synthetic provenance containers without corrupting image encoding.',
        ],
      },
      {
        heading: 'Step-by-Step Method to Sanitize AI Media',
        body: [
          '1. Inspect: Drop your generated file into Airemover to view all detected prompt strings, parameters, and provenance markers.',
          '2. Sanitize: Choose either lossless binary header excision (preserving 100% of bitstream quality) or canvas re-encoding.',
          '3. Verify & Download: Download the cleaned file and inspect it using any standard EXIF reader to verify that all prompt and parameter records have been eradicated.',
        ],
      },
    ],
    faqList: [
      {
        question: 'Why do AI image generators embed prompts inside the files?',
        answer: 'Generators embed prompts to assist with workflow reproducibility, allowing artists or the software to re-import parameters later. However, this also exposes your prompts publicly.',
      },
      {
        question: 'Can someone read my AI prompts if I upload images to the web?',
        answer: 'Yes. Unless the hosting platform strips metadata or you clean the file beforehand, anyone can open the image in a text editor or metadata viewer to read the full prompt.',
      },
      {
        question: 'Does Airemover work on Midjourney and Flux images?',
        answer: 'Yes. Airemover purges metadata from Midjourney, Flux.1, Stable Diffusion, ComfyUI, DALL-E 3, Adobe Firefly, and Leonardo.ai.',
      },
      {
        question: 'Is it legal to remove AI metadata from my own creations?',
        answer: 'Yes. As the creator or owner of the file, you have full authority to sanitize, edit, and manage the metadata attached to your creative assets.',
      },
    ],
  },

  '/remove-ai-metadata-from-images': {
    path: '/remove-ai-metadata-from-images',
    canonicalUrl: `${BASE_CANONICAL_DOMAIN}/remove-ai-metadata-from-images`,
    title: 'Remove AI Metadata from Images – PNG, JPG & WebP Sanitizer | AIremover',
    metaDescription: 'Remove AI metadata specifically from images. Learn how PNG chunks, JPEG markers, and WebP containers store AI prompts, and strip them at 100% image quality.',
    h1: 'Remove AI Metadata from Images: Lossless PNG, JPG & WebP Cleaner',
    subtitle: 'Losslessly strip embedded AI prompts, EXIF tags, and C2PA Content Credentials from PNG, JPEG, WebP, and AVIF image files.',
    activeTool: 'image',
    badgeText: 'Bit-Level Lossless Excision • PNG, JPG, WebP, AVIF',
    keywords: 'remove AI metadata from images, clean image metadata, strip prompt from PNG, remove C2PA from JPEG, strip EXIF from AI image, lossless image metadata cleaner',
    ogTitle: 'Remove AI Metadata from Images – PNG, JPG & WebP Sanitizer | AIremover',
    ogDescription: 'Losslessly strip embedded AI prompts, EXIF tags, and C2PA Content Credentials from PNG, JPEG, WebP, and AVIF image files.',
    sectionHeading: 'Format-Level AI Metadata Excision for PNG, JPG, & WebP',
    sectionDescription: 'A deep technical dive into image container specifications, chunk structures, application markers, and lossless metadata stripping.',
    featurePillars: [
      {
        title: 'PNG Chunk Surgery',
        description: 'Examines 4-byte chunk signatures, dropping ancillary tEXt, zTXt, and iTXt blocks while safeguarding IHDR, PLTE, IDAT, and IEND.',
        icon: 'code',
      },
      {
        title: 'JPEG Marker Excision',
        description: 'Scans APP segment markers (0xFFE1 to 0xFFEF), safely removing EXIF, XMP, and C2PA JUMBF manifests without recompression.',
        icon: 'quality',
      },
      {
        title: 'WebP & AVIF Containers',
        description: 'Navigates RIFF and ISOBMFF box hierarchies to eliminate non-critical metadata payloads cleanly.',
        icon: 'sliders',
      },
    ],
    contentSections: [
      {
        heading: 'How Image File Formats Store AI Generation Data',
        body: [
          'Different image container specifications have designated areas for ancillary data. Understanding how each format stores AI records enables true bit-level lossless sanitization without degrading visual pixels.',
          'Airemover implements format-specific byte stream parsers that identify metadata envelopes directly within the file binary structure.',
        ],
      },
      {
        heading: 'PNG Files: Ancillary Text Chunks (tEXt, zTXt, iTXt)',
        body: [
          'The Portable Network Graphics (PNG) specification divides files into structured chunks. Critical chunks (IHDR for dimensions, IDAT for compressed pixel data, IEND for termination) define the image itself.',
          'Generators like Stable Diffusion and ComfyUI inject metadata into ancillary text chunks: uncompressed tEXt, zlib-compressed zTXt, and internationalized iTXt. Airemover slices out these text chunks while leaving 100% of the compressed IDAT visual data intact.',
        ],
      },
      {
        heading: 'JPEG Files: APP Markers & C2PA Provenance',
        body: [
          'JPEG files utilize Application (APP) marker segments ranging from 0xFFE1 to 0xFFEF. APP1 contains standard EXIF and Adobe XMP, while APP11 holds JUMBF (JPEG Universal Metadata Box Format) structures used by the C2PA Content Authenticity Initiative.',
          'Airemover parses the marker stream and strips these application markers, preventing automated scanners from reading generation credentials.',
        ],
      },
      {
        heading: 'WebP and AVIF Modern Container Structures',
        body: [
          'WebP uses the RIFF (Resource Interchange File Format) container, storing metadata in optional "EXIF" and "XMP " four-character code chunks. AVIF relies on the ISO Base Media File Format (ISOBMFF), packaging metadata into "meta" and "item" boxes.',
          'Our sanitizer navigates both container architectures to purge synthetic media signatures while preserving full HDR color gamuts and transparency channels.',
        ],
      },
    ],
    faqList: [
      {
        question: 'Which image file formats are supported for AI metadata removal?',
        answer: 'Airemover supports PNG, JPEG/JPG, WebP, and AVIF image formats.',
      },
      {
        question: 'How does binary chunk surgery preserve 100% quality on PNG files?',
        answer: 'By removing only ancillary text chunks (tEXt/zTXt/iTXt) and retaining the exact IDAT pixel blocks, not a single pixel or byte of image data is re-encoded.',
      },
      {
        question: 'Does this tool remove C2PA Content Credentials from JPEG images?',
        answer: 'Yes. Airemover purges APP11 JUMBF boxes where C2PA Content Credentials and Content Authenticity Initiative manifests are stored.',
      },
      {
        question: 'Can I clean high-resolution or large-dimension images?',
        answer: 'Yes. Because processing runs in-browser with efficient array slicing, multi-megapixel images are processed quickly with low memory overhead.',
      },
    ],
  },

  '/ai-tag-remover': {
    path: '/ai-tag-remover',
    canonicalUrl: `${BASE_CANONICAL_DOMAIN}/ai-tag-remover`,
    title: 'AI Tag Remover – Strip AI Identification Tags & Header Flags | AIremover',
    metaDescription: 'Strip AI identification tags, generation labels, and synthetic media markers from image headers. Accurate, realistic client-side tag removal with zero quality loss.',
    h1: 'AI Tag Remover: Purge AI Tags, Labels & Prompt Identifiers',
    subtitle: 'Detect and strip embedded AI identification tags, software attribution flags, and model metadata from image file headers.',
    activeTool: 'image',
    badgeText: 'Header Tag Cleaner • Realistic Capabilities',
    keywords: 'AI tag remover, remove AI tags, strip AI tags, AI tags cleaner, remove tags from AI images, free online AI tag remover, synthetic media tag remover',
    ogTitle: 'AI Tag Remover – Strip AI Identification Tags & Header Flags | AIremover',
    ogDescription: 'Strip AI identification tags, generation labels, and synthetic media markers from image headers. Accurate, realistic client-side tag removal with zero quality loss.',
    sectionHeading: 'Understanding AI Identification Tags & Header Flags',
    sectionDescription: 'An accurate, realistic guide to detecting and purging embedded AI labels, software attribution, and prompt tags from media files.',
    featurePillars: [
      {
        title: 'Header Tag Excision',
        description: 'Purges software tags, attribution strings, model checkpoint identifiers, and synthetic media flags from file headers.',
        icon: 'code',
      },
      {
        title: 'Provenance Flag Stripping',
        description: 'Removes C2PA manifests, JUMBF markers, and IPTC DigitalSourceType algorithmic media classifications.',
        icon: 'shield',
      },
      {
        title: 'Realistic Engineering',
        description: 'Honestly removes inspectable digital tags and headers without making false claims about neural watermarks.',
        icon: 'quality',
      },
    ],
    contentSections: [
      {
        heading: 'What are AI Identification Tags in Media Headers?',
        body: [
          'An "AI tag" is any embedded metadata field or header flag that marks a digital file as created by artificial intelligence. When generating images with systems like DALL-E, Midjourney, Stable Diffusion, or Firefly, the software writes identification records into the file container.',
          'These tags include "Software: Stable Diffusion", "Model: SDXL", IPTC DigitalSourceType markers (e.g. "trainedAlgorithmicMedia"), and C2PA Content Credentials manifests. Automated web crawlers and social platforms scan these tags to identify and label synthetic media.',
        ],
      },
      {
        heading: 'What Airemover Actually Removes',
        body: [
          'Airemover detects, parses, and permanently deletes all inspectable file-level AI tags and header flags. This includes PNG text parameters, EXIF software and user comment fields, IPTC synthetic media classifications, and C2PA digital provenance manifests.',
          'Once processed, your file contains only clean, standard image bytes with all synthetic identification flags completely eradicated.',
        ],
      },
      {
        heading: 'Clear Technical Boundaries & Realistic Capabilities',
        body: [
          'We believe in honest, accurate technical communication. Airemover removes all digital header tags, metadata chunks, and provenance manifests.',
          'However, it does not claim to remove invisible frequency-domain watermarks (such as Google DeepMind SynthID), which embed subtle statistical perturbations directly across pixel values. Stripping pixel-level neural watermarks would require destructive resampling that degrades visual quality.',
        ],
      },
      {
        heading: 'Clean Media for Publishing and Archiving',
        body: [
          'For digital artists, photographers, and content creators, purging header tags ensures that files can be shared, archived, and showcased without unintended software markers or prompt disclosures.',
          'All tag removal is executed in local browser memory with zero quality degradation, zero server uploads, and total client-side privacy.',
        ],
      },
    ],
    faqList: [
      {
        question: 'What is an AI tag in an image file?',
        answer: 'An AI tag is a metadata header field (such as a Software attribute, ComfyUI node block, or C2PA manifest) that marks an image as computer-generated.',
      },
      {
        question: 'Does Airemover remove all AI tags and software markers from headers?',
        answer: 'Yes. Airemover purges all inspectable header tags, PNG text blocks, EXIF software strings, and C2PA manifests.',
      },
      {
        question: 'Does Airemover claim to remove Google SynthID pixel watermarks?',
        answer: 'No. Airemover specifically removes digital file header tags and metadata. Imperceptible frequency-domain pixel watermarks like SynthID are not removed because doing so would destroy image quality.',
      },
      {
        question: 'Will removing AI tags affect image appearance or colors?',
        answer: 'No. Visual pixels, dimensions, and color profiles remain identical to the original asset.',
      },
    ],
  },

  '/ai-hyphen-remover': {
    path: '/ai-hyphen-remover',
    canonicalUrl: `${BASE_CANONICAL_DOMAIN}/ai-hyphen-remover`,
    title: 'AI Hyphen Remover – Clean Em Dashes & En Dashes in AI Text | AIremover',
    metaDescription: 'Remove repetitive em dashes (—), en dashes (–), and unnecessary hyphens from ChatGPT, Claude, and AI-generated text for natural, human readability.',
    h1: 'AI Hyphen Remover: Eliminate Robotic Em Dashes from AI Text',
    subtitle: 'Eliminate repetitive em dashes (—), en dashes (–), and robotic hyphenation from AI text to restore natural human cadence and readability.',
    activeTool: 'hyphen',
    badgeText: 'AI Text Humanizer • Em & En Dash Purger',
    keywords: 'AI hyphen remover, remove em dashes AI, remove en dashes, AI dash remover, humanize AI text, remove hyphens from ChatGPT text, fix AI writing cadence',
    ogTitle: 'AI Hyphen Remover – Clean Em Dashes & En Dashes in AI Text | AIremover',
    ogDescription: 'Remove repetitive em dashes (—), en dashes (–), and unnecessary hyphens from ChatGPT, Claude, and AI-generated text for natural, human readability.',
    sectionHeading: 'How the AI Hyphen & Dash Remover Works',
    sectionDescription: 'A specialized browser-based text cleaner designed to remove robotic em dashes, balance sentence punctuation, and humanize AI writing.',
    featurePillars: [
      {
        title: 'Intelligent Cadence Restoration',
        description: 'Analyzes parenthetical phrases and transitions, substituting awkward em dashes with natural commas, semicolons, or sentence breaks.',
        icon: 'sparkles',
      },
      {
        title: 'Compound Word Protection',
        description: 'Safeguards legitimate hyphenated adjectives (e.g. "state-of-the-art", "user-friendly") while removing repetitive punctuation dashes.',
        icon: 'shield',
      },
      {
        title: '100% In-Browser Privacy',
        description: 'Processes your confidential text, articles, and drafts entirely in local browser RAM. No text is ever uploaded or logged.',
        icon: 'lock',
      },
    ],
    contentSections: [
      {
        heading: 'Why Large Language Models Overuse Em Dashes (—)',
        body: [
          'One of the most noticeable stylistic traits of modern LLMs (including ChatGPT, Claude, and Gemini) is the repetitive use of em dashes (—) and en dashes (–). AI models are trained on diverse datasets where authors use em dashes to insert parenthetical thoughts into sentences.',
          'In generated output, models tend to over-index on this syntactic pattern, inserting em dashes across consecutive sentences. This creates an unnatural, rhythmic cadence that human readers and automated AI detectors immediately recognize as machine-generated.',
        ],
      },
      {
        heading: 'The Impact on Readability and AI Content Detection',
        body: [
          'While a single em dash can provide emphasis in well-crafted literature, stacking three or four dashes in a single paragraph disrupts reading flow. Sentences feel fragmented, staccato, and artificial.',
          'Many AI detection algorithms incorporate dash frequency and sentence variance into their perplexity and burstiness metrics. Cleaning excessive dashes restores an organic, conversational rhythm that reads smoothly.',
        ],
      },
      {
        heading: 'Intelligent Replacement Strategies',
        body: [
          'The AI Hyphen Remover provides four customizable replacement strategies to suit any editorial context:',
          '• Natural Flow (Recommended): Contextually replaces dashes with commas, periods, or natural pauses based on sentence position and surrounding capitalization.',
          '• Standard Commas: Direct substitution of em and en dashes with standard commas.',
          '• Clean Spaces: Removes dashes and collapses adjacent spaces into a single clean word separator.',
          '• Strict Strip: Purges dashes entirely, closing gaps according to grammatical context.',
        ],
      },
      {
        heading: 'Preserving Legitimate Compound Word Hyphens',
        body: [
          'Standard find-and-replace tools often ruin text by stripping essential hyphens from compound modifiers (such as "well-known author", "real-time analytics", or "high-resolution display").',
          'Our engine intelligently distinguishes between punctuation dashes (em dashes, en dashes, spaced hyphens) and legitimate lexical hyphens, ensuring your grammar remains pristine while removing robotic punctuation.',
        ],
      },
    ],
    faqList: [
      {
        question: 'Why does ChatGPT use so many em dashes (—)?',
        answer: 'ChatGPT uses em dashes because its training rewards syntactic complexity and parenthetical elaboration. Without guidance, it defaults to em dashes to connect clauses.',
      },
      {
        question: 'Does this tool remove em dashes (—) and en dashes (–)?',
        answer: 'Yes. It detects and cleans unicode em dashes (U+2014), en dashes (U+2013), horizontal bars (U+2015), and double hyphens (--).',
      },
      {
        question: 'Will it break legitimate hyphenated words like "cost-effective"?',
        answer: 'No. By default, legitimate compound word hyphens are preserved. You can optionally toggle full hyphen removal if you want an absolute purge.',
      },
      {
        question: 'Is my text sent to a remote server or logged?',
        answer: 'No. All text processing occurs strictly in your device browser memory. Your confidential copy, essays, and drafts never leave your screen.',
      },
    ],
  },
};

export function getSeoConfigForPath(pathname: string): RouteSeoConfig {
  const normalized = pathname.length > 1 && pathname.endsWith('/') ? pathname.slice(0, -1) : pathname;
  return SEO_ROUTES[normalized] || SEO_ROUTES['/'];
}
