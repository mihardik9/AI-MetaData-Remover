import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ShieldCheck, Lock, CheckCircle2, FileCode, ArrowRight, Layers } from 'lucide-react';
import { RouteSeoConfig } from '../lib/seoConfig';
import { Link } from '../lib/router';

interface SeoKnowledgeSectionProps {
  routeConfig: RouteSeoConfig;
}

export const SeoKnowledgeSection: React.FC<SeoKnowledgeSectionProps> = ({ routeConfig }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section aria-labelledby="knowledge-heading" className="mt-14 sm:mt-18 border-t border-neutral-200 dark:border-neutral-800 pt-10 sm:pt-12">
      {/* 3 Pillars Grid - Preserved Exactly in UI */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12">
        <div className="p-5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-2xs">
          <div className="w-10 h-10 rounded-xl bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-neutral-900 dark:text-neutral-100 mb-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
          </div>
          <h3 className="font-bold text-neutral-900 dark:text-neutral-100 text-sm mb-1.5">
            100% Quality Retention
          </h3>
          <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
            Maintains bit-level visual fidelity. PNG images stay completely lossless, and JPEGs preserve full detail without introducing compression artifacts.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-2xs">
          <div className="w-10 h-10 rounded-xl bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-neutral-900 dark:text-neutral-100 mb-3">
            <ShieldCheck className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          </div>
          <h3 className="font-bold text-neutral-900 dark:text-neutral-100 text-sm mb-1.5">
            C2PA & Provenance Purged
          </h3>
          <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
            Strips Content Authenticity Initiative (CAI) manifests, JUMBF markers, and IPTC algorithmic media flags used by automated scanners.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-2xs">
          <div className="w-10 h-10 rounded-xl bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-neutral-900 dark:text-neutral-100 mb-3">
            <Lock className="w-5 h-5 text-amber-600 dark:text-amber-400" />
          </div>
          <h3 className="font-bold text-neutral-900 dark:text-neutral-100 text-sm mb-1.5">
            Zero Server Uploads
          </h3>
          <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
            All processing executes directly on your client device in memory. Your prompts, workflows, and images are never stored or logged.
          </p>
        </div>
      </div>

      {/* Editorial Content Sections for Search Engines & Visitors */}
      <article className="max-w-3xl mx-auto mb-14 space-y-8">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <h2 id="knowledge-heading" className="text-2xl sm:text-3xl font-extrabold text-neutral-900 dark:text-neutral-50 tracking-tight">
            How AI Metadata & Tag Removal Works
          </h2>
          <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
            A privacy-first tool designed to protect your creative workflows and remove provenance tracking while preserving 100% visual fidelity.
          </p>
        </div>

        {routeConfig.contentSections.map((section, idx) => (
          <div
            key={idx}
            className="p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-2xs space-y-3"
          >
            <h3 className="text-base sm:text-lg font-bold text-neutral-900 dark:text-neutral-100 tracking-tight">
              {section.heading}
            </h3>
            {section.body.map((paragraph, pIdx) => (
              <p key={pIdx} className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
        ))}
      </article>

      {/* Structured FAQ Section */}
      <section aria-labelledby="faq-heading" className="max-w-3xl mx-auto mb-14">
        <div className="text-center mb-6">
          <h2 id="faq-heading" className="text-xl sm:text-2xl font-bold text-neutral-900 dark:text-neutral-100 tracking-tight flex items-center justify-center gap-2">
            <HelpCircle className="w-5 h-5 text-neutral-500" />
            Frequently Asked Questions
          </h2>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
            Common questions about AI metadata removal, C2PA Content Credentials, and privacy.
          </p>
        </div>

        <div className="space-y-3">
          {routeConfig.faqList.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-800 overflow-hidden shadow-2xs transition-colors"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 font-semibold text-neutral-900 dark:text-neutral-100 text-sm hover:text-neutral-700 dark:hover:text-neutral-300 transition-colors"
                  aria-expanded={isOpen}
                >
                  <span>{faq.question}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-neutral-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-neutral-900 dark:text-neutral-100' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-4 pb-4 sm:px-5 sm:pb-5 text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed border-t border-neutral-100 dark:border-neutral-800/80 pt-3">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Internal Linking: Related Tools & Supporting Pages */}
      <nav aria-label="Related tools navigation" className="max-w-4xl mx-auto pt-6 border-t border-neutral-200 dark:border-neutral-800">
        <h3 className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-4 text-center">
          Related AI Privacy Tools & Guides
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          <Link
            to="/ai-tag-remover"
            className="p-3.5 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 hover:border-neutral-400 dark:hover:border-neutral-600 transition-all group flex items-start gap-3"
          >
            <div className="w-8 h-8 rounded-lg bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center shrink-0 group-hover:bg-neutral-900 group-hover:text-white dark:group-hover:bg-neutral-100 dark:group-hover:text-neutral-900 transition-colors">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-bold text-neutral-900 dark:text-neutral-100 block group-hover:underline">
                AI Tag Remover
              </span>
              <span className="text-[11px] text-neutral-500 dark:text-neutral-400 block mt-0.5">
                Strip AI identification tags and prompts
              </span>
            </div>
          </Link>

          <Link
            to="/ai-metadata-remover"
            className="p-3.5 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 hover:border-neutral-400 dark:hover:border-neutral-600 transition-all group flex items-start gap-3"
          >
            <div className="w-8 h-8 rounded-lg bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center shrink-0 group-hover:bg-neutral-900 group-hover:text-white dark:group-hover:bg-neutral-100 dark:group-hover:text-neutral-900 transition-colors">
              <FileCode className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-bold text-neutral-900 dark:text-neutral-100 block group-hover:underline">
                AI Metadata Remover
              </span>
              <span className="text-[11px] text-neutral-500 dark:text-neutral-400 block mt-0.5">
                Remove SD parameters & ComfyUI workflows
              </span>
            </div>
          </Link>

          <Link
            to="/ai-hyphen-remover"
            className="p-3.5 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 hover:border-neutral-400 dark:hover:border-neutral-600 transition-all group flex items-start gap-3"
          >
            <div className="w-8 h-8 rounded-lg bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center shrink-0 group-hover:bg-neutral-900 group-hover:text-white dark:group-hover:bg-neutral-100 dark:group-hover:text-neutral-900 transition-colors">
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-bold text-neutral-900 dark:text-neutral-100 block group-hover:underline">
                AI Hyphen Remover
              </span>
              <span className="text-[11px] text-neutral-500 dark:text-neutral-400 block mt-0.5">
                Clean em dashes & en dashes in text
              </span>
            </div>
          </Link>

          <Link
            to="/remove-ai-metadata"
            className="p-3.5 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 hover:border-neutral-400 dark:hover:border-neutral-600 transition-all group flex items-start gap-3"
          >
            <div className="w-8 h-8 rounded-lg bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center shrink-0 group-hover:bg-neutral-900 group-hover:text-white dark:group-hover:bg-neutral-100 dark:group-hover:text-neutral-900 transition-colors">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-bold text-neutral-900 dark:text-neutral-100 block group-hover:underline">
                Remove AI Metadata
              </span>
              <span className="text-[11px] text-neutral-500 dark:text-neutral-400 block mt-0.5">
                Universal guide to stripping AI metadata
              </span>
            </div>
          </Link>

          <Link
            to="/remove-ai-metadata-from-images"
            className="p-3.5 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 hover:border-neutral-400 dark:hover:border-neutral-600 transition-all group flex items-start gap-3"
          >
            <div className="w-8 h-8 rounded-lg bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center shrink-0 group-hover:bg-neutral-900 group-hover:text-white dark:group-hover:bg-neutral-100 dark:group-hover:text-neutral-900 transition-colors">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-bold text-neutral-900 dark:text-neutral-100 block group-hover:underline">
                Remove AI Metadata from Images
              </span>
              <span className="text-[11px] text-neutral-500 dark:text-neutral-400 block mt-0.5">
                Lossless cleaner for PNG, JPG, WebP & AVIF
              </span>
            </div>
          </Link>
        </div>
      </nav>
    </section>
  );
};
