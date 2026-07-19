export default function SceneCard({ scene, onSelect, onEdit, onRemove, onRegenerateImage, onRegenerateVoice }) {
  return (
    <div className="group relative overflow-hidden bg-gray-800 rounded-xl p-4 hover:bg-gray-700 cursor-pointer">
      <div className="flex items-start">
        <div className="flex-shrink-0 h-24 w-24">
          {scene.imageUrl ? (
            <img
              src={scene.imageUrl}
              alt={`${scene.description} image`}
              className="h-full w-full object-cover rounded-lg"
            />
          ) : (
            <div className="h-full w-full flex items-center justify-center bg-gray-700 rounded-lg text-white text-xl">
              🖼️
            </div>
          )}
        </div>
        <div className="ml-4 flex-1 space-y-2">
          <div className="flex justify-between">
            <h3 className="text-lg font-semibold text-white">{scene.description}</h3>
            <span className="text-xs text-gray-400">{scene.durationEstimate}s</span>
          </div>
          {scene.dialogue && (
            <div className="space-y-1">
              <p className="text-sm font-medium text-gray-400">Dialogue:</p>
              <p className="text-sm text-gray-200 break-all">{scene.dialogue}</p>
            </div>
          )}
          <div className="flex mt-2 space-x-2 text-sm">
            <button
              onClick={onEdit}
              className="font-medium text-blue-400 hover:text-blue-300"
            >
              Edit
            </button>
            <button
              onClick={onRemove}
              className="font-medium text-red-400 hover:text-red-300"
            >
              Remove
            </button>
            <button
              onClick={onRegenerateImage}
              className="font-medium text-green-400 hover:text-green-300"
            >
              Regenerate Image
            </button>
            <button
              onClick={onRegenerateVoice}
              className="font-medium text-purple-400 hover:text-purple-300"
            >
              Regenerate Voice
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}