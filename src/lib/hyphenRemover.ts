export type DashReplacementMode = 'smart' | 'comma' | 'space' | 'colon' | 'strip';

export interface HyphenCleanOptions {
  mode: DashReplacementMode;
  removeCompoundHyphens: boolean;
  cleanExtraSpaces: boolean;
}

export interface DashStats {
  emDashesRemoved: number;
  enDashesRemoved: number;
  doubleHyphensRemoved: number;
  standardHyphensRemoved: number;
  totalDashesRemoved: number;
  originalWordCount: number;
  cleanedWordCount: number;
  originalCharCount: number;
  cleanedCharCount: number;
}

export interface HyphenRemovalResult {
  originalText: string;
  cleanedText: string;
  stats: DashStats;
}

export function countWords(text: string): number {
  const trimmed = text.trim();
  if (!trimmed) return 0;
  return trimmed.split(/\s+/).filter(Boolean).length;
}

export function countChars(text: string): number {
  return text.length;
}

/**
 * Clean and remove em-dashes (—), en-dashes (–), and optional hyphens
 * while maintaining natural readability and proper punctuation.
 */
export function removeHyphensAndDashes(
  text: string,
  options: HyphenCleanOptions = {
    mode: 'smart',
    removeCompoundHyphens: false,
    cleanExtraSpaces: true,
  }
): HyphenRemovalResult {
  if (!text) {
    return {
      originalText: '',
      cleanedText: '',
      stats: {
        emDashesRemoved: 0,
        enDashesRemoved: 0,
        doubleHyphensRemoved: 0,
        standardHyphensRemoved: 0,
        totalDashesRemoved: 0,
        originalWordCount: 0,
        cleanedWordCount: 0,
        originalCharCount: 0,
        cleanedCharCount: 0,
      },
    };
  }

  // Count occurrences before cleaning
  const emDashes = (text.match(/[\u2014\u2015]/g) || []).length; // — or ―
  const enDashes = (text.match(/[\u2013\u2012]/g) || []).length; // – or ‒
  const doubleHyphens = (text.match(/--/g) || []).length;
  let standardHyphensRemoved = 0;

  let cleaned = text;

  // 1. Normalize unicode dash variants
  // Replace double dashes first to avoid confusing with single
  cleaned = cleaned.replace(/--/g, '—');

  if (options.mode === 'smart') {
    // A. Detect parenthetical paired em-dashes: "word—clause—word" or "word — clause — word"
    // In natural English, replace with commas or parentheses
    cleaned = cleaned.replace(
      /([a-zA-Z0-9'"])\s*[—–]\s*([^—–\n.!?]+?)\s*[—–]\s*([a-zA-Z0-9'"])/g,
      (match, p1, p2, p3) => {
        // If the clause starts with lowercase conjunction or dependent phrase
        const trimmedClause = p2.trim();
        return `${p1}, ${trimmedClause}, ${p3}`;
      }
    );

    // B. Handle em-dash before list / elaboration / transition phrases:
    // e.g., "features — namely, speed", "results — specifically", "innovative — yet simple"
    cleaned = cleaned.replace(
      /\s*[—–]\s*(namely|specifically|for example|for instance|such as|including|in particular|especially)\b/gi,
      ', $1'
    );

    cleaned = cleaned.replace(
      /\s*[—–]\s*(yet|but|although|though|while|whereas|however)\b/gi,
      ', $1'
    );

    // C. Em-dash before an explanation or conclusion at the end of a sentence
    cleaned = cleaned.replace(
      /([a-zA-Z0-9'"])\s*[—–]\s*([a-z])/g,
      '$1, $2'
    );

    // D. Em-dash before capitalized sentence or clause
    cleaned = cleaned.replace(
      /([a-zA-Z0-9'"])\s*[—–]\s*([A-Z])/g,
      '$1. $2'
    );

    // E. Remaining single em/en dashes
    cleaned = cleaned.replace(/\s*[—–]\s*/g, ', ');
  } else if (options.mode === 'comma') {
    // Direct replacement with comma
    cleaned = cleaned.replace(/\s*[—–]\s*/g, ', ');
  } else if (options.mode === 'space') {
    // Direct replacement with single space
    cleaned = cleaned.replace(/\s*[—–]\s*/g, ' ');
  } else if (options.mode === 'colon') {
    // Replacement with colon
    cleaned = cleaned.replace(/\s*[—–]\s*/g, ': ');
  } else if (options.mode === 'strip') {
    // Completely remove without adding punctuation
    cleaned = cleaned.replace(/[—–]/g, '');
  }

  // 2. Compound hyphens option (e.g. user-friendly -> user friendly)
  if (options.removeCompoundHyphens) {
    const hyphensMatch = cleaned.match(/([a-zA-Z0-9])-(?=[a-zA-Z0-9])/g);
    if (hyphensMatch) {
      standardHyphensRemoved = hyphensMatch.length;
      cleaned = cleaned.replace(/([a-zA-Z0-9])-(?=[a-zA-Z0-9])/g, '$1 ');
    }
  }

  // 3. Clean up punctuation artifacts and whitespace
  if (options.cleanExtraSpaces) {
    // Fix multiple commas or comma before period: ", ," or ",." or " ,"
    cleaned = cleaned
      .replace(/\s*,\s*,+/g, ', ')
      .replace(/\s*,\s*\./g, '.')
      .replace(/\s*,\s*;/g, ';')
      .replace(/\s*,\s*:/g, ':')
      .replace(/,\s*\?/g, '?')
      .replace(/,\s*!/g, '!')
      .replace(/\s+([.,;:?!])/g, '$1') // Space before punctuation
      .replace(/([.,;:?!])([a-zA-Z])/g, '$1 $2') // Missing space after punctuation
      .replace(/[ \t]+/g, ' ') // Collapse multiple spaces
      .replace(/ \n/g, '\n')
      .replace(/\n /g, '\n');
  }

  const totalDashesRemoved = emDashes + enDashes + doubleHyphens + standardHyphensRemoved;

  return {
    originalText: text,
    cleanedText: cleaned,
    stats: {
      emDashesRemoved: emDashes,
      enDashesRemoved: enDashes,
      doubleHyphensRemoved: doubleHyphens,
      standardHyphensRemoved,
      totalDashesRemoved,
      originalWordCount: countWords(text),
      cleanedWordCount: countWords(cleaned),
      originalCharCount: countChars(text),
      cleanedCharCount: countChars(cleaned),
    },
  };
}

export const SAMPLE_TEXTS = [
  {
    id: 'ai-chatgpt',
    title: 'ChatGPT Article Style',
    text: `Artificial intelligence—an ever-evolving frontier—has transformed modern engineering in unprecedented ways. The rapid rise of neural architectures—specifically large language models—allows computers to comprehend human intent with striking nuance—opening new horizons for creative problem-solving. While challenges remain—such as alignment, hallucinations, and data provenance—the trajectory points toward a deeply collaborative future.`,
  },
  {
    id: 'ai-marketing',
    title: 'Product Pitch Style',
    text: `Our next-generation workspace offers a seamless workflow — fast, reliable, and secure. Everything you need — from instant automated summaries to real-time analytics — is unified in one hub — so your team can focus entirely on high-impact initiatives.`,
  },
  {
    id: 'ai-academic',
    title: 'Research & Analysis Style',
    text: `The empirical results—recorded over a six-month longitudinal evaluation—demonstrate measurable improvements in latency—exceeding initial projections by nearly 38%. Furthermore, the system architecture—built upon modular pipelines—ensures consistent throughput under peak workloads.`,
  },
];
