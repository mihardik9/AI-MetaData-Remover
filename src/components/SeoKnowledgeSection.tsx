import React, { useState } from 'react';
import {
  HelpCircle,
  ChevronDown,
  ShieldCheck,
  Lock,
  CheckCircle2,
  FileCode,
  Camera,
  Layers,
  Sparkles,
  Scissors,
  SlidersHorizontal,
} from 'lucide-react';
import { RouteSeoConfig } from '../lib/seoConfig';
import { Link } from '../lib/router';

interface SeoKnowledgeSectionProps {
  routeConfig: RouteSeoConfig;
}

export const SeoKnowledgeSection: React.FC<SeoKnowledgeSectionProps> = ({ routeConfig }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  // If no content sections exist on this route (e.g. homepage), do not render
  if (!routeConfig.contentSections || routeConfig.contentSections.length === 0) {
    return null;
  }

  const toggleFaq = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case 'quality':
        return <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />;
      case 'shield':
        return <ShieldCheck className="w-5 h-5 text-blue-600 dark:text-blue-400" />;
      case 'lock':
        return <Lock className="w-5 h-5 text-amber-600 dark:text-amber-400" />;
      case 'camera':
        return <Camera className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />;
      case 'code':
        return <FileCode className="w-5 h-5 text-purple-600 dark:text-purple-400" />;
      case 'sparkles':
        return <Sparkles className="w-5 h-5 text-amber-500 dark:text-amber-400" />;
      case 'sliders':
      default:
        return <SlidersHorizontal className="w-5 h-5 text-neutral-700 dark:text-neutral-300" />;
    }
  };

  return (
    <section aria-labelledby="knowledge-heading" className="mt-14 sm:mt-18 border-t border-neutral-200 dark:border-neutral-800 pt-10 sm:pt-12">
      {/* Dynamic 3 Feature Pillars Grid */}
      {routeConfig.featurePillars && routeConfig.featurePillars.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12">
          {routeConfig.featurePillars.map((pillar, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-2xs"
            >
              <div className="w-10 h-10 rounded-xl bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center mb-3">
                {renderIcon(pillar.icon)}
              </div>
              <h3 className="font-bold text-neutral-900 dark:text-neutral-100 text-sm mb-1.5">
                {pillar.title}
              </h3>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Editorial Content Sections for Search Engines & Visitors */}
      <article className="max-w-3xl mx-auto mb-14 space-y-8">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <h2 id="knowledge-heading" className="text-2xl sm:text-3xl font-extrabold text-neutral-900 dark:text-neutral-50 tracking-tight">
            {routeConfig.sectionHeading}
          </h2>
          <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
            {routeConfig.sectionDescription}
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
      {routeConfig.faqList && routeConfig.faqList.length > 0 && (
        <section aria-labelledby="faq-heading" className="max-w-3xl mx-auto mb-14">
          <div className="text-center mb-6">
            <h2 id="faq-heading" className="text-xl sm:text-2xl font-bold text-neutral-900 dark:text-neutral-100 tracking-tight flex items-center justify-center gap-2">
              <HelpCircle className="w-5 h-5 text-neutral-500" />
              Frequently Asked Questions
            </h2>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
              Detailed answers about {routeConfig.h1.toLowerCase()} capabilities and usage.
            </p>
          </div>

          <div className="space-y-3">
            {routeConfig.faqList.map((faq, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div
                  key={idx}
                  className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 overflow-hidden transition-all shadow-2xs"
                >
                  <button
                    type="button"
                    id={`faq-btn-${idx}`}
                    onClick={() => toggleFaq(idx)}
                    className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 font-semibold text-xs sm:text-sm text-neutral-900 dark:text-neutral-100 hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors cursor-pointer"
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${idx}`}
                  >
                    <span className="flex-1">{faq.question}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-neutral-400 shrink-0 transition-transform duration-200 ${
                        isOpen ? 'transform rotate-180' : ''
                      }`}
                    />
                  </button>
                  <div
                    id={`faq-answer-${idx}`}
                    role="region"
                    aria-labelledby={`faq-btn-${idx}`}
                    className={`px-5 pb-4 text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed ${
                      isOpen ? 'block' : 'hidden'
                    }`}
                  >
                    {faq.answer}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Internal Linking: Related Tools & Supporting Pages */}
      <nav aria-label="Related tools navigation" className="max-w-4xl mx-auto pt-6 border-t border-neutral-200 dark:border-neutral-800">
        <h3 className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-4 text-center">
          Related Online Tools &amp; Guides
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <Link
            to="/ai-metadata-remover"
            className={`p-3.5 rounded-xl bg-white dark:bg-neutral-900 border transition-all group flex items-start gap-3 ${
              routeConfig.path === '/ai-metadata-remover'
                ? 'border-neutral-900 dark:border-neutral-100 ring-1 ring-neutral-900 dark:ring-neutral-100'
                : 'border-neutral-200 dark:border-neutral-800 hover:border-neutral-400 dark:hover:border-neutral-600'
            }`}
          >
            <div className="w-8 h-8 rounded-lg bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center shrink-0 group-hover:bg-neutral-900 group-hover:text-white dark:group-hover:bg-neutral-100 dark:group-hover:text-neutral-900 transition-colors">
              <FileCode className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-bold text-neutral-900 dark:text-neutral-100 block group-hover:underline">
                AI Metadata Remover
              </span>
              <span className="text-[11px] text-neutral-500 dark:text-neutral-400 block mt-0.5">
                Remove SD parameters &amp; ComfyUI workflows
              </span>
            </div>
          </Link>

          <Link
            to="/image-metadata-remover"
            className={`p-3.5 rounded-xl bg-white dark:bg-neutral-900 border transition-all group flex items-start gap-3 ${
              routeConfig.path === '/image-metadata-remover'
                ? 'border-neutral-900 dark:border-neutral-100 ring-1 ring-neutral-900 dark:ring-neutral-100'
                : 'border-neutral-200 dark:border-neutral-800 hover:border-neutral-400 dark:hover:border-neutral-600'
            }`}
          >
            <div className="w-8 h-8 rounded-lg bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center shrink-0 group-hover:bg-neutral-900 group-hover:text-white dark:group-hover:bg-neutral-100 dark:group-hover:text-neutral-900 transition-colors">
              <Camera className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-bold text-neutral-900 dark:text-neutral-100 block group-hover:underline">
                Image Metadata Remover
              </span>
              <span className="text-[11px] text-neutral-500 dark:text-neutral-400 block mt-0.5">
                Clean EXIF, GPS &amp; photo tags
              </span>
            </div>
          </Link>

          <Link
            to="/exif-remover"
            className={`p-3.5 rounded-xl bg-white dark:bg-neutral-900 border transition-all group flex items-start gap-3 ${
              routeConfig.path === '/exif-remover'
                ? 'border-neutral-900 dark:border-neutral-100 ring-1 ring-neutral-900 dark:ring-neutral-100'
                : 'border-neutral-200 dark:border-neutral-800 hover:border-neutral-400 dark:hover:border-neutral-600'
            }`}
          >
            <div className="w-8 h-8 rounded-lg bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center shrink-0 group-hover:bg-neutral-900 group-hover:text-white dark:group-hover:bg-neutral-100 dark:group-hover:text-neutral-900 transition-colors">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-bold text-neutral-900 dark:text-neutral-100 block group-hover:underline">
                EXIF Remover
              </span>
              <span className="text-[11px] text-neutral-500 dark:text-neutral-400 block mt-0.5">
                Strip camera settings &amp; timestamps
              </span>
            </div>
          </Link>

          <Link
            to="/remove-metadata-online"
            className={`p-3.5 rounded-xl bg-white dark:bg-neutral-900 border transition-all group flex items-start gap-3 ${
              routeConfig.path === '/remove-metadata-online'
                ? 'border-neutral-900 dark:border-neutral-100 ring-1 ring-neutral-900 dark:ring-neutral-100'
                : 'border-neutral-200 dark:border-neutral-800 hover:border-neutral-400 dark:hover:border-neutral-600'
            }`}
          >
            <div className="w-8 h-8 rounded-lg bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center shrink-0 group-hover:bg-neutral-900 group-hover:text-white dark:group-hover:bg-neutral-100 dark:group-hover:text-neutral-900 transition-colors">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-bold text-neutral-900 dark:text-neutral-100 block group-hover:underline">
                Remove Metadata Online
              </span>
              <span className="text-[11px] text-neutral-500 dark:text-neutral-400 block mt-0.5">
                Free browser-based metadata scrubber
              </span>
            </div>
          </Link>

          <Link
            to="/ai-tag-remover"
            className={`p-3.5 rounded-xl bg-white dark:bg-neutral-900 border transition-all group flex items-start gap-3 ${
              routeConfig.path === '/ai-tag-remover'
                ? 'border-neutral-900 dark:border-neutral-100 ring-1 ring-neutral-900 dark:ring-neutral-100'
                : 'border-neutral-200 dark:border-neutral-800 hover:border-neutral-400 dark:hover:border-neutral-600'
            }`}
          >
            <div className="w-8 h-8 rounded-lg bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center shrink-0 group-hover:bg-neutral-900 group-hover:text-white dark:group-hover:bg-neutral-100 dark:group-hover:text-neutral-900 transition-colors">
              <Sparkles className="w-4 h-4" />
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
            to="/remove-ai-metadata"
            className={`p-3.5 rounded-xl bg-white dark:bg-neutral-900 border transition-all group flex items-start gap-3 ${
              routeConfig.path === '/remove-ai-metadata'
                ? 'border-neutral-900 dark:border-neutral-100 ring-1 ring-neutral-900 dark:ring-neutral-100'
                : 'border-neutral-200 dark:border-neutral-800 hover:border-neutral-400 dark:hover:border-neutral-600'
            }`}
          >
            <div className="w-8 h-8 rounded-lg bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center shrink-0 group-hover:bg-neutral-900 group-hover:text-white dark:group-hover:bg-neutral-100 dark:group-hover:text-neutral-900 transition-colors">
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-bold text-neutral-900 dark:text-neutral-100 block group-hover:underline">
                Remove AI Metadata Guide
              </span>
              <span className="text-[11px] text-neutral-500 dark:text-neutral-400 block mt-0.5">
                Strategic guide to synthetic media metadata
              </span>
            </div>
          </Link>

          <Link
            to="/remove-ai-metadata-from-images"
            className={`p-3.5 rounded-xl bg-white dark:bg-neutral-900 border transition-all group flex items-start gap-3 ${
              routeConfig.path === '/remove-ai-metadata-from-images'
                ? 'border-neutral-900 dark:border-neutral-100 ring-1 ring-neutral-900 dark:ring-neutral-100'
                : 'border-neutral-200 dark:border-neutral-800 hover:border-neutral-400 dark:hover:border-neutral-600'
            }`}
          >
            <div className="w-8 h-8 rounded-lg bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center shrink-0 group-hover:bg-neutral-900 group-hover:text-white dark:group-hover:bg-neutral-100 dark:group-hover:text-neutral-900 transition-colors">
              <FileCode className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-bold text-neutral-900 dark:text-neutral-100 block group-hover:underline">
                AI Metadata from Images
              </span>
              <span className="text-[11px] text-neutral-500 dark:text-neutral-400 block mt-0.5">
                Format-level chunk surgery for PNG, JPG &amp; WebP
              </span>
            </div>
          </Link>

          <Link
            to="/ai-hyphen-remover"
            className={`p-3.5 rounded-xl bg-white dark:bg-neutral-900 border transition-all group flex items-start gap-3 ${
              routeConfig.path === '/ai-hyphen-remover'
                ? 'border-neutral-900 dark:border-neutral-100 ring-1 ring-neutral-900 dark:ring-neutral-100'
                : 'border-neutral-200 dark:border-neutral-800 hover:border-neutral-400 dark:hover:border-neutral-600'
            }`}
          >
            <div className="w-8 h-8 rounded-lg bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center shrink-0 group-hover:bg-neutral-900 group-hover:text-white dark:group-hover:bg-neutral-100 dark:group-hover:text-neutral-900 transition-colors">
              <Scissors className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-bold text-neutral-900 dark:text-neutral-100 block group-hover:underline">
                AI Hyphen Remover
              </span>
              <span className="text-[11px] text-neutral-500 dark:text-neutral-400 block mt-0.5">
                Clean em dashes &amp; en dashes in AI text
              </span>
            </div>
          </Link>
        </div>
      </nav>
    </section>
  );
};
