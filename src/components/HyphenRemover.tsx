import React, { useState, useId } from 'react';
import {
  Scissors,
  Copy,
  Check,
  RotateCcw,
  Sparkles,
  Clipboard,
  FileText,
  CheckCircle2,
  SlidersHorizontal,
  Eye,
  ArrowRight,
} from 'lucide-react';
import {
  removeHyphensAndDashes,
  countWords,
  countChars,
  DashReplacementMode,
  HyphenCleanOptions,
  HyphenRemovalResult,
  SAMPLE_TEXTS,
} from '../lib/hyphenRemover';

export const HyphenRemover: React.FC = () => {
  const [inputText, setInputText] = useState<string>('');
  const [mode, setMode] = useState<DashReplacementMode>('smart');
  const [removeCompoundHyphens, setRemoveCompoundHyphens] = useState<boolean>(false);
  const [cleanExtraSpaces, setCleanExtraSpaces] = useState<boolean>(true);
  const [showDiff, setShowDiff] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  // Result state
  const [result, setResult] = useState<HyphenRemovalResult | null>(null);

  const inputWordCount = countWords(inputText);
  const inputCharCount = countChars(inputText);

  const handleProcess = () => {
    if (!inputText.trim()) {
      setResult(null);
      return;
    }
    const options: HyphenCleanOptions = {
      mode,
      removeCompoundHyphens,
      cleanExtraSpaces,
    };
    const res = removeHyphensAndDashes(inputText, options);
    setResult(res);
  };

  const handleClear = () => {
    setInputText('');
    setResult(null);
  };

  const handleCopy = () => {
    if (!result?.cleanedText) return;
    navigator.clipboard.writeText(result.cleanedText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) {
        setInputText(text);
        const options: HyphenCleanOptions = {
          mode,
          removeCompoundHyphens,
          cleanExtraSpaces,
        };
        const res = removeHyphensAndDashes(text, options);
        setResult(res);
      }
    } catch {
      // If clipboard access is blocked, user can still paste via Cmd/Ctrl+V
    }
  };

  const handleLoadSample = (sampleText: string) => {
    setInputText(sampleText);
    const options: HyphenCleanOptions = {
      mode,
      removeCompoundHyphens,
      cleanExtraSpaces,
    };
    const res = removeHyphensAndDashes(sampleText, options);
    setResult(res);
  };

  // Helper to render before text with highlighted dashes
  const renderHighlightedOriginal = (text: string) => {
    if (!text) return null;
    const parts = text.split(/([—–―‒]|--)/g);
    return parts.map((part, index) => {
      if (/[—–―‒]|--/.test(part)) {
        return (
          <mark
            key={index}
            className="bg-amber-200 dark:bg-amber-900/80 text-amber-950 dark:text-amber-200 px-1 py-0.5 rounded font-mono font-bold"
            title="Detected AI dash"
          >
            {part}
          </mark>
        );
      }
      return <span key={index}>{part}</span>;
    });
  };

  return (
    <div id="ai-hyphen-remover-root" className="w-full space-y-6">
      {/* Intro Header */}
      <section aria-labelledby="hyphen-tool-heading" className="text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-neutral-200/70 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 rounded-full text-xs font-semibold mb-3">
          <Sparkles className="w-3.5 h-3.5 text-neutral-900 dark:text-neutral-100" />
          <span>AI Humanizer • Em & En Dash Purger</span>
        </div>
        <h1
          id="hyphen-tool-heading"
          className="text-3xl sm:text-4xl font-extrabold text-neutral-900 dark:text-neutral-50 tracking-tight leading-tight"
        >
          AI Hyphen & Dash Remover
        </h1>
        <p className="mt-3 text-sm sm:text-base text-neutral-600 dark:text-neutral-400 leading-relaxed">
          Remove robotic em dashes (—), en dashes (–), and double hyphens typical of ChatGPT, Claude, and LLM writing. Replaces them with natural punctuation while keeping your sentences fluid and human.
        </p>
      </section>

      {/* Preset Samples */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-2xs text-xs">
        <div className="flex items-center gap-1.5 text-neutral-600 dark:text-neutral-400 font-medium">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>Load AI sample text:</span>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {SAMPLE_TEXTS.map((sample) => (
            <button
              key={sample.id}
              type="button"
              id={`load-sample-${sample.id}`}
              onClick={() => handleLoadSample(sample.text)}
              className="px-2.5 py-1 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-800 dark:text-neutral-200 rounded-lg text-xs font-medium transition-colors border border-neutral-200 dark:border-neutral-700"
            >
              {sample.title}
            </button>
          ))}
        </div>
      </div>

      {/* Options Bar */}
      <div className="p-4 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-2xs space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold text-neutral-900 dark:text-neutral-100 uppercase tracking-wider">
          <SlidersHorizontal className="w-3.5 h-3.5 text-neutral-500" />
          <span>Replacement Strategy</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 text-xs">
          <button
            type="button"
            onClick={() => {
              setMode('smart');
              if (inputText) {
                setResult(
                  removeHyphensAndDashes(inputText, {
                    mode: 'smart',
                    removeCompoundHyphens,
                    cleanExtraSpaces,
                  })
                );
              }
            }}
            className={`p-2.5 rounded-lg border text-left transition-all ${
              mode === 'smart'
                ? 'border-neutral-900 dark:border-neutral-100 bg-neutral-100/80 dark:bg-neutral-800 font-semibold text-neutral-900 dark:text-white ring-1 ring-neutral-900 dark:ring-neutral-100'
                : 'border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-850'
            }`}
          >
            <span className="block font-bold text-neutral-900 dark:text-neutral-100 mb-0.5">
              Natural Flow (Recommended)
            </span>
            <span className="text-[11px] text-neutral-500 dark:text-neutral-400 block leading-tight">
              Smart commas, colons, or pauses for natural human rhythm
            </span>
          </button>

          <button
            type="button"
            onClick={() => {
              setMode('comma');
              if (inputText) {
                setResult(
                  removeHyphensAndDashes(inputText, {
                    mode: 'comma',
                    removeCompoundHyphens,
                    cleanExtraSpaces,
                  })
                );
              }
            }}
            className={`p-2.5 rounded-lg border text-left transition-all ${
              mode === 'comma'
                ? 'border-neutral-900 dark:border-neutral-100 bg-neutral-100/80 dark:bg-neutral-800 font-semibold text-neutral-900 dark:text-white ring-1 ring-neutral-900 dark:ring-neutral-100'
                : 'border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-850'
            }`}
          >
            <span className="block font-bold text-neutral-900 dark:text-neutral-100 mb-0.5">
              Standard Commas ( , )
            </span>
            <span className="text-[11px] text-neutral-500 dark:text-neutral-400 block leading-tight">
              Replaces em/en dashes directly with commas
            </span>
          </button>

          <button
            type="button"
            onClick={() => {
              setMode('space');
              if (inputText) {
                setResult(
                  removeHyphensAndDashes(inputText, {
                    mode: 'space',
                    removeCompoundHyphens,
                    cleanExtraSpaces,
                  })
                );
              }
            }}
            className={`p-2.5 rounded-lg border text-left transition-all ${
              mode === 'space'
                ? 'border-neutral-900 dark:border-neutral-100 bg-neutral-100/80 dark:bg-neutral-800 font-semibold text-neutral-900 dark:text-white ring-1 ring-neutral-900 dark:ring-neutral-100'
                : 'border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-850'
            }`}
          >
            <span className="block font-bold text-neutral-900 dark:text-neutral-100 mb-0.5">
              Clean Spaces ( &nbsp; )
            </span>
            <span className="text-[11px] text-neutral-500 dark:text-neutral-400 block leading-tight">
              Removes dashes and connects with a single clean space
            </span>
          </button>

          <button
            type="button"
            onClick={() => {
              setMode('strip');
              if (inputText) {
                setResult(
                  removeHyphensAndDashes(inputText, {
                    mode: 'strip',
                    removeCompoundHyphens,
                    cleanExtraSpaces,
                  })
                );
              }
            }}
            className={`p-2.5 rounded-lg border text-left transition-all ${
              mode === 'strip'
                ? 'border-neutral-900 dark:border-neutral-100 bg-neutral-100/80 dark:bg-neutral-800 font-semibold text-neutral-900 dark:text-white ring-1 ring-neutral-900 dark:ring-neutral-100'
                : 'border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-850'
            }`}
          >
            <span className="block font-bold text-neutral-900 dark:text-neutral-100 mb-0.5">
              Strict Strip (Zero Punctuation)
            </span>
            <span className="text-[11px] text-neutral-500 dark:text-neutral-400 block leading-tight">
              Deletes em & en dashes without inserting replacements
            </span>
          </button>
        </div>

        {/* Additional Toggles */}
        <div className="pt-2 border-t border-neutral-100 dark:border-neutral-800 flex flex-wrap items-center justify-between gap-4 text-xs">
          <div className="flex flex-wrap items-center gap-4">
            <label className="flex items-center gap-2 cursor-pointer text-neutral-700 dark:text-neutral-300 select-none">
              <input
                type="checkbox"
                id="remove-compound-hyphens-check"
                checked={removeCompoundHyphens}
                onChange={(e) => {
                  setRemoveCompoundHyphens(e.target.checked);
                  if (inputText) {
                    setResult(
                      removeHyphensAndDashes(inputText, {
                        mode,
                        removeCompoundHyphens: e.target.checked,
                        cleanExtraSpaces,
                      })
                    );
                  }
                }}
                className="rounded border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100 focus:ring-neutral-900 w-3.5 h-3.5"
              />
              <span>Also remove word hyphens (e.g., <code className="font-mono text-[11px]">fast-paced</code> &rarr; <code className="font-mono text-[11px]">fast paced</code>)</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer text-neutral-700 dark:text-neutral-300 select-none">
              <input
                type="checkbox"
                id="clean-spaces-check"
                checked={cleanExtraSpaces}
                onChange={(e) => {
                  setCleanExtraSpaces(e.target.checked);
                  if (inputText) {
                    setResult(
                      removeHyphensAndDashes(inputText, {
                        mode,
                        removeCompoundHyphens,
                        cleanExtraSpaces: e.target.checked,
                      })
                    );
                  }
                }}
                className="rounded border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100 focus:ring-neutral-900 w-3.5 h-3.5"
              />
              <span>Clean double spaces & punctuation spacing</span>
            </label>
          </div>

          {result && (
            <button
              type="button"
              onClick={() => setShowDiff((prev) => !prev)}
              className="text-xs text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 inline-flex items-center gap-1.5 transition-colors font-medium"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>{showDiff ? 'Hide Highlighted Diffs' : 'Show Highlighted Diffs'}</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Input & Output Workstation */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        {/* Input Box Card */}
        <div className="bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-sm overflow-hidden flex flex-col">
          <div className="px-5 py-3.5 border-b border-neutral-100 dark:border-neutral-800 flex items-center justify-between bg-neutral-50/50 dark:bg-neutral-950/40">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-neutral-500" />
              <label htmlFor="hyphen-input-textarea" className="font-bold text-neutral-900 dark:text-neutral-100 text-sm">
                Original Text (Before)
              </label>
            </div>
            
            <div className="flex items-center gap-2">
              <button
                type="button"
                id="paste-text-btn"
                onClick={handlePaste}
                className="px-2.5 py-1 text-xs font-semibold text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 rounded-lg transition-colors inline-flex items-center gap-1"
                title="Paste from clipboard"
              >
                <Clipboard className="w-3 h-3" />
                <span>Paste</span>
              </button>

              {inputText && (
                <button
                  type="button"
                  id="clear-text-btn"
                  onClick={handleClear}
                  className="px-2.5 py-1 text-xs font-semibold text-neutral-500 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 rounded-lg transition-colors inline-flex items-center gap-1"
                  title="Clear text"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Clear</span>
                </button>
              )}
            </div>
          </div>

          <div className="p-4 sm:p-5 flex-1 flex flex-col">
            <textarea
              id="hyphen-input-textarea"
              value={inputText}
              onChange={(e) => {
                setInputText(e.target.value);
                if (result) {
                  // Live recalculation if output already generated
                  setResult(
                    removeHyphensAndDashes(e.target.value, {
                      mode,
                      removeCompoundHyphens,
                      cleanExtraSpaces,
                    })
                  );
                }
              }}
              placeholder="Paste your AI-generated text here containing em dashes (—), en dashes (–), or unnecessary hyphens..."
              className="w-full h-64 sm:h-72 p-3 text-sm font-sans bg-neutral-50/50 dark:bg-neutral-950/50 border border-neutral-200 dark:border-neutral-800 rounded-xl focus:outline-hidden focus:ring-1 focus:ring-neutral-900 dark:focus:ring-neutral-100 text-neutral-900 dark:text-neutral-100 resize-none leading-relaxed"
            />

            {/* Input Counter Footer */}
            <div className="mt-3 flex items-center justify-between text-xs text-neutral-500 dark:text-neutral-400">
              <div className="flex items-center gap-3 font-mono text-[11px]">
                <span><strong>{inputWordCount}</strong> words</span>
                <span>•</span>
                <span><strong>{inputCharCount}</strong> characters</span>
              </div>

              <button
                type="button"
                id="remove-hyphens-btn"
                disabled={!inputText.trim()}
                onClick={handleProcess}
                className="px-5 py-2 bg-neutral-900 hover:bg-neutral-800 dark:bg-neutral-100 dark:hover:bg-white text-white dark:text-neutral-900 disabled:bg-neutral-200 dark:disabled:bg-neutral-800 disabled:text-neutral-400 dark:disabled:text-neutral-600 rounded-xl text-xs font-bold inline-flex items-center gap-1.5 transition-colors shadow-sm"
              >
                <Scissors className="w-3.5 h-3.5" />
                <span>Remove Hyphens</span>
              </button>
            </div>
          </div>
        </div>

        {/* Output Box Card */}
        <div className="bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-sm overflow-hidden flex flex-col">
          <div className="px-5 py-3.5 border-b border-neutral-100 dark:border-neutral-800 flex items-center justify-between bg-neutral-50/50 dark:bg-neutral-950/40">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span className="font-bold text-neutral-900 dark:text-neutral-100 text-sm">
                Cleaned Result (After)
              </span>
            </div>

            {result && result.cleanedText && (
              <button
                type="button"
                id="copy-result-btn"
                onClick={handleCopy}
                className="px-3 py-1 text-xs font-bold bg-neutral-900 dark:bg-neutral-100 hover:bg-neutral-800 dark:hover:bg-white text-white dark:text-neutral-900 rounded-lg transition-colors inline-flex items-center gap-1.5 shadow-2xs"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400 dark:text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied to Clipboard!' : 'Copy Result'}</span>
              </button>
            )}
          </div>

          <div className="p-4 sm:p-5 flex-1 flex flex-col">
            {result && result.cleanedText ? (
              <div className="w-full h-64 sm:h-72 p-3 text-sm font-sans bg-neutral-50/50 dark:bg-neutral-950/50 border border-neutral-200 dark:border-neutral-800 rounded-xl overflow-y-auto leading-relaxed select-all text-neutral-900 dark:text-neutral-100">
                {showDiff ? (
                  <div className="space-y-3">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-neutral-400 block mb-1">
                        Highlighted Original Dashes:
                      </span>
                      <div className="text-xs leading-relaxed font-sans text-neutral-700 dark:text-neutral-300">
                        {renderHighlightedOriginal(result.originalText)}
                      </div>
                    </div>
                    <div className="pt-2 border-t border-neutral-200 dark:border-neutral-800">
                      <span className="text-[10px] uppercase font-bold text-emerald-600 dark:text-emerald-400 block mb-1">
                        Humanized Cleaned Text:
                      </span>
                      <p className="text-sm whitespace-pre-wrap">{result.cleanedText}</p>
                    </div>
                  </div>
                ) : (
                  <p className="whitespace-pre-wrap">{result.cleanedText}</p>
                )}
              </div>
            ) : (
              <div className="w-full h-64 sm:h-72 p-6 rounded-xl border border-dashed border-neutral-200 dark:border-neutral-800 flex flex-col items-center justify-center text-center text-neutral-400 dark:text-neutral-500">
                <Scissors className="w-8 h-8 stroke-[1.5] mb-2 opacity-50" />
                <p className="text-xs max-w-xs leading-relaxed">
                  Enter or paste text on the left and click <strong>“Remove Hyphens”</strong> to preview your natural, humanized copy here.
                </p>
              </div>
            )}

            {/* Output Counter & Stats Footer */}
            <div className="mt-3 flex items-center justify-between text-xs text-neutral-500 dark:text-neutral-400">
              <div className="flex items-center gap-3 font-mono text-[11px]">
                <span>
                  <strong>{result ? result.stats.cleanedWordCount : 0}</strong> words
                </span>
                <span>•</span>
                <span>
                  <strong>{result ? result.stats.cleanedCharCount : 0}</strong> characters
                </span>
              </div>

              {result && (
                <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{result.stats.totalDashesRemoved} dashes removed</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Breakdown Metrics Card when result is ready */}
      {result && result.stats.totalDashesRemoved > 0 && (
        <div className="p-4 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-2xs">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
            <div className="p-2.5 rounded-lg bg-neutral-50 dark:bg-neutral-800/60">
              <span className="text-[10px] uppercase font-bold text-neutral-400 block mb-0.5">Em Dashes (—)</span>
              <span className="text-base font-bold font-mono text-neutral-900 dark:text-neutral-100">
                {result.stats.emDashesRemoved}
              </span>
            </div>

            <div className="p-2.5 rounded-lg bg-neutral-50 dark:bg-neutral-800/60">
              <span className="text-[10px] uppercase font-bold text-neutral-400 block mb-0.5">En Dashes (–)</span>
              <span className="text-base font-bold font-mono text-neutral-900 dark:text-neutral-100">
                {result.stats.enDashesRemoved}
              </span>
            </div>

            <div className="p-2.5 rounded-lg bg-neutral-50 dark:bg-neutral-800/60">
              <span className="text-[10px] uppercase font-bold text-neutral-400 block mb-0.5">Double Hyphens (--)</span>
              <span className="text-base font-bold font-mono text-neutral-900 dark:text-neutral-100">
                {result.stats.doubleHyphensRemoved}
              </span>
            </div>

            <div className="p-2.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60">
              <span className="text-[10px] uppercase font-bold text-emerald-700 dark:text-emerald-400 block mb-0.5">Total Removed</span>
              <span className="text-base font-bold font-mono text-emerald-800 dark:text-emerald-300">
                {result.stats.totalDashesRemoved}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Explanatory Article & FAQ for SEO and User Guidance */}
      <section className="mt-12 border-t border-neutral-200 dark:border-neutral-800 pt-10">
        <div className="max-w-2xl mx-auto text-center mb-8">
          <h2 className="text-xl sm:text-2xl font-bold text-neutral-900 dark:text-neutral-100 tracking-tight">
            Why Remove AI Em Dashes & Hyphens?
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-neutral-600 dark:text-neutral-400">
            Learn why AI models overuse dashes and how humanizing punctuation improves clarity and bypasses AI detection flags.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-2xs">
            <h3 className="font-bold text-sm text-neutral-900 dark:text-neutral-100 mb-1">
              Bypasses AI Writing Markers
            </h3>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
              ChatGPT and Claude models rely excessively on parenthetical em dashes (—) for rhythmic balance. AI content detectors frequently use dash frequency as a key signal for synthetic writing.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-2xs">
            <h3 className="font-bold text-sm text-neutral-900 dark:text-neutral-100 mb-1">
              Natural Sentence Flow
            </h3>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
              Instead of clumsy pauses that interrupt readability, the smart engine converts clauses to standard commas, colons, or clean transitions aligned with professional editorial standards.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-2xs">
            <h3 className="font-bold text-sm text-neutral-900 dark:text-neutral-100 mb-1">
              100% Private & In-Memory
            </h3>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
              Your text is never sent to any server, database, or third-party API. All transformations execute entirely on your device in your web browser.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
