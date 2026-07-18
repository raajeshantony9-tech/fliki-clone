export default function ImagePreview({ scene, onPromptChange, onRegenerate }: { scene: any; onPromptChange: (prompt: string) => void; onRegenerate: () => void }) {
  return (
    <div className="p-4 bg-gray-50 rounded border">
      <h3 className="font-semibold mb-2">Scene Image</h3>
      {scene.imageUrl ? (
        <img src={scene.imageUrl} alt="Generated" className="max-w-full rounded mb-2" />
      ) : (
        <p className="text-gray-500">No image generated yet.</p>
      )}
      <div className="mt-4">
        <label className="block mb-1">Image Prompt</label>
        <textarea
          value={scene.imagePrompt ?? ''}
          onChange={(e) => onPromptChange(e.target.value)}
          className="w-full h-32 rounded border p-2"
        />
      </div>
      <div className="mt-4">
        <button onClick={onRegenerate} className="btn btn-primary">Regenerate Image</button>
      </div>
    </div>
  );
}