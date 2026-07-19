export default function VoicePreview({ scene, onVoiceChange, onRegenerate }: { scene: any; onVoiceChange: (dialogue: string) => void; onRevoke: () => void }) {
  return (
    <div className="mb-6 w-full max-w-2xl bg-gray-800 rounded-2xl p-6">
      <h2 className="mb-4 text-2xl font-semibold text-white">Scene Voiceover</h2>
      <div className="space-y-6">
        {scene.voiceUrl ? (
          <div className="space-y-3">
            <audio controls className="w-full">
              <source src={scene.voiceUrl} type="audio/mp3" />
              Your browser does not support the audio element.
            </audio>
          </div>
        ) : (
          <div className="h-32 flex items-center justify-center bg-gray-700 rounded-lg text-white text-lg">
            No voiceover generated yet
          </div>
        )}
        <div>
          <label className="block mb-2 text-sm font-medium text-white">Voiceover Text (dialogue)</label>
          <textarea
            value={scene.dialogue ?? ''}
            onChange={(e) => onVoiceChange(e.target.value)}
            className="w-full h-32 p-4 rounded-md bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex justify-end">
          <button
            onClick={onRegenerate}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transform transition-transform hover:scale-105"
          >
            Regenerate Voice
          </button>
        </div>
      </div>
    </div>
  );
}