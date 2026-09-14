import React, { useState, useEffect, useCallback } from 'react';
import {
  ShieldCheck,
  Sparkles,
  Lock,
  Layers,
  Zap,
  CheckCircle2,
  RefreshCw,
  Image as ImageIcon,
} from 'lucide-react';
import { ProcessedImage, SanitizationConfig } from './types';
import { analyzeImageMetadata } from './lib/metadataParser';
import { sanitizeImage } from './lib/sanitizer';
import { DropZone } from './components/DropZone';
import { SettingsBar } from './components/SettingsBar';
import { ImageCard } from './components/ImageCard';
import { MetadataModal } from './components/MetadataModal';
import { ThemeToggle } from './components/ThemeToggle';
import { SeoKnowledgeSection } from './components/SeoKnowledgeSection';

export default function App() {
  const [currentImage, setCurrentImage] = useState<ProcessedImage | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [inspectImage, setInspectImage] = useState<ProcessedImage | null>(null);

  const [config, setConfig] = useState<SanitizationConfig>({
    format: 'auto',
    engine: 'binary',
    jpegQuality: 1.0, // 100% maximum quality
    prefixCleanName: false,
  });

  // Clean up object URLs when replacing or unmounting
  useEffect(() => {
    return () => {
      if (currentImage?.originalUrl) URL.revokeObjectURL(currentImage.originalUrl);
      if (currentImage?.cleanedUrl) URL.revokeObjectURL(currentImage.cleanedUrl);
    };
  }, [currentImage]);

  const processFile = async (file: File, currentConfig: SanitizationConfig): Promise<ProcessedImage> => {
    const id = Math.random().toString(36).substring(2, 9) + '_' + Date.now();
    const originalUrl = URL.createObjectURL(file);
    const startTime = performance.now();

    // 1. Initial image dimensions
    let originalWidth = 0;
    let originalHeight = 0;
    try {
      const img = new Image();
      img.src = originalUrl;
      await new Promise((resolve) => {
        img.onload = () => {
          originalWidth = img.naturalWidth;
          originalHeight = img.naturalHeight;
          resolve(null);
        };
        img.onerror = () => resolve(null);
      });
    } catch {
      // Fallback
    }

    // 2. Binary analysis of AI tags, prompts, EXIF, and C2PA
    const buffer = await file.arrayBuffer();
    const analysis = await analyzeImageMetadata(buffer);

    // 3. Sanitization (lossless binary surgery or 100% quality canvas re-encode)
    let cleanedBlob: Blob | undefined;
    let cleanedUrl: string | undefined;
    let cleanedFormat = file.type || 'image/png';
    let cleanedWidth = originalWidth;
    let cleanedHeight = originalHeight;
    let postAnalysis;

    try {
      const result = await sanitizeImage(file, currentConfig);
      cleanedBlob = result.blob;
      cleanedUrl = URL.createObjectURL(result.blob);
      cleanedFormat = result.mimeType;
      cleanedWidth = result.width;
      cleanedHeight = result.height;

      // Post verification: verify that all AI tags are completely purged
      const postBuffer = await result.blob.arrayBuffer();
      postAnalysis = await analyzeImageMetadata(postBuffer);
    } catch (err: any) {
      console.error('Sanitization error:', err);
      return {
        id,
        file,
        name: file.name,
        originalSize: file.size,
        originalUrl,
        originalWidth,
        originalHeight,
        originalFormat: file.type,
        analysis,
        cleanedFormat,
        status: 'error',
        errorMessage: err?.message || 'Failed to sanitize image',
      };
    }

    const endTime = performance.now();
    const processingTimeMs = Math.round(endTime - startTime);

    return {
      id,
      file,
      name: file.name,
      originalSize: file.size,
      originalUrl,
      originalWidth,
      originalHeight,
      originalFormat: file.type,
      analysis,
      cleanedBlob,
      cleanedUrl,
      cleanedSize: cleanedBlob.size,
      cleanedFormat,
      cleanedWidth,
      cleanedHeight,
      postAnalysis,
      status: 'ready',
      processingTimeMs,
    };
  };

  const handleFilesSelected = useCallback(
    async (files: File[]) => {
      if (!files || files.length === 0) return;
      setIsProcessing(true);

      // Clean previously loaded URLs to prevent memory buildup
      if (currentImage?.originalUrl) URL.revokeObjectURL(currentImage.originalUrl);
      if (currentImage?.cleanedUrl) URL.revokeObjectURL(currentImage.cleanedUrl);

      // Process the target file directly
      const targetFile = files[0];
      const result = await processFile(targetFile, config);
      setCurrentImage(result);
      setIsProcessing(false);
    },
    [config, currentImage]
  );

  const getCleanFileName = (img: ProcessedImage): string => {
    let baseName = img.name.replace(/\.[^/.]+$/, '');
    
    // Remove common AI keywords from filename if present
    baseName = baseName
      .replace(/(_|\b)(midjourney|dall-?e|stable_diffusion|sdxl|flux|ai_generated|comfyui)(_|\b)/gi, '')
      .replace(/__+/g, '_')
      .replace(/^_+|_+$/g, '');

    if (!baseName) baseName = 'image';

    const ext = img.cleanedFormat.includes('png')
      ? '.png'
      : img.cleanedFormat.includes('webp')
      ? '.webp'
      : '.jpg';

    if (config.prefixCleanName) {
      return `clean_${baseName}${ext}`;
    }
    return `${baseName}${ext}`;
  };

  const handleDownload = (img: ProcessedImage) => {
    if (!img.cleanedBlob || !img.cleanedUrl) return;

    const fileName = getCleanFileName(img);
    const link = document.createElement('a');
    link.href = img.cleanedUrl;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleReset = () => {
    if (currentImage?.originalUrl) URL.revokeObjectURL(currentImage.originalUrl);
    if (currentImage?.cleanedUrl) URL.revokeObjectURL(currentImage.cleanedUrl);
    setCurrentImage(null);
  };

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 flex flex-col font-sans selection:bg-neutral-900 dark:selection:bg-neutral-100 selection:text-white dark:selection:text-neutral-950 transition-colors duration-200">
      {/* Top Navbar */}
      <header className="sticky top-0 z-40 bg-white/90 dark:bg-neutral-900/90 backdrop-blur-md border-b border-neutral-200 dark:border-neutral-800 transition-colors">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-neutral-900 dark:bg-neutral-100 flex items-center justify-center text-white dark:text-neutral-900 shadow-xs">
              <ShieldCheck className="w-5 h-5 stroke-[2]" />
            </div>
            <div>
              <span className="font-extrabold text-neutral-900 dark:text-neutral-100 text-base tracking-tight block leading-tight">
                AI Metadata Remover
              </span>
              <span className="text-[11px] text-neutral-500 dark:text-neutral-400 font-medium">
                100% Quality • Client-Side Sanitizer
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* 100% Client-Side Privacy Badge */}
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200/80 dark:border-emerald-800/60 rounded-lg text-xs font-semibold">
              <Lock className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>100% Private (No Upload)</span>
            </div>

            {/* Day and Night Mode Toggle */}
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Title & Introduction */}
        <section aria-labelledby="main-heading" className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-neutral-200/70 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 rounded-full text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-neutral-900 dark:text-neutral-100" />
            <span>100% Quality Preserved • Prompts & C2PA Purged</span>
          </div>
          <h1 id="main-heading" className="text-3xl sm:text-4xl font-extrabold text-neutral-900 dark:text-neutral-50 tracking-tight leading-tight">
            Clean AI Metadata & Tags Instantly
          </h1>
          <p className="mt-3 text-sm sm:text-base text-neutral-600 dark:text-neutral-400 leading-relaxed">
            Upload any image generated by Midjourney, Stable Diffusion, DALL-E 3, Flux, or ComfyUI.
            Instantly download the clean image with all AI prompts and provenance manifests permanently removed at identical visual quality.
          </p>
        </section>

        {/* Output Settings */}
        <SettingsBar
          config={config}
          onChangeConfig={setConfig}
        />

        {/* Active Cleaned Image OR Upload DropZone */}
        {currentImage ? (
          <section aria-label="Cleaned Image Output" className="space-y-4">
            <div className="flex items-center justify-between px-1">
              <h2 className="text-sm font-bold text-neutral-900 dark:text-neutral-100 uppercase tracking-wider">
                Cleaned Image
              </h2>
              <button
                type="button"
                onClick={handleReset}
                className="text-xs font-semibold text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 inline-flex items-center gap-1 transition-colors"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Upload New Image</span>
              </button>
            </div>

            <ImageCard
              image={currentImage}
              onDownload={handleDownload}
              onReset={handleReset}
              onInspectMetadata={(target) => setInspectImage(target)}
              prefixCleanName={config.prefixCleanName}
            />
          </section>
        ) : (
          <section aria-label="Upload Area" className="space-y-8">
            <DropZone onFilesSelected={handleFilesSelected} isProcessing={isProcessing} />

            {/* Feature Highlights */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-2xs">
                <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 flex items-center justify-center mb-3">
                  <ShieldCheck className="w-5 h-5 stroke-[2]" />
                </div>
                <h3 className="font-bold text-neutral-900 dark:text-neutral-100 text-sm mb-1">
                  Erase Prompts & Seeds
                </h3>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
                  Strips embedded positive/negative prompts, seed numbers, sampler settings, and ComfyUI workflow graphs from PNG text chunks and EXIF.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-2xs">
                <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-400 flex items-center justify-center mb-3">
                  <CheckCircle2 className="w-5 h-5 stroke-[2]" />
                </div>
                <h3 className="font-bold text-neutral-900 dark:text-neutral-100 text-sm mb-1">
                  100% Original Quality
                </h3>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
                  Maintains identical image pixels with zero compression loss. The visual image is completely indistinguishable from the original.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-2xs">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 flex items-center justify-center mb-3">
                  <Lock className="w-5 h-5 stroke-[2]" />
                </div>
                <h3 className="font-bold text-neutral-900 dark:text-neutral-100 text-sm mb-1">
                  100% Private & Browser-Based
                </h3>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
                  Processes locally in your device memory. No photos, prompts, or data are ever uploaded to any external server.
                </p>
              </div>
            </div>
          </section>
        )}

        {/* Semantic SEO & AI Search Engine Knowledge & FAQ Section */}
        <SeoKnowledgeSection />
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 py-6 transition-colors">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-neutral-500 dark:text-neutral-400">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-neutral-800 dark:text-neutral-200">AI Metadata Remover</span>
            <span>•</span>
            <span>Client-Side Privacy & Lossless Quality Image Sanitizer</span>
          </div>

          <div className="text-neutral-500 dark:text-neutral-400">
            Supports Midjourney, Stable Diffusion, DALL-E 3, Flux & ComfyUI
          </div>
        </div>
      </footer>

      {/* Metadata Detail Inspection Modal */}
      <MetadataModal
        image={inspectImage}
        onClose={() => setInspectImage(null)}
      />
    </div>
  );
}
