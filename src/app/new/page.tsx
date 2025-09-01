'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Post, CreatePostRequest, ApiResponse } from '@/types/post';

export default function NewPostPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<CreatePostRequest>({
    title: '',
    body: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title.trim() || !formData.body.trim()) {
      setError('Both title and content are required');
      return;
    }

    setLoading(true);
    setError('');
    
    try {
      const response = await fetch('/api/content', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const data: ApiResponse<Post> = await response.json();
      
      if (data.success) {
        setSuccess(true);
        setFormData({ title: '', body: '' });
        // Redirect to browse page after a short delay
        setTimeout(() => {
          router.push('/browse');
        }, 2000);
      } else {
        setError(data.error || 'Failed to create post');
      }
    } catch (error) {
      console.error('Post creation error:', error);
      setError('An error occurred while creating your post');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-indigo-900 flex items-center justify-center">
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-lg border border-slate-200 dark:border-slate-700 max-w-md mx-auto text-center">
          <div className="mb-4 inline-flex items-center justify-center w-16 h-16 bg-emerald-100 dark:bg-emerald-900 rounded-full">
            <svg className="w-8 h-8 text-emerald-600 dark:text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-2">Post Created!</h2>
          <p className="text-slate-600 dark:text-slate-400 mb-4">
            Your anonymous post has been shared successfully. You'll be redirected to browse other posts in a moment.
          </p>
          <Link 
            href="/browse" 
            className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline"
          >
            View all posts →
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-indigo-900">
      {/* Header */}
      <header className="container mx-auto px-6 py-8">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-slate-800 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            Off My Chest
          </Link>
          <div className="text-sm text-slate-600 dark:text-slate-400">
            Share your thoughts
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 max-w-4xl">
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-lg border border-slate-200 dark:border-slate-700">
          <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-200 mb-6 text-center">
            Share What's on Your Mind
          </h1>
          
          <p className="text-slate-600 dark:text-slate-400 text-center mb-8 max-w-2xl mx-auto">
            This is a safe space to express yourself anonymously. Your post will be shared without any identifying information.
          </p>

          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-6">
              <p className="text-red-600 dark:text-red-400">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Title *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Give your post a meaningful title..."
                className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent dark:bg-slate-700 dark:text-slate-200 text-lg"
                required
              />
            </div>

            <div>
              <label htmlFor="body" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Your Message *
              </label>
              <textarea
                id="body"
                name="body"
                value={formData.body}
                onChange={handleChange}
                placeholder="Share your thoughts, feelings, experiences, or anything that's on your mind..."
                rows={10}
                className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent dark:bg-slate-700 dark:text-slate-200 text-lg resize-y min-h-[200px]"
                required
              />
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
                Character count: {formData.body.length}
              </p>
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <h3 className="font-medium text-blue-800 dark:text-blue-200 mb-1">Anonymous & Safe</h3>
                  <p className="text-sm text-blue-700 dark:text-blue-300">
                    Your post will be completely anonymous. We don't collect or store any personal information.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex gap-4 justify-center">
              <Link
                href="/"
                className="px-8 py-3 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors text-lg"
              >
                Cancel
              </Link>
              <button
                type="submit"
                disabled={loading || !formData.title.trim() || !formData.body.trim()}
                className="px-8 py-3 bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-colors text-lg"
              >
                {loading ? 'Posting...' : 'Share Anonymously'}
              </button>
            </div>
          </form>
        </div>

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
