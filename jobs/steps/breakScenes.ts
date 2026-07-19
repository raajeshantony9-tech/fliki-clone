// Step: breakScenes
import { storyboardRepository } from '@/db/repositories/storyboardRepository';
import { SceneService } from '@/services/ai/sceneService';

/**
 * Break the script into scenes.
 * @param storyboardId - ID of the storyboard to process.
 */
export async function breakScenes(storyboardId: string): Promise<void> {
  const storyboard = await storyboardRepository.findById(storyboardId);
  if (!storyboard) throw new Error('Storyboard not found');
  const script = await storyboardRepository.getScript(storyboardId);
  if (!script) throw new Error('Script not generated yet');
  const rawScenes = await SceneService.breakdown(script.rawText);
  const scenes = rawScenes.map((scene, index) => ({
    id: crypto.randomUUID(),
    storyboardId,
    order: index,
    description: scene.description,
    durationEstimate: scene.durationEstimate ?? 5,
    dialogue: scene.dialogue,
  }));
  await storyboardRepository.saveScenes(storyboardId, scenes);
}