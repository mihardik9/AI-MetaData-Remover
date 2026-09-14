import React, { useState } from 'react';
import { Download, Eye, RefreshCw, ShieldCheck, ShieldAlert, Cpu, Check, Layers, Sparkles } from 'lucide-react';
import { ProcessedImage } from '../types';

interface ImageCardProps {
  image: ProcessedImage;
  onDownload: (image: ProcessedImage) => void;
  onReset: () => void;
  onInspectMetadata: (image: ProcessedImage) => void;
  prefixCleanName: boolean;
}

export const ImageCard: React.FC<ImageCardProps> = ({
  image,
  onDownload,
  onReset,
  onInspectMetadata,
}) => {
  const [viewMode, setViewMode] = useState<'cleaned' | 'original'>('cleaned');
  const [copiedPrompt, setCopiedPrompt] = useState(false);

  const formatBytes = (bytes: number): string => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleCopyPrompt = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (image.analysis.promptText) {
      navigator.clipboard.writeText(image.analysis.promptText);
      setCopiedPrompt(true);
      setTimeout(() => setCopiedPrompt(false), 2000);
    }
  };

  const currentPreviewUrl =
    viewMode === 'original' ? image.originalUrl : image.cleanedUrl || image.originalUrl;

  return (
    <div
      id="cleaned-image-card"
      className="bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-sm overflow-hidden flex flex-col md:flex-row transition-all duration-200"
    >
      {/* Visual Preview Section */}
      <div className="md:w-80 lg:w-96 shrink-0 bg-neutral-100/70 dark:bg-neutral-950/70 p-4 sm:p-6 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-neutral-200 dark:border-neutral-800 relative group">
        <div className="w-full aspect-square max-w-[320px] rounded-xl overflow-hidden bg-neutral-200/50 dark:bg-neutral-800 flex items-center justify-center relative shadow-inner border border-neutral-200/80 dark:border-neutral-700/80">
          <img
            src={currentPreviewUrl}
            alt={image.name}
            className="w-full h-full object-contain"
            referrerPolicy="no-referrer"
          />

          {/* Mode Switcher pill */}
          <div className="absolute top-2.5 right-2.5 flex bg-white/95 dark:bg-neutral-900/95 backdrop-blur-xs rounded-lg p-0.5 shadow-xs border border-neutral-200/80 dark:border-neutral-700 text-[11px] font-medium">
            <button
              type="button"
              onClick={() => setViewMode('cleaned')}
              className={`px-2.5 py-1 rounded-md transition-colors ${
                viewMode === 'cleaned'
                  ? 'bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 font-semibold'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100'
              }`}
            >
              Cleaned
            </button>
            <button
              type="button"
              onClick={() => setViewMode('original')}
              className={`px-2.5 py-1 rounded-md transition-colors ${
                viewMode === 'original'
                  ? 'bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 font-semibold'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100'
              }`}
            >
              Original
            </button>
          </div>

          {/* Processing overlay */}
          {image.status === 'cleaning' && (
            <div className="absolute inset-0 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-xs flex flex-col items-center justify-center p-4">
              <div className="w-6 h-6 border-2 border-neutral-900 dark:border-neutral-100 border-t-transparent rounded-full animate-spin mb-2" />
              <span className="text-xs font-semibold text-neutral-800 dark:text-neutral-200">
                Stripping AI Metadata...
              </span>
            </div>
          )}
        </div>

        {/* Dimension & Format tag */}
        <div className="mt-3 flex items-center gap-2 text-xs text-neutral-500 dark:text-neutral-400 font-mono">
          <span>{image.originalWidth}×{image.originalHeight} px</span>
          <span>•</span>
          <span className="uppercase">{image.cleanedFormat.replace('image/', '')}</span>
          <span>•</span>
          <span className="text-emerald-700 dark:text-emerald-400 font-semibold">100% Quality</span>
        </div>
      </div>

      {/* Details & Action Content */}
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          {/* Header Row: Title & Badges */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
            <h4
              className="font-bold text-neutral-900 dark:text-neutral-100 text-lg truncate tracking-tight"
              title={image.name}
            >
              {image.name}
            </h4>
            
            <button
              type="button"
              onClick={onReset}
              className="text-xs font-semibold text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 inline-flex items-center gap-1 self-start sm:self-auto py-1 px-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Clean Another Image</span>
            </button>
          </div>

          {/* Badges */}
          <div className="flex flex-wrap items-center gap-2 mb-4">
            {/* AI Detected Badge */}
            {image.analysis.hasAIMetadata ? (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-100 dark:bg-amber-950/60 text-amber-900 dark:text-amber-300 border border-amber-200 dark:border-amber-800/60">
                <ShieldAlert className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                <span>AI Detected: {image.analysis.generatorName || 'Metadata Tagged'}</span>
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-700">
                <Cpu className="w-3.5 h-3.5 text-neutral-500" />
                <span>Standard Image</span>
              </span>
            )}

            {/* Sanitized status badge */}
            {image.status === 'ready' && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-900 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>Sanitized: 0 AI Tags Remaining</span>
              </span>
            )}

            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 border border-neutral-200 dark:border-neutral-700">
              <Sparkles className="w-3 h-3 text-neutral-500" />
              <span>100% Original Quality</span>
            </span>
          </div>

          {/* AI Extraction Snippet */}
          {image.analysis.promptText ? (
            <div className="my-3 p-3.5 rounded-xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200/80 dark:border-neutral-700/80 text-xs">
              <div className="flex items-center justify-between mb-1.5">
                <span className="font-semibold text-neutral-800 dark:text-neutral-200 text-[11px] uppercase tracking-wider flex items-center gap-1">
                  Embedded Prompt Discovered:
                </span>
                <button
                  type="button"
                  onClick={handleCopyPrompt}
                  className="text-[11px] font-medium text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors flex items-center gap-1"
                >
                  {copiedPrompt ? <Check className="w-3 h-3 text-emerald-600" /> : null}
                  <span>{copiedPrompt ? 'Copied!' : 'Copy prompt'}</span>
                </button>
              </div>
              <p className="line-clamp-2 font-mono text-[11px] text-neutral-600 dark:text-neutral-400 leading-relaxed select-all">
                "{image.analysis.promptText}"
              </p>
            </div>
          ) : image.analysis.hasC2PA ? (
            <div className="my-3 p-3.5 rounded-xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200/80 dark:border-neutral-700/80 text-xs">
              <span className="font-semibold text-neutral-800 dark:text-neutral-200 text-[11px] uppercase tracking-wider block mb-1">
                C2PA Provenance Manifest Removed:
              </span>
              <p className="font-mono text-[11px] text-neutral-600 dark:text-neutral-400">
                Purged digital authenticity manifest and JUMBF tracking flags flagging AI origin.
              </p>
            </div>
          ) : null}

          {/* Metrics summary */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 py-2.5 px-3.5 bg-neutral-50/70 dark:bg-neutral-800/40 rounded-xl border border-neutral-200/60 dark:border-neutral-800 text-xs">
            <div>
              <span className="text-neutral-400 text-[10px] uppercase font-bold block">Original Size</span>
              <span className="font-semibold text-neutral-800 dark:text-neutral-200 font-mono">
                {formatBytes(image.originalSize)}
              </span>
            </div>
            <div>
              <span className="text-neutral-400 text-[10px] uppercase font-bold block">Cleaned Size</span>
              <span className="font-semibold text-emerald-700 dark:text-emerald-400 font-mono">
                {image.cleanedSize ? formatBytes(image.cleanedSize) : '—'}
              </span>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <span className="text-neutral-400 text-[10px] uppercase font-bold block">Removed Chunks</span>
              <span className="font-semibold text-neutral-700 dark:text-neutral-300 font-mono">
                {image.analysis.tagsFound.length} tags stripped
              </span>
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="mt-6 pt-4 border-t border-neutral-100 dark:border-neutral-800 flex flex-wrap items-center justify-between gap-3">
          <button
            type="button"
            id="inspect-meta-btn"
            onClick={() => onInspectMetadata(image)}
            className="text-xs font-semibold text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white inline-flex items-center gap-1.5 px-3 py-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Inspect Stripped Metadata ({image.analysis.tagsFound.length})</span>
          </button>

          <button
            type="button"
            id="download-clean-btn"
            disabled={image.status !== 'ready'}
            onClick={() => onDownload(image)}
            className="px-6 py-2.5 bg-neutral-900 hover:bg-neutral-800 dark:bg-neutral-100 dark:hover:bg-white text-white dark:text-neutral-900 disabled:bg-neutral-300 dark:disabled:bg-neutral-700 rounded-xl text-xs font-bold inline-flex items-center gap-2 transition-colors shadow-sm"
          >
            <Download className="w-4 h-4" />
            <span>Download Clean Image</span>
          </button>
        </div>
      </div>
    </div>
  );
};
