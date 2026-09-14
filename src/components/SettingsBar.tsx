import React from 'react';
import { Sliders, Sparkles } from 'lucide-react';
import { CleanEngine, CleanFormat, SanitizationConfig } from '../types';

interface SettingsBarProps {
  config: SanitizationConfig;
  onChangeConfig: (newConfig: SanitizationConfig) => void;
}

export const SettingsBar: React.FC<SettingsBarProps> = ({
  config,
  onChangeConfig,
}) => {
  return (
    <div id="settings-bar" className="w-full bg-white dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-800 p-3.5 shadow-2xs mb-6 transition-colors">
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-1.5 text-neutral-800 dark:text-neutral-200 font-semibold">
            <Sliders className="w-3.5 h-3.5 text-neutral-500" />
            <span>Output Preference:</span>
          </div>

          {/* Format selector */}
          <div className="flex items-center gap-1.5">
            <label htmlFor="format-select" className="text-neutral-500 dark:text-neutral-400 font-medium">
              Format:
            </label>
            <select
              id="format-select"
              value={config.format}
              onChange={(e) =>
                onChangeConfig({ ...config, format: e.target.value as CleanFormat })
              }
              className="bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-800 dark:text-neutral-200 text-xs rounded-lg px-2.5 py-1 font-medium focus:ring-1 focus:ring-neutral-900 dark:focus:ring-neutral-100 focus:outline-hidden"
            >
              <option value="auto">Original Format (100% Quality)</option>
              <option value="png">PNG (Lossless)</option>
              <option value="jpeg">JPEG (Max 100% Quality)</option>
              <option value="webp">WebP (Optimized)</option>
            </select>
          </div>

          {/* Clean prefix toggle */}
          <label className="flex items-center gap-2 cursor-pointer text-neutral-600 dark:text-neutral-400 select-none">
            <input
              type="checkbox"
              id="prefix-clean-name-checkbox"
              checked={config.prefixCleanName}
              onChange={(e) =>
                onChangeConfig({ ...config, prefixCleanName: e.target.checked })
              }
              className="rounded border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100 focus:ring-neutral-900 w-3.5 h-3.5"
            />
            <span>Add <code className="bg-neutral-100 dark:bg-neutral-800 px-1 py-0.5 rounded font-mono text-[11px] text-neutral-800 dark:text-neutral-300">clean_</code> prefix to filename</span>
          </label>
        </div>

        <div className="hidden sm:flex items-center gap-1 text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Lossless Bit-Level Quality</span>
        </div>
      </div>
    </div>
  );
};
