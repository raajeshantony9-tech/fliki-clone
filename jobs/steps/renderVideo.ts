// Step: renderVideo
import { storyboardRepository } from '@/db/repositories/storyboardRepository';
import { renderService } from '@/services/video/renderService';

/**
 * Render the final video from the timeline.
 * @param storyboardId - ID of the storyboard to process.
 */
export async function renderVideo(storyboardId: string): Promise<void> {
  const timeline = await storyboardRepository.getTimeline(storyboardId);
  if (!timeline) throw new Error('Timeline not ready');
  // Dispatch to rendering service (could be ffmpeg.wasm or cloud render)
  const renderJobId = await renderService.assemble(timeline);
  // Store render job id for polling
  await storyboardRepository.setRenderJobId(storyboardId, renderJobId);
  // In a real worker we would now poll the render service; for simplicity
  // we assume the render service calls back via webhook when done.
}