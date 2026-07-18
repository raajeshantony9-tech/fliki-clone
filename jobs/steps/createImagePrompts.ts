// Step: createImagePrompts
import { storyboardRepository } from '@/db/repositories/storyboardRepository';
import { ImagePromptService } from '@/services/ai/imagePromptService';

/**
 * Create image generation prompts for each scene.
 * @param storyboardId - ID of the storyboard to process.
 */
export async function createImagePrompts(storyboardId: string): Promise<void> {
  const scenes = await storyboardRepository.getScenes(storyboardId);
  const updated = scenes.map(scene => ({
    ...scene,
    imagePrompt: ImagePromptService.build(scene),
  }));
  await storyboardRepository.updateScenePrompts(storyboardId, updated);
}