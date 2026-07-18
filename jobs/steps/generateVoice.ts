// Step: generateVoice
import { storyboardRepository } from '@/db/repositories/storyboardRepository';
import { VoiceService } from '@/services/media/voiceService';

/**
 * Generate voiceover audio for each scene (if dialogue present).
 * @param storyboardId - ID of the storyboard to process.
 */
export async function generateVoice(storyboardId: string): Promise<void> {
  const scenes = await storyboardRepository.getScenes(storyboardId);
  const updated = await Promise.all(
    scenes.map(async (scene) => {
      let voiceUrl = null;
      if (scene.dialogue) {
        voiceUrl = await VoiceService.synthesize(scene.dialogue);
      }
      return { ...scene, voiceUrl };
    })
  );
  await storyboardRepository.updateSceneVoices(storyboardId, updated);
}