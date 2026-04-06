'use client';

import { Search } from 'lucide-react';
import { useState, useCallback, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface SearchSuggestion {
  id: string;
  title: string;
  type: 'producto' | 'bodega' | 'region';
}

export default function SearchBar() {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([]);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const debounceTimer = useRef<NodeJS.Timeout>();

  // Load recent searches from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('recentSearches');
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
  }, []);

  // Debounced search function
  const handleSearch = useCallback(async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setSuggestions([]);
      setRecentSearches(
        JSON.parse(localStorage.getItem('recentSearches') || '[]')
      );
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(
        `/api/search?q=${encodeURIComponent(searchQuery)}`
      );
      if (response.ok) {
        const data = await response.json();
        setSuggestions(data.results || []);
      }
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);

    // Clear existing timer
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    // Set new timer for debounced search
    debounceTimer.current = setTimeout(() => {
      handleSearch(value);
    }, 300);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      // Save to recent searches
      const updated = [
        query,
        ...recentSearches.filter((s) => s !== query),
      ].slice(0, 5);
      setRecentSearches(updated);
      localStorage.setItem('recentSearches', JSON.stringify(updated));

      // Navigate to search page
      router.push(`/buscar?q=${encodeURIComponent(query)}`);
      setIsOpen(false);
      setQuery('');
    }
  };

  const handleSuggestionClick = (suggestion: SearchSuggestion) => {
    if (suggestion.type === 'producto') {
      router.push(`/vino/${suggestion.id}`);
    } else if (suggestion.type === 'bodega') {
      router.push(`/bodega/${suggestion.id}`);
    } else if (suggestion.type === 'region') {
      router.push(`/region/${suggestion.id}`);
    }
    setIsOpen(false);
    setQuery('');
  };

  const handleRecentSearchClick = (search: string) => {
    router.push(`/buscar?q=${encodeURIComponent(search)}`);
    setIsOpen(false);
    setQuery('');
  };

  return (
    <div className="relative w-full">
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative flex items-center">
          <input
            ref={searchInputRef}
            type="text"
            value={query}
            onChange={handleInputChange}
            onFocus={() => setIsOpen(true)}
            placeholder="Buscar vino, bodega, denominación..."
            className="w-full px-4 py-2 pr-10 bg-white border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
            aria-label="Buscar productos"
          />
          <button
            type="submit"
            className="absolute right-3 text-gray-500 hover:text-gray-700 transition-colors"
            aria-label="Buscar"
          >
            <Search size={18} />
          </button>
        </div>
      </form>

      {/* Dropdown Suggestions */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
          {/* Loading State */}
          {isLoading && (
            <div className="p-4 text-center text-gray-500 text-sm">
              Buscando...
            </div>
          )}

          {/* Suggestions */}
          {!isLoading && suggestions.length > 0 && (
            <div>
              <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase border-b border-gray-100">
                Sugerencias
              </div>
              {suggestions.map((suggestion) => (
                <button
                  key={`${suggestion.type}-${suggestion.id}`}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="w-full px-4 py-3 text-left text-sm hover:bg-gray-50 transition-colors flex items-center justify-between border-b border-gray-100 last:border-b-0"
                >
                  <span className="text-gray-900">{suggestion.title}</span>
                  <span className="text-xs text-gray-400 capitalize">
                    {suggestion.type === 'producto'
                      ? 'Vino'
                      : suggestion.type === 'bodega'
                        ? 'Bodega'
                        : 'Región'}
                  </span>
                </button>
              ))}
            </div>
          )}

          {/* Recent Searches */}
          {!query && recentSearches.length > 0 && (
            <div>
              <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase border-b border-gray-100">
                Búsquedas recientes
              </div>
              {recentSearches.map((search, index) => (
                <button
                  key={index}
                  onClick={() => handleRecentSearchClick(search)}
                  className="w-full px-4 py-3 text-left text-sm hover:bg-gray-50 transition-colors text-gray-700 border-b border-gray-100 last:border-b-0"
                >
                  {search}
                </button>
              ))}
            </div>
          )}

          {/* No Results */}
          {!isLoading && !query && suggestions.length === 0 && recentSearches.length === 0 && (
            <div className="p-4 text-center text-gray-500 text-sm">
              Escribe para buscar vinos, bodegas o regiones
            </div>
          )}

          {!isLoading && query && suggestions.length === 0 && (
            <div className="p-4 text-center text-gray-500 text-sm">
              No se encontraron resultados para &quot;{query}&quot;
            </div>
          )}
        </div>
      )}

      {/* Close dropdown when clicking outside */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}
