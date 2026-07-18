// Step: generateScript
import { storyboardRepository } from '@/db/repositories/storyboardRepository';
import { ScriptService } from '@/services/ai/scriptService';

/**
 * Generate a script from the storyboard's prompt.
 * @param storyboardId - ID of the storyboard to process.
 */
export async function generateScript(storyboardId: string): Promise<void> {
  const storyboard = await storyboardRepository.findById(storyboardId);
  if (!storyboard) throw new Error('Storyboard not found');
  const scriptText = await ScriptService.generate(storyboard.prompt);
  const script = {
    id: crypto.randomUUID(),
    rawText: scriptText,
    language: 'en',
    createdAt: new Date(),
  };
  await storyboardRepository.saveScript(storyboardId, script);
}