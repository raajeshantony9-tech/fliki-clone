// services/ai/imagePromptService.ts
export class ImagePromptService {
  /**
   * Build a detailed image generation prompt from a scene description.
   * @param scene - Scene object containing description and optional metadata.
   * @param style - Optional style modifier (e.g., 'cinematic', 'anime', 'photorealistic').
   * @returns A prompt string suitable for Stable Diffusion, DALL·E, etc.
   */
  static build(scene: { description: string; dialogue?: string; durationEstimate?: number }, style?: string): string {
    // TODO: Could call an LLM to enrich the prompt.
    let prompt = `A detailed illustration of: ${scene.description}`;
    if (scene.dialogue) {
      prompt += `, featuring the text "${scene.dialogue}"`;
    }
    if (style) {
      prompt += `, ${style} style`;
    }
    // Add common quality modifiers
    prompt += ', high detail, 8k resolution, dramatic lighting';
    return prompt;
  }
}