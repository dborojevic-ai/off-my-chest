'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Post, PostsResponse, ApiResponse } from '@/types/post';

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    try {
      const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
      const data: ApiResponse<PostsResponse> = await response.json();
      
      if (data.success && data.data) {
        setPosts(data.data.posts);
      } else {
        setPosts([]);
      }
      setSearched(true);
    } catch (error) {
      console.error('Search error:', error);
      setPosts([]);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-indigo-900">
      {/* Header */}
      <header className="container mx-auto px-6 py-8">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-slate-800 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            Off My Chest
          </Link>
          <div className="text-sm text-slate-600 dark:text-slate-400">
            Search posts
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 max-w-4xl">
        {/* Search Section */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-lg border border-slate-200 dark:border-slate-700 mb-8">
          <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-200 mb-6 text-center">
            Search Posts
          </h1>
          
          <form onSubmit={handleSearch} className="mb-6">
            <div className="flex gap-4">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for posts by keywords, topics, or emotions..."
                className="flex-1 px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-slate-700 dark:text-slate-200 text-lg"
              />
              <button
                type="submit"
                disabled={loading || !query.trim()}
                className="px-8 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-colors text-lg"
              >
                {loading ? 'Searching...' : 'Search'}
              </button>
            </div>
          </form>

          {searched && (
            <p className="text-slate-600 dark:text-slate-400 text-center">
              {posts.length > 0 ? `Found ${posts.length} post${posts.length === 1 ? '' : 's'}` : 'No posts found'}
            </p>
          )}
        </div>

        {/* Results */}
        {posts.length > 0 && (
          <div className="space-y-6">
            {posts.map((post) => (
              <div key={post.id} className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-slate-200 dark:border-slate-700 hover:shadow-xl transition-shadow">
                <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mb-3">
                  {post.title}
                </h2>
                <p className="text-slate-600 dark:text-slate-400 mb-4 leading-relaxed">
                  {post.body.length > 300 ? `${post.body.substring(0, 300)}...` : post.body}
                </p>
                <div className="flex justify-between items-center text-sm text-slate-500 dark:text-slate-400">
                  <span>Posted {formatDate(post.created_at.toString())}</span>
                  <span>#{post.id}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Back to Home */}
        <div className="mt-12 text-center">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Home
          </Link>
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
