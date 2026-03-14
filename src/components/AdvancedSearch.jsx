import React, { useState } from 'react';
import { Search, Filter, X, TrendingUp } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import VoiceSearch from './VoiceSearch';

const AdvancedSearch = ({ onSearch }) => {
  const { t } = useTranslation();
  const [query, setQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    dateRange: 'all',
    sentiment: 'all',
    source: 'all',
    sortBy: 'relevance'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch({ query, ...filters });
  };

  const handleVoiceSearch = (transcript) => {
    setQuery(transcript);
    onSearch({ query: transcript, ...filters });
  };

  const trendingSearches = [
    'AI Revolution',
    'Climate Summit',
    'Tech Stocks',
    'Space Exploration',
    'Quantum Computing',
    'Electric Vehicles'
  ];

  return (
    <div className="w-full max-w-5xl mx-auto mb-8 px-4">
      <form onSubmit={handleSubmit} className="relative">
        {/* Main search bar with glass effect */}
        <div className="backdrop-blur-2xl bg-white/70 dark:bg-dark-card/70 rounded-2xl border-2 border-white/30 dark:border-dark-border/30 shadow-2xl p-2 hover:shadow-primary/20 transition-all">
          <div className="flex items-center gap-2">
            <Search className="w-6 h-6 text-primary ml-4 flex-shrink-0" />
            
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t('search')}
              className="flex-1 px-4 py-4 bg-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none text-lg"
            />

            {query && (
              <button
                type="button"
                onClick={() => setQuery('')}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            )}

            <VoiceSearch onSearch={handleVoiceSearch} />

            <button
              type="button"
              onClick={() => setShowFilters(!showFilters)}
              className={`p-3 rounded-xl transition-all ${
                showFilters ? 'bg-primary text-white' : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
              title="Filters"
            >
              <Filter className="w-5 h-5" />
            </button>

            <button
              type="submit"
              className="px-8 py-3 bg-gradient-primary text-white rounded-xl font-bold hover:shadow-xl hover:scale-105 transition-all flex-shrink-0"
            >
              {t('searchBtn')}
            </button>
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <div className="mt-4 p-4 border-t border-gray-200 dark:border-dark-border grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-600 dark:text-gray-400 mb-2 uppercase">
                  Date Range
                </label>
                <select
                  value={filters.dateRange}
                  onChange={(e) => setFilters({...filters, dateRange: e.target.value})}
                  className="w-full px-3 py-2 rounded-lg bg-white dark:bg-dark-bg border border-gray-300 dark:border-dark-border text-sm focus:ring-2 focus:ring-primary"
                >
                  <option value="all">All Time</option>
                  <option value="today">Today</option>
                  <option value="week">This Week</option>
                  <option value="month">This Month</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-600 dark:text-gray-400 mb-2 uppercase">
                  Sentiment
                </label>
                <select
                  value={filters.sentiment}
                  onChange={(e) => setFilters({...filters, sentiment: e.target.value})}
                  className="w-full px-3 py-2 rounded-lg bg-white dark:bg-dark-bg border border-gray-300 dark:border-dark-border text-sm focus:ring-2 focus:ring-primary"
                >
                  <option value="all">All</option>
                  <option value="positive">Positive</option>
                  <option value="neutral">Neutral</option>
                  <option value="negative">Negative</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-600 dark:text-gray-400 mb-2 uppercase">
                  Source
                </label>
                <select
                  value={filters.source}
                  onChange={(e) => setFilters({...filters, source: e.target.value})}
                  className="w-full px-3 py-2 rounded-lg bg-white dark:bg-dark-bg border border-gray-300 dark:border-dark-border text-sm focus:ring-2 focus:ring-primary"
                >
                  <option value="all">All Sources</option>
                  <option value="guardian">The Guardian</option>
                  <option value="bbc">BBC News</option>
                  <option value="cnn">CNN</option>
                  <option value="reuters">Reuters</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-600 dark:text-gray-400 mb-2 uppercase">
                  Sort By
                </label>
                <select
                  value={filters.sortBy}
                  onChange={(e) => setFilters({...filters, sortBy: e.target.value})}
                  className="w-full px-3 py-2 rounded-lg bg-white dark:bg-dark-bg border border-gray-300 dark:border-dark-border text-sm focus:ring-2 focus:ring-primary"
                >
                  <option value="relevance">Relevance</option>
                  <option value="date">Latest First</option>
                  <option value="popularity">Most Popular</option>
                </select>
              </div>
            </div>
          )}
        </div>
      </form>

      {/* Trending Searches */}
      <div className="mt-4 flex items-center gap-3 flex-wrap">
        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
          <TrendingUp className="w-4 h-4" />
          <span className="font-semibold">Trending:</span>
        </div>
        {trendingSearches.map((trend) => (
          <button
            key={trend}
            onClick={() => {
              setQuery(trend);
              onSearch({ query: trend, ...filters });
            }}
            className="px-4 py-1.5 text-sm rounded-full bg-gradient-to-r from-primary/10 to-secondary/10 hover:from-primary/20 hover:to-secondary/20 text-primary dark:text-secondary font-medium transition-all hover:scale-105"
          >
            {trend}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AdvancedSearch;