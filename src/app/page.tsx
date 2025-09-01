import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-indigo-900">
      {/* Header */}
      <header className="container mx-auto px-6 py-8">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-200">
            Off My Chest
          </h1>
          <div className="text-sm text-slate-600 dark:text-slate-400">
            Anonymous sharing platform
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 flex flex-col items-center justify-center min-h-[calc(100vh-200px)]">
        {/* Hero Section */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-slate-800 via-blue-600 to-indigo-600 dark:from-slate-200 dark:via-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
            Off My Chest
          </h1>
          <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 mb-4 leading-relaxed">
            A safe space to share your thoughts, feelings, and experiences anonymously
          </p>
          <p className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
            Sometimes we all need to get something off our chest. Here, you can express yourself freely, 
            connect with others, and find comfort in knowing you're not alone.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 w-full max-w-4xl justify-center items-stretch">
          {/* Search Button */}
          <Link href="/search" className="flex-1 max-w-sm">
            <div className="group bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-slate-200 dark:border-slate-700 h-full">
              <div className="text-center">
                <div className="mb-4 inline-flex items-center justify-center w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full group-hover:bg-blue-200 dark:group-hover:bg-blue-800 transition-colors">
                  <svg className="w-8 h-8 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mb-2">Search</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                  Find posts that resonate with you. Search by keywords, topics, or emotions.
                </p>
              </div>
            </div>
          </Link>

          {/* Start New Button */}
          <Link href="/new" className="flex-1 max-w-sm">
            <div className="group bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-slate-200 dark:border-slate-700 h-full">
              <div className="text-center">
                <div className="mb-4 inline-flex items-center justify-center w-16 h-16 bg-emerald-100 dark:bg-emerald-900 rounded-full group-hover:bg-emerald-200 dark:group-hover:bg-emerald-800 transition-colors">
                  <svg className="w-8 h-8 text-emerald-600 dark:text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mb-2">Start New</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                  Share what's on your mind. Write anonymously about anything that matters to you.
                </p>
              </div>
            </div>
          </Link>

          {/* Browse Button */}
          <Link href="/browse" className="flex-1 max-w-sm">
            <div className="group bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-slate-200 dark:border-slate-700 h-full">
              <div className="text-center">
                <div className="mb-4 inline-flex items-center justify-center w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-full group-hover:bg-purple-200 dark:group-hover:bg-purple-800 transition-colors">
                  <svg className="w-8 h-8 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mb-2">Browse</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                  Explore recent posts from the community. Read, reflect, and feel connected.
                </p>
              </div>
            </div>
          </Link>
        </div>

        {/* Stats Section */}
        <div className="mt-16 text-center">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            A safe, anonymous community for authentic expression
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="container mx-auto px-6 py-8 mt-16">
        <div className="text-center text-sm text-slate-500 dark:text-slate-400">
          <p>&copy; 2025 Off My Chest. A place for honest conversations.</p>
        </div>
      </footer>
    </div>
  );
}
