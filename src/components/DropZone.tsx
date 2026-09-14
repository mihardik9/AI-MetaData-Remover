import React, { useRef, useState, useEffect } from 'react';
import { Upload, Image as ImageIcon, Sparkles, Clipboard, ShieldCheck, Zap } from 'lucide-react';
import { SAMPLE_PRESETS, SamplePreset } from '../lib/sampleImages';

interface DropZoneProps {
  onFilesSelected: (files: File[]) => void;
  isProcessing: boolean;
}

export const DropZone: React.FC<DropZoneProps> = ({ onFilesSelected, isProcessing }) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Global paste listener so users can just press Cmd+V / Ctrl+V
  useEffect(() => {
    const handlePaste = (e: ClipboardEvent) => {
      const items = e.clipboardData?.items;
      if (!items) return;

      const imageFiles: File[] = [];
      for (let i = 0; i < items.length; i++) {
        if (items[i].type.startsWith('image/')) {
          const file = items[i].getAsFile();
          if (file) {
            imageFiles.push(
              new File([file], `pasted_ai_image_${Date.now()}.${file.type.split('/')[1] || 'png'}`, {
                type: file.type,
              })
            );
          }
        }
      }

      if (imageFiles.length > 0) {
        onFilesSelected(imageFiles);
      }
    };

    window.addEventListener('paste', handlePaste);
    return () => window.removeEventListener('paste', handlePaste);
  }, [onFilesSelected]);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const files = Array.from(e.dataTransfer.files).filter((file: File) =>
        file.type.startsWith('image/') || /\.(png|jpe?g|webp|avif)$/i.test(file.name)
      );
      if (files.length > 0) {
        onFilesSelected(files);
      }
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const files = Array.from(e.target.files);
      onFilesSelected(files);
      e.target.value = '';
    }
  };

  const handleLoadSample = async (preset: SamplePreset) => {
    try {
      const sampleFile = await preset.createFile();
      onFilesSelected([sampleFile]);
    } catch (err) {
      console.error('Failed to create sample file:', err);
    }
  };

  return (
    <div id="drop-zone-container" className="w-full">
      <div
        id="drop-zone-card"
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`relative group cursor-pointer rounded-2xl border-2 border-dashed transition-all duration-200 p-8 sm:p-12 text-center flex flex-col items-center justify-center bg-white dark:bg-neutral-900 ${
          isDragOver
            ? 'border-neutral-900 dark:border-neutral-100 bg-neutral-100/70 dark:bg-neutral-800/80 scale-[1.005]'
            : 'border-neutral-300 dark:border-neutral-700 hover:border-neutral-400 dark:hover:border-neutral-600 hover:bg-neutral-50/50 dark:hover:bg-neutral-850/50 shadow-sm'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          id="file-upload-input"
          accept="image/png,image/jpeg,image/webp,image/avif"
          onChange={handleFileInputChange}
          className="hidden"
        />

        <div className="w-16 h-16 rounded-2xl bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-neutral-800 dark:text-neutral-200 mb-4 group-hover:scale-105 transition-transform duration-200 shadow-xs">
          <Upload className="w-8 h-8 stroke-[1.75]" />
        </div>

        <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-100 tracking-tight mb-2">
          Drop your AI-generated image here
        </h3>
        
        <p className="text-sm text-neutral-500 dark:text-neutral-400 max-w-md mx-auto mb-6">
          Supports PNG, JPEG, WebP & AVIF. Instantly strips prompts, C2PA Content Credentials, ComfyUI graphs, and EXIF tags with 100% quality retention.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            id="browse-files-button"
            className="px-5 py-2.5 bg-neutral-900 hover:bg-neutral-800 dark:bg-neutral-100 dark:hover:bg-white text-white dark:text-neutral-900 rounded-xl text-sm font-semibold tracking-tight transition-colors shadow-sm inline-flex items-center gap-2"
          >
            <ImageIcon className="w-4 h-4" />
            Browse Image
          </button>
          
          <div className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 rounded-xl text-xs font-medium border border-neutral-200 dark:border-neutral-700">
            <Clipboard className="w-3.5 h-3.5" />
            <span>Paste with Ctrl+V / Cmd+V</span>
          </div>
        </div>

        {/* Feature badges row */}
        <div className="mt-8 pt-6 border-t border-neutral-100 dark:border-neutral-800 flex flex-wrap items-center justify-center gap-6 text-xs text-neutral-500 dark:text-neutral-400">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>100% Quality & Client-Side</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Zap className="w-4 h-4 text-amber-500 dark:text-amber-400" />
            <span>Instant Processing</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-neutral-700 dark:text-neutral-300" />
            <span>Midjourney, SD, DALL-E 3 & Flux</span>
          </div>
        </div>
      </div>

      {/* Preset demo triggers */}
      <div id="sample-presets-row" className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-3 px-2">
        <span className="text-xs font-medium text-neutral-500 dark:text-neutral-400 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-neutral-400 dark:text-neutral-500" />
          Test with an AI demo sample:
        </span>
        <div className="flex flex-wrap items-center gap-2">
          {SAMPLE_PRESETS.map((preset) => (
            <button
              key={preset.id}
              id={`sample-btn-${preset.id}`}
              type="button"
              disabled={isProcessing}
              onClick={(e) => {
                e.stopPropagation();
                handleLoadSample(preset);
              }}
              className="px-3 py-1.5 bg-white dark:bg-neutral-900 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-300 text-xs font-medium rounded-lg border border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 transition-colors inline-flex items-center gap-1.5 shadow-2xs"
            >
              <span className="w-2 h-2 rounded-full bg-neutral-900 dark:bg-neutral-100"></span>
              <span>{preset.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
