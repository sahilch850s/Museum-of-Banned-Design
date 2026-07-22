'use client';

import { useEffect, useState } from 'react';
import { Exhibit } from '@/types';
import { getExhibits } from '@/services/exhibit';
import ExhibitCard from '@/components/cards/ExhibitCard';
import { Search, Filter } from 'lucide-react';

export default function ExhibitsPage() {
  const [exhibits, setExhibits] = useState<Exhibit[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadExhibits() {
      try {
        const data = await getExhibits();
        setExhibits(data);
      } catch (err) {
        console.error('Failed to load exhibits', err);
      } finally {
        setLoading(false);
      }
    }
    loadExhibits();
  }, []);

  const filteredExhibits = exhibits.filter((item) => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.designer_or_creator.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'ALL' || item.ban_category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-8 py-4">
      <div>
        <h1 className="text-3xl font-extrabold text-white">The Censored Vault</h1>
        <p className="text-sm text-museum-muted mt-1">Browse through the complete catalog of restricted designs.</p>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center glass-panel p-4 rounded-xl">
        {/* Search */}
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-museum-muted" />
          <input
            type="text"
            placeholder="Search artifact or designer..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-museum-dark border border-museum-border rounded-lg pl-9 pr-4 py-2 text-sm text-white placeholder-museum-muted focus:outline-none focus:border-museum-red"
          />
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0">
          <Filter className="w-4 h-4 text-museum-muted hidden sm:block" />
          {['ALL', 'POLITICAL', 'ETHICAL', 'CULTURAL', 'SAFETY'].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition ${
                selectedCategory === cat
                  ? 'bg-museum-red text-white'
                  : 'bg-museum-dark text-museum-muted hover:text-white border border-museum-border'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Exhibits Grid */}
      {loading ? (
        <div className="text-center py-20 text-museum-muted">Decrypting Vault Records...</div>
      ) : filteredExhibits.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredExhibits.map((exhibit) => (
            <ExhibitCard key={exhibit.id} exhibit={exhibit} />
          ))}
        </div>
      ) : (
        <div className="glass-panel p-12 text-center text-museum-muted rounded-xl">
          No banned artifacts match your current filter criteria.
        </div>
      )}
    </div>
  );
}