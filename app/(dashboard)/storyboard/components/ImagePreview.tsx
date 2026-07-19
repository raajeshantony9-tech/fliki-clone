export default function ImagePreview({ scene, onPromptChange, onRegenerate }: { scene: any; onPromptChange: (prompt: string) => void; onRegenerate: () => void }) {
  return (
    <div className="mb-6 w-full max-w-2xl bg-gray-800 rounded-2xl p-6">
      <h2 className="mb-4 text-2xl font-semibold text-white">Scene Image</h2>
      <div className="space-y-6">
        {scene.imageUrl ? (
          <img src={scene.imageUrl} alt="Generated" className="w-full h-96 object-contain rounded-lg" />
        ) : (
          <div className="w-full h-96 flex items-center justify-center bg-gray-700 rounded-lg text-white text-lg">
            No image generated yet
          </div>
        )}
        <div>
          <label className="block mb-2 text-sm font-medium text-white">Image Prompt</label>
          <textarea
            value={scene.imagePrompt ?? ''}
            onChange={(e) => onPromptChange(e.target.value)}
            className="w-full h-32 p-4 rounded-md bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex justify-end">
          <button
            onClick={onRegenerate}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-transform transform hover:scale-105"
          >
            Regenerate Image
          </button>
        </div>
      </div>
    </div>
  );
}