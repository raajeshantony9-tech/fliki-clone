// Step: generateSubtitles
import { storyboardRepository } from '@/db/repositories/storyboardRepository';
import { SubtitleService } from '@/services/media/subtitleService';

/**
 * Generate subtitle files for each scene.
 * @param storyboardId - ID of the storyboard to process.
 */
export async function generateSubtitles(storyboardId: string): Promise<void> {
  const scenes = await storyboardRepository.getScenes(storyboardId);
  const updated = await Promise.all(
    scenes.map(async (scene) => {
      let subtitles = [];
      if (scene.dialogue) {
        const subtitleUrl = await SubtitleService.generate(scene.dialogue, scene.durationEstimate ?? 5);
        subtitles = [{ lang: 'en', url: subtitleUrl }];
      }
      return { ...scene, subtitles };
    })
  );
  await storyboardRepository.updateSceneSubtitles(storyboardId, updated);
}