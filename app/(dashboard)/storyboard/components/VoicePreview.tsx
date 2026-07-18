export default function VoicePreview({ scene, onVoiceChange, onRegenerate }: { scene: any; onVoiceChange: (url: string | null) => void; onRegenerate: () => void }) {
  return (
    <div className="p-4 bg-gray-50 rounded border">
      <h3 className="font-semibold mb-2">Scene Voiceover</h3>
      {scene.voiceUrl ? (
        <>
          <audio controls src={scene.voiceUrl} className="mb-2" />
        </>
      ) : (
        <p className="text-gray-500">No voiceover generated yet.</p>
      )}
      <div className="mt-4">
        <label className="block mb-1">Voiceover Text (optional)</label>
        <textarea
          value={scene.dialogue ?? ''}
          onChange={(e) => onVoiceChange(e.target.value)} // placeholder: actually update dialogue
          className="w-full h-32 rounded border p-2"
        />
      </div>
      <div className="mt-4">
        <button onClick={onRegenerate} className="btn btn-primary">Regenerate Voice</button>
      </div>
    </div>
  );
}