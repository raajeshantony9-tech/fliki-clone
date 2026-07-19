export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header className="bg-white shadow">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <span className="text-xl font-semibold">Eomar Labs – Storyboard</span>
          </div>
          <div className="hidden md:flex space-x-4">
            {/* Navigation links could go here */}
          </div>
        </nav>
      </header>
      <main className="flex-1 flex">
        {/* Sidebar placeholder */}
        <aside className="w-64 bg-white border-r">
          <nav className="p-4 space-y-2">
            <a href="#" className="px-3 py-2 rounded text-sm font-medium text-gray-700 hover:bg-gray-100">
              My Storyboards
            </a>
            <a href="#" className="px-3 py-2 rounded text-sm font-medium text-gray-700 hover:bg-gray-100">
              New Storyboard
            </a>
          </nav>
        </aside>
        <section className="flex-1 p-6 overflow-y-auto">
          {children}
        </section>
      </main>
      <footer className="bg-white border-t text-center py-4 text-sm text-gray-500">
        Eomar Labs &copy; {new Date().getFullYear()}
      </footer>
    </div>
  );
}