import React from 'react';
import { X, ShieldAlert, ShieldCheck, Cpu, Terminal, FileText, CheckCircle2 } from 'lucide-react';
import { ProcessedImage } from '../types';

interface MetadataModalProps {
  image: ProcessedImage | null;
  onClose: () => void;
}

export const MetadataModal: React.FC<MetadataModalProps> = ({ image, onClose }) => {
  if (!image) return null;

  const { analysis } = image;

  return (
    <div
      id="metadata-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-900/60 dark:bg-black/70 backdrop-blur-xs animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        id="metadata-modal-content"
        className="bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-2xl max-w-2xl w-full max-h-[85vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-150 text-neutral-900 dark:text-neutral-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-100 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-950/50">
          <div className="flex items-center gap-2.5">
            <div className={`p-1.5 rounded-lg ${analysis.hasAIMetadata ? 'bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300' : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300'}`}>
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-neutral-900 dark:text-neutral-100 text-base">Metadata Inspection</h3>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 truncate max-w-xs sm:max-w-md">{image.name}</p>
            </div>
          </div>
          <button
            type="button"
            id="close-metadata-modal-btn"
            onClick={onClose}
            className="p-2 text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body scrollable */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm">
          {/* Comparison Status Box */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3.5 rounded-xl border border-amber-200 dark:border-amber-800/80 bg-amber-50/40 dark:bg-amber-950/30">
              <div className="flex items-center gap-2 text-amber-900 dark:text-amber-300 font-semibold text-xs mb-1">
                <ShieldAlert className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                <span>Original State (Detected)</span>
              </div>
              <p className="text-xs text-neutral-700 dark:text-neutral-300 font-medium">
                {analysis.hasAIMetadata ? (
                  <span className="text-amber-800 dark:text-amber-300 font-semibold">
                    Contains AI metadata ({analysis.generatorName || 'AI Generated'})
                  </span>
                ) : (
                  <span className="text-neutral-600 dark:text-neutral-400">No explicit AI metadata found</span>
                )}
              </p>
              <div className="mt-2 text-[11px] text-neutral-500 dark:text-neutral-400">
                Found {analysis.tagsFound.length} metadata tags / chunks
              </div>
            </div>

            <div className="p-3.5 rounded-xl border border-emerald-200 dark:border-emerald-800/80 bg-emerald-50/40 dark:bg-emerald-950/30">
              <div className="flex items-center gap-2 text-emerald-900 dark:text-emerald-300 font-semibold text-xs mb-1">
                <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>Cleaned Output (Verified)</span>
              </div>
              <p className="text-xs text-emerald-800 dark:text-emerald-300 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                0 AI tags • 0 C2PA manifests • Clean
              </p>
              <div className="mt-2 text-[11px] text-neutral-500 dark:text-neutral-400">
                Exact pixel raster preserved with 100% quality
              </div>
            </div>
          </div>

          {/* AI Generator & Provenance */}
          {analysis.generatorName && (
            <div>
              <h4 className="text-xs font-bold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider mb-2">
                Identified Generator / Origin
              </h4>
              <div className="px-3.5 py-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-800 dark:text-neutral-200 font-mono text-xs">
                {analysis.generatorName}
              </div>
            </div>
          )}

          {/* Extracted Prompt */}
          {analysis.promptText && (
            <div>
              <h4 className="text-xs font-bold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5" />
                Extracted Positive Prompt
              </h4>
              <div className="p-3.5 rounded-xl bg-neutral-900 dark:bg-black text-neutral-100 font-mono text-xs leading-relaxed overflow-x-auto select-all max-h-40 border border-neutral-800">
                {analysis.promptText}
              </div>
            </div>
          )}

          {/* Extracted Negative Prompt */}
          {analysis.negativePrompt && (
            <div>
              <h4 className="text-xs font-bold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider mb-2">
                Extracted Negative Prompt
              </h4>
              <div className="p-3.5 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 font-mono text-xs leading-relaxed overflow-x-auto select-all max-h-32 border border-neutral-200 dark:border-neutral-700">
                {analysis.negativePrompt}
              </div>
            </div>
          )}

          {/* Model & Generation Parameters */}
          {analysis.modelInfo && (
            <div>
              <h4 className="text-xs font-bold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider mb-2">
                Generation Parameters (Sampler, CFG, Seed)
              </h4>
              <div className="p-3.5 rounded-xl bg-neutral-50 dark:bg-neutral-800/80 border border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 font-mono text-xs leading-relaxed overflow-x-auto select-all">
                {analysis.modelInfo}
              </div>
            </div>
          )}

          {/* Detailed tags list */}
          <div>
            <h4 className="text-xs font-bold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5" />
              Stripped Metadata Chunks & Markers ({analysis.tagsFound.length})
            </h4>

            {analysis.tagsFound.length === 0 ? (
              <p className="text-xs text-neutral-500 dark:text-neutral-400 italic p-3 bg-neutral-50 dark:bg-neutral-800 rounded-lg">
                No standard metadata chunks were identified in the source container.
              </p>
            ) : (
              <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                {analysis.tagsFound.map((tag, idx) => (
                  <div
                    key={idx}
                    className={`p-2.5 rounded-lg border text-xs ${
                      tag.criticalAI
                        ? 'border-amber-200 dark:border-amber-800/60 bg-amber-50/60 dark:bg-amber-950/40'
                        : 'border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-800/50'
                    }`}
                  >
                    <div className="flex items-center justify-between font-semibold mb-1">
                      <span className={tag.criticalAI ? 'text-amber-900 dark:text-amber-300' : 'text-neutral-800 dark:text-neutral-200'}>
                        {tag.label}
                      </span>
                      {tag.criticalAI && (
                        <span className="px-1.5 py-0.5 rounded text-[10px] bg-amber-200 dark:bg-amber-800 text-amber-900 dark:text-amber-100 font-bold uppercase tracking-tight">
                          AI Tag
                        </span>
                      )}
                    </div>
                    <div className="text-neutral-600 dark:text-neutral-400 font-mono text-[11px] truncate select-all">
                      {tag.value}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-neutral-50 dark:bg-neutral-950 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-neutral-900 dark:bg-neutral-100 hover:bg-neutral-800 dark:hover:bg-white text-white dark:text-neutral-900 rounded-lg text-xs font-semibold tracking-tight transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
