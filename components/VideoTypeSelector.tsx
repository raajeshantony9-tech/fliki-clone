export default function VideoTypeSelector() {
  return (
    <div className="w-full max-w-2xl bg-gray-800 rounded-2xl p-6 mt-6">
      <label className="text-white text-lg font-semibold block mb-4">
        Select Video Type
      </label>

      <select className="w-full p-4 rounded-xl text-black">
        <option>🎬 Shorts</option>
        <option>📺 Long Video</option>
        <option>👶 Kids Rhymes</option>
      </select>
    </div>
  );
}