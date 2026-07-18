// Step: generateImages
import { storyboardRepository } from '@/db/repositories/storyboardRepository';
import { ImageService } from '@/services/media/imageService';

/**
 * Generate images for each scene using the prepared prompts.
 * @param storyboardId - ID of the storyboard to process.
 */
export async function generateImages(storyboardId: string): Promise<void> {
  const scenes = await storyboardRepository.getScenes(storyboardId);
  const updated = await Promise.all(
    scenes.map(async (scene) => {
      let imageUrl = '';
      if (scene.imagePrompt) {
        imageUrl = await ImageService.generate(scene.imagePrompt);
      }
      return { ...scene, imageUrl };
    })
  );
  await storyboardRepository.updateSceneImages(storyboardId, updated);
}