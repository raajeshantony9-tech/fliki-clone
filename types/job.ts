// types/job.ts
export interface StoryboardJob {
  id: string;
  storyboardId: string;
  status: 'queued' | 'processing' | 'completed' | 'failed' | 'cancelled';
  currentStep:
    | 'generateScript'
    | 'breakScenes'
    | 'createImagePrompts'
    | 'generateImages'
    | 'generateVoice'
    | 'generateSubtitles'
    | 'buildTimeline'
    | 'applyEffects'
    | 'renderVideo';
  progress: number; // 0-100
  error?: string;
  startedAt?: Date;
  finishedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
  // TODO: add retryCount, priority, estimatedTimeRemaining
}