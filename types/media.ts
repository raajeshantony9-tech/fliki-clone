// types/media.ts
/** Simple union for media asset types used in the storyboard pipeline. */
export type MediaAsset =
  | { type: 'image'; url: string }
  | { type: 'audio'; url: string }
  | { type: 'video'; url: string }
  | { type: 'subtitle'; url: string; language: string };

/**
 * Options for controlling quality/cost of AI services.
 */
export interface AIServiceOptions {
  /** Model identifier (e.g., 'gpt-4-turbo', 'stabilityai/stable-diffusion-xl') */
  model?: string;
  /** Temperature for LLM sampling */
  temperature?: number;
  /** Number of images to generate per prompt (if applicable) */
  n?: number;
}