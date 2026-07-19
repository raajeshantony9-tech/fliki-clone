'use client';

import { useState } from 'react';
import PromptInput from './components/PromptInput';
import ScriptPreview from './components/ScriptPreview';
import SceneList from './components/SceneList';
import TimelineEditor from './components/TimelineEditor';
import ExportButton from './components/ExportButton';
import ProgressTracker from './components/ProgressTracker';
import type { Storyboard, Script } from '@/types/storyboard';

export default function StoryboardPage() {
  const [storyboard, setStoryboard] = useState<Storyboard | null>(null);
  const [jobStatus, setJobStatus] = useState<'idle' | 'queued' | 'processing' | 'completed' | 'failed'>('idle');
  const [currentStep, setCurrentStep] = useState<string>('');
  const [progress, setProgress] = useState<number>(0);

  // Placeholder hooks – actual implementation will use useStoryboard hook
  const handleGenerate = (prompt: string) => {
    if (!prompt.trim()) return;
    setJobStatus('queued');
    // TODO: call API to create storyboard and start job
    // For now simulate
    setStoryboard({
      id: '1',
      userId: 'user1', // dummy
      prompt,
      script: { id: 's1', rawText: 'Sample script...', createdAt: new Date() },
      scenes: [
        { id: 'sc1', storyboardId: '1', order: 0, description: 'Opening scene', durationEstimate: 5, dialogue: 'Hello world' },
        { id: 'sc2', storyboardId: '1', order: 1, description: 'Main action', durationEstimate: 7 },
      ],
      status: 'draft',
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    setJobStatus('processing');
    setCurrentStep('generateScript');
    setProgress(10);
  };

  return (
    <div className="min-h-screen bg-gray-900 p-6 md:p-8">
      <div className="mx-auto max-w-4xl bg-gray-800 rounded-xl p-6">
        <h1 className="mb-6 text-3xl font-bold text-center text-white">Create a Storyboard</h1>
        <PromptInput onSubmit={handleGenerate} />
        {storyboard && (
          <>
            <ScriptPreview script={storyboard.script ?? { id: 'temp', rawText: 'No script yet', createdAt: new Date() }} />
            <div className="grid gap-6 md:grid-cols-2">
              <SceneList scenes={storyboard.scenes} onReplace={() => {}} />
              <TimelineEditor
                timeline={{ tracks: [], transitions: [] }}
                onTimelineChange={() => {}}
              />
            </div>
            <ProgressTracker
              jobStatus={jobStatus}
              currentStep={currentStep}
              progress={progress}
            />
            <ExportButton
              storyboard={storyboard}
              onExportStart={() => Promise.resolve()}
              onExportComplete={(url) => alert('Download: ' + url)}
            />
          </>
        )}
      </div>
    </div>
  );
}