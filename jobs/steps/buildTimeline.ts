// Step: buildTimeline
import { storyboardRepository } from '@/db/repositories/storyboardRepository';
import { timelineService } from '@/services/video/timelineService';

/**
 * Build a timeline from scenes, images, voice, subtitles.
 * @param storyboardId - ID of the storyboard to process.
 */
export async function buildTimeline(storyboardId: string): Promise<void> {
  const storyboard = await storyboardRepository.findById(storyboardId);
  if (!storyboard) throw new Error('Storyboard not found');
  const scenes = await storyboardRepository.getScenes(storyboardId);
  // Simple sequential timeline: each scene gets its own track.
  const tracks = [];
  let currentTime = 0;
  scenes.forEach((scene, idx) => {
    const duration = scene.durationEstimate ?? 5;
    if (scene.imageUrl) {
      tracks.push({
        id: crypto.randomUUID(),
        type: 'image',
        src: scene.imageUrl,
        start: currentTime,
        end: currentTime + duration,
      });
    }
    if (scene.voiceUrl) {
      tracks.push({
        id: crypto.randomUUID(),
        type: 'audio',
        src: scene.voiceUrl,
        start: currentTime,
        end: currentTime + duration,
      });
    }
    if (scene.subtitles && scene.subtitles.length) {
      scene.subtitles.forEach((sub: any, subIdx) => {
        tracks.push({
          id: crypto.randomUUID(),
          type: 'subtitle',
          src: sub.url,
          start: currentTime,
          end: currentTime + duration,
        });
      });
    }
    currentTime += duration;
  });
  const timeline = {
    id: crypto.randomUUID(),
    storyboardId,
    tracks,
    transitions: [], // could add fades between scenes
    totalDuration: currentTime,
  };
  await storyboardRepository.saveTimeline(storyboardId, timeline);
}