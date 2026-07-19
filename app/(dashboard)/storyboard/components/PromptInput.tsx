import { useState } from 'react';

export default function PromptInput({ onSubmit }: { onSubmit: (prompt: string) => void }) {
  const [prompt, setPrompt] = useState('');

  const handleSubmit = () => {
    if (prompt.trim()) {
      onSubmit(prompt);
    }
  };

  return (
    <div className="mb-6 w-full max-w-2xl bg-gray-800 rounded-2xl p-6">
      <h2 className="mb-4 text-2xl font-semibold text-white">Describe your video idea</h2>
      <div className="space-y-4">
        <label className="block mb-2 text-sm font-medium text-white">Prompt</label>
        <div className="relative">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe your video concept in detail..."
            className="w-full min-h-[120px] p-4 rounded-md bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          />
          <p className="absolute bottom-2 right-2 text-xs text-gray-400">
            {prompt.length} / 500
          </p>
        </div>
        <div className="flex justify-end">
          <button
            onClick={handleSubmit}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium transform transition-transform hover:scale-105"
          >
            Generate Storyboard
          </button>
        </div>
      </div>
    </div>
  );
}