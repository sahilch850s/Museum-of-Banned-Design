'use client';

import { useState, useEffect } from 'react';
import { Reflection } from '@/types';
import { getExhibitReflections, submitReflection } from '@/services/interactive';
import { MessageSquare, Send, UserCheck } from 'lucide-react';
import Link from 'next/link';

export default function ReflectionSection({ exhibitId }: { exhibitId: number }) {
  const [reflections, setReflections] = useState<Reflection[]>([]);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if user is logged in
    const token = typeof window !== 'undefined' ? localStorage.getItem('access_token') : null;
    setIsLoggedIn(!!token);

    // Fetch existing reflections
    getExhibitReflections(exhibitId)
      .then(setReflections)
      .catch(console.error);
  }, [exhibitId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;

    setLoading(true);
    setError('');

    try {
      const newRef = await submitReflection(exhibitId, comment);
      setReflections([newRef, ...reflections]);
      setComment('');
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Failed to submit reflection. Please ensure you are logged in.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 pt-8 border-t border-museum-border">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-bold text-white flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-museum-red" /> Visitor Reflections
        </h3>
        <span className="text-xs font-mono text-museum-muted">{reflections.length} Thoughts Recorded</span>
      </div>

      {/* Submission Form */}
      {isLoggedIn ? (
        <form onSubmit={handleSubmit} className="glass-panel p-5 rounded-xl border border-museum-border space-y-4">
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Share your perspective on why this design was censored..."
            rows={3}
            className="w-full bg-museum-dark border border-museum-border rounded-lg p-3 text-sm text-white placeholder-museum-muted focus:outline-none focus:border-museum-red resize-none"
          />
          {error && <p className="text-xs text-red-400">{error}</p>}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loading || !comment.trim()}
              className="inline-flex items-center gap-2 bg-museum-red text-white px-5 py-2 rounded-lg text-xs font-semibold hover:bg-red-600 disabled:opacity-50 transition"
            >
              <Send className="w-3.5 h-3.5" /> {loading ? 'Recording...' : 'Add to Guestbook'}
            </button>
          </div>
        </form>
      ) : (
        <div className="glass-panel p-6 rounded-xl border border-museum-border text-center space-y-3">
          <UserCheck className="w-8 h-8 text-museum-muted mx-auto" />
          <p className="text-sm text-gray-300 font-medium">Want to leave your reflection in the vault?</p>
          <Link
            href="/login"
            className="inline-block bg-museum-red/20 border border-museum-red/40 text-museum-red px-4 py-2 rounded-md text-xs font-semibold hover:bg-museum-red hover:text-white transition"
          >
            Sign In to Contribute &rarr;
          </Link>
        </div>
      )}

      {/* List of Reflections */}
      <div className="space-y-4">
        {reflections.length > 0 ? (
          reflections.map((ref) => (
            <div key={ref.id} className="glass-panel p-5 rounded-xl border border-museum-border/60 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-white flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-museum-red" />
                  {ref.username}
                </span>
                <span className="text-xs font-mono text-museum-muted">
                  {new Date(ref.created_at).toLocaleDateString()}
                </span>
              </div>
              <p className="text-sm text-gray-300 pl-4 border-l border-museum-border leading-relaxed">
                {ref.comment}
              </p>
            </div>
          ))
        ) : (
          <p className="text-center py-8 text-xs text-museum-muted italic">
            No reflections recorded yet. Be the first to share your thoughts on this artifact!
          </p>
        )}
      </div>
    </div>
  );
}