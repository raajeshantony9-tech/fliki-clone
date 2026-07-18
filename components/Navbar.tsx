export default function Navbar() {
  return (
    <nav className="w-full flex justify-between items-center px-10 py-6 border-b border-gray-800">

      <h1 className="text-white text-2xl font-bold">
        🎬 Eomar Labs
      </h1>

      <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg transition">
        Sign In
      </button>

    </nav>
  );
}