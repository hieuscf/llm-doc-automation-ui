import React, { useState, useEffect } from 'react';
import { FolderOpen, DollarSign, Users, Scale, TrendingUp, Settings, Briefcase, FileQuestion, Loader2, AlertCircle, Search } from 'lucide-react';

export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const filtered = categories.filter(cat =>
        cat.key.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cat.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredCategories(filtered);
    } else {
      setFilteredCategories(categories);
    }
  }, [searchTerm, categories]);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://127.0.0.1:8000/categories');
      if (!response.ok) throw new Error('Failed to fetch categories');
      const data = await response.json();
      setCategories(data);
      setFilteredCategories(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getCategoryIcon = (key) => {
    const icons = {
      'FINANCE_ACCOUNTING': DollarSign,
      'HUMAN_RESOURCES': Users,
      'LEGAL_COMPLIANCE': Scale,
      'SALES_MARKETING': TrendingUp,
      'OPERATIONS_TECHNICAL': Settings,
      'MANAGEMENT_INTERNAL': Briefcase,
      'OTHERS': FileQuestion
    };
    return icons[key] || FolderOpen;
  };

  const getCategoryColor = (key) => {
    const colors = {
      'FINANCE_ACCOUNTING': 'from-green-500 to-emerald-500',
      'HUMAN_RESOURCES': 'from-blue-500 to-cyan-500',
      'LEGAL_COMPLIANCE': 'from-purple-500 to-pink-500',
      'SALES_MARKETING': 'from-orange-500 to-red-500',
      'OPERATIONS_TECHNICAL': 'from-indigo-500 to-violet-500',
      'MANAGEMENT_INTERNAL': 'from-yellow-500 to-orange-500',
      'OTHERS': 'from-gray-500 to-slate-500'
    };
    return colors[key] || 'from-purple-500 to-pink-500';
  };

  const formatCategoryName = (key) => {
    return key.split('_').map(word => 
      word.charAt(0) + word.slice(1).toLowerCase()
    ).join(' ');
  };

  const getExampleTags = (description) => {
    return description.split(',').slice(0, 3).map(tag => tag.trim());
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-purple-400 animate-spin mx-auto mb-4" />
          <p className="text-white text-lg">Loading categories...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="bg-red-500/10 border border-red-500/50 rounded-2xl p-8 max-w-md">
          <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-white text-center mb-2">Error Loading Categories</h2>
          <p className="text-gray-300 text-center mb-4">{error}</p>
          <button 
            onClick={fetchCategories}
            className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="border-b border-white/10 bg-black/20 backdrop-blur-lg sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <FolderOpen className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white">Document Categories</h1>
            <span className="ml-auto text-sm text-gray-400">
              {filteredCategories.length} categories
            </span>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search categories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-slate-800 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
        </div>
      </header>

      {/* Categories Grid */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {filteredCategories.length === 0 ? (
          <div className="text-center py-20">
            <FolderOpen className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">No categories found</h3>
            <p className="text-gray-400">Try adjusting your search</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCategories.map((category) => {
              const Icon = getCategoryIcon(category.key);
              const colorClass = getCategoryColor(category.key);
              const examples = getExampleTags(category.description);

              return (
                <div
                  key={category.key}
                  onClick={() => setSelectedCategory(category)}
                  className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 hover:bg-white/10 transition-all cursor-pointer group"
                >
                  {/* Icon and Title */}
                  <div className="flex items-start gap-4 mb-4">
                    <div className={`w-14 h-14 bg-gradient-to-br ${colorClass} rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-bold text-white mb-1 group-hover:text-purple-300 transition-colors">
                        {formatCategoryName(category.key)}
                      </h3>
                      <p className="text-xs text-gray-400 font-mono">{category.key}</p>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-300 text-sm mb-4 line-clamp-2">
                    {category.description}
                  </p>

                  {/* Example Tags */}
                  <div className="flex flex-wrap gap-2">
                    {examples.map((tag, index) => (
                      <span
                        key={index}
                        className="text-xs px-3 py-1 bg-white/5 border border-white/10 rounded-full text-gray-300"
                      >
                        {tag}
                      </span>
                    ))}
                    {category.description.split(',').length > 3 && (
                      <span className="text-xs px-3 py-1 bg-white/5 border border-white/10 rounded-full text-gray-400">
                        +{category.description.split(',').length - 3} more
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      {/* Category Detail Modal */}
      {selectedCategory && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-800 rounded-3xl max-w-2xl w-full border border-white/10">
            {/* Modal Header */}
            <div className="border-b border-white/10 p-6">
              <div className="flex items-start gap-4">
                <div className={`w-16 h-16 bg-gradient-to-br ${getCategoryColor(selectedCategory.key)} rounded-2xl flex items-center justify-center flex-shrink-0`}>
                  {React.createElement(getCategoryIcon(selectedCategory.key), {
                    className: "w-8 h-8 text-white"
                  })}
                </div>
                <div className="flex-1 min-w-0">
                  <h2 className="text-2xl font-bold text-white mb-2">
                    {formatCategoryName(selectedCategory.key)}
                  </h2>
                  <p className="text-sm text-gray-400 font-mono">{selectedCategory.key}</p>
                </div>
                <button
                  onClick={() => setSelectedCategory(null)}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              {/* Description */}
              <div>
                <h3 className="text-sm font-semibold text-gray-400 uppercase mb-3">Description</h3>
                <p className="text-white text-lg leading-relaxed">
                  {selectedCategory.description}
                </p>
              </div>

              {/* Document Types */}
              <div>
                <h3 className="text-sm font-semibold text-gray-400 uppercase mb-3">
                  Document Types ({selectedCategory.description.split(',').length})
                </h3>
                <div className="flex flex-wrap gap-2">
                  {selectedCategory.description.split(',').map((type, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-slate-900/50 border border-white/10 rounded-lg text-white hover:bg-slate-700 transition-colors"
                    >
                      {type.trim()}
                    </span>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-4">
                <button className="flex-1 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-medium hover:from-purple-700 hover:to-pink-700 transition-all">
                  View Documents in Category
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}