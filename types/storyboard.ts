// types/storyboard.ts
export interface Script {
  id: string;
  rawText: string;
  language?: string;
  createdAt: Date;
  // TODO: add version, languageLocale, etc.
}

export interface Scene {
  id: string;
  storyboardId: string;
  order: number;
  description: string;
  durationEstimate: number; // seconds
  dialogue?: string;
  imagePrompt?: string;
  imageUrl?: string;
  voiceUrl?: string;
  subtitles?: Array<{ lang: string; url: string }>;
  // TODO: add background music, custom effects per scene
}

export interface TimelineTrack {
  id: string;
  type: 'image' | 'video' | 'audio' | 'subtitle';
  src: string; // URL to asset
  start: number; // seconds
  end: number;   // exclusive
  effects?: Effect[];
  // TODO: add metadata like muted, volume, etc.
}

export interface Effect {
  type: string; // e.g., 'fade', 'zoom', 'color', 'blur'
  params?: Record<string, any>;
  // TODO: define specific effect interfaces
}

export interface Transition {
  id: string;
  type: 'fade' | 'slide' | 'zoom' | string;
  duration: number; // seconds
  position: number; // time at which transition starts (or index)
  params?: Record<string, any>;
  // TODO: add easing, direction, etc.
}

export interface Timeline {
  id: string;
  storyboardId: string;
  tracks: TimelineTrack[];
  transitions: Transition[];
  backgroundMusic?: string; // URL to optional music track
  totalDuration: number; // seconds
  // TODO: add markers, captions, global effects
}

export interface Storyboard {
  id: string;
  userId: string;
  title?: string;
  prompt: string;
  script?: Script;
  scenes: Scene[];
  timeline?: Timeline;
  status: 'draft' | 'generating' | 'ready' | 'failed';
  outputVideoUrl?: string; // final video URL (signed or public)
  createdAt: Date;
  updatedAt: Date;
  // TODO: add tags, thumbnail, duration, viewCount
}