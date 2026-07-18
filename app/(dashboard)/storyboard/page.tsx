import { useState } from 'react';
import PromptInput from './components/PromptInput';
import ScriptPreview from './components/ScriptPreview';
import SceneList from './components/SceneList';
import TimelineEditor from './components/TimelineEditor';
import ExportButton from './components/ExportButton';
import ProgressTracker from './components/ProgressTracker';
import { useStoryboard } from '@/hooks/useStoryboard'; // placeholder import

export default function StoryboardPage() {
  const [prompt, setPrompt] = useState('');
  const [storyboard, setStoryboard] = useState(null);
  const [jobStatus, setJobStatus] = useState('idle');
  const [currentStep, setCurrentStep] = useState('');
  const [progress, setProgress] = useState(0);

  // Placeholder hooks – actual implementation will use useStoryboard hook
  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setJobStatus('queued');
    // TODO: call API to create storyboard and start job
    // For now simulate
    setStoryboard({
      id: '1',
      prompt,
      script: { id: 's1', rawText: 'Sample script...' },
      scenes: [
        { id: 'sc1', order: 0, description: 'Opening scene', durationEstimate: 5, dialogue: 'Hello world' },
        { id: 'sc2', order: 1, description: 'Main action', durationEstimate: 7 },
      ],
    });
    setJobStatus('processing');
    setCurrentStep('generateScript');
    setProgress(10);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Create a Storyboard</h1>
      <PromptInput onSubmit={handleGenerate} />
      {storyboard && (
        <>
          <ScriptPreview script={storyboard.script} />
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <SceneList scenes={storyboard.scenes ?? []} onReplace={() => {}} />
            <TimelineEditor
              timeline={{ tracks: [], transitions: [] }}
              onTimelineChange={() => {}}
            />
          </div>
          <ProgressTracker
            jobStatus={jobStatus}
            currentStep={currentStep}
            progress={progress}
          </>
          <ExportButton
            storyboard={storyboard}
            onExportStart={() => Promise.resolve()}
            onExportComplete={(url) => alert('Download: ' + url)}
          />
        </>
      )}
    </div>
  );
}