export default function PromptBox() {
  return (
    <div className="mt-10 w-full max-w-2xl bg-gray-800 rounded-2xl p-6 shadow-lg">

      <textarea
        placeholder="Describe your video idea..."
        className="w-full h-40 rounded-xl p-4 text-black text-lg resize-none"
      />

      <button className="mt-6 w-full bg-blue-600 hover:bg-blue-700 transition text-white py-4 rounded-xl font-semibold text-lg">
        🚀 Generate Video
      </button>

    </div>
  );
}