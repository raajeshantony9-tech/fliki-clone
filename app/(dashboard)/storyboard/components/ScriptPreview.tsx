import { Script } from '@/types/storyboard';

export default function ScriptPreview({ script }: { script: Script }) {
  return (
    <div className="mb-6 w-full max-w-2xl bg-gray-800 rounded-2xl p-6">
      <h2 className="mb-4 text-2xl font-semibold text-white">Generated Script</h2>
      <p className="whitespace-pre-wrap text-gray-200 text-lg">{script.rawText}</p>
    </div>
  );
}