export interface MetadataTag {
  category: 'prompt' | 'generator' | 'provenance' | 'camera_exif' | 'chunk' | 'other';
  label: string;
  value: string;
  criticalAI: boolean;
}

export interface AnalysisResult {
  hasAIMetadata: boolean;
  generatorName?: string;
  promptText?: string;
  negativePrompt?: string;
  modelInfo?: string;
  hasC2PA: boolean;
  hasIPTCAlgorithmic: boolean;
  tagsFound: MetadataTag[];
  rawChunks: string[];
  originalSize: number;
}

export type CleanFormat = 'auto' | 'png' | 'jpeg' | 'webp';
export type CleanEngine = 'canvas' | 'binary';

export interface ProcessedImage {
  id: string;
  file: File;
  name: string;
  originalSize: number;
  originalUrl: string;
  originalWidth: number;
  originalHeight: number;
  originalFormat: string;
  analysis: AnalysisResult;
  cleanedBlob?: Blob;
  cleanedUrl?: string;
  cleanedSize?: number;
  cleanedFormat: string;
  cleanedWidth?: number;
  cleanedHeight?: number;
  postAnalysis?: AnalysisResult;
  status: 'analyzing' | 'cleaning' | 'ready' | 'error';
  errorMessage?: string;
  processingTimeMs?: number;
}

export interface SanitizationConfig {
  format: CleanFormat;
  engine: CleanEngine;
  jpegQuality: number; // 0.8 - 1.0
  prefixCleanName: boolean;
}
