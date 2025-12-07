import React, { useState, useEffect } from 'react';
import { FileText, Search, Filter, Calendar, Tag, ArrowLeft, X, Loader2, AlertCircle } from 'lucide-react';

export default function DocumentsPage() {
  const [documents, setDocuments] = useState([]);
  const [filteredDocs, setFilteredDocs] = useState([]);
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDocuments();
  }, []);

  useEffect(() => {
    filterDocuments();
  }, [searchTerm, filterType, documents]);

  const fetchDocuments = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://127.0.0.1:8000/documents');
      if (!response.ok) throw new Error('Failed to fetch documents');
      const data = await response.json();
      setDocuments(data);
      setFilteredDocs(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const filterDocuments = () => {
    let filtered = documents;

    if (searchTerm) {
      filtered = filtered.filter(doc =>
        doc.filename.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doc.type.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterType !== 'all') {
      filtered = filtered.filter(doc => doc.source === filterType);
    }

    setFilteredDocs(filtered);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getTypeColor = (confidence) => {
    if (confidence === 0) return 'bg-gray-500/20 text-gray-400';
    if (confidence >= 95) return 'bg-green-500/20 text-green-400';
    if (confidence >= 90) return 'bg-blue-500/20 text-blue-400';
    return 'bg-yellow-500/20 text-yellow-400';
  };

  const getSourceBadge = (source) => {
    return source === 'crawl' 
      ? 'bg-purple-500/20 text-purple-400'
      : 'bg-orange-500/20 text-orange-400';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-purple-400 animate-spin mx-auto mb-4" />
          <p className="text-white text-lg">Loading documents...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="bg-red-500/10 border border-red-500/50 rounded-2xl p-8 max-w-md">
          <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-white text-center mb-2">Error Loading Documents</h2>
          <p className="text-gray-300 text-center mb-4">{error}</p>
          <button 
            onClick={fetchDocuments}
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
              <FileText className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white">Documents</h1>
            <span className="ml-auto text-sm text-gray-400">
              {filteredDocs.length} of {documents.length} documents
            </span>
          </div>

          {/* Search and Filter */}
          <div className="flex gap-4 flex-wrap">
            <div className="flex-1 min-w-[300px] relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search documents..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-slate-800 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-4 py-3 bg-slate-800 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="all">All Sources</option>
              <option value="crawl">Crawl</option>
              <option value="upload">Upload</option>
            </select>
          </div>
        </div>
      </header>

      {/* Documents List */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {filteredDocs.length === 0 ? (
          <div className="text-center py-20">
            <FileText className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">No documents found</h3>
            <p className="text-gray-400">Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {filteredDocs.map((doc) => (
              <div
                key={doc.id}
                onClick={() => setSelectedDoc(doc)}
                className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 hover:bg-white/10 transition-all cursor-pointer group"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <FileText className="w-5 h-5 text-purple-400 flex-shrink-0" />
                      <h3 className="text-lg font-semibold text-white truncate group-hover:text-purple-300 transition-colors">
                        {doc.filename}
                      </h3>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-3">
                      <span className={`text-xs px-3 py-1 rounded-full font-medium ${getSourceBadge(doc.source)}`}>
                        {doc.source}
                      </span>
                      <span className={`text-xs px-3 py-1 rounded-full font-medium ${getTypeColor(doc.confidence)}`}>
                        {doc.type}
                      </span>
                      {doc.confidence > 0 && (
                        <span className="text-xs px-3 py-1 rounded-full font-medium bg-indigo-500/20 text-indigo-400">
                          {doc.confidence}% confidence
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-4 text-sm text-gray-400">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {formatDate(doc.created_at)}
                      </div>
                      <div className="flex items-center gap-1">
                        <Tag className="w-4 h-4" />
                        ID: {doc.id}
                      </div>
                    </div>
                  </div>

                  <div className="text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Document Detail Modal */}
      {selectedDoc && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-slate-800 rounded-3xl max-w-2xl w-full border border-white/10 my-8">
            {/* Modal Header */}
            <div className="border-b border-white/10 p-6 flex items-start justify-between">
              <div className="flex-1 min-w-0 pr-4">
                <h2 className="text-2xl font-bold text-white mb-2 break-words">
                  {selectedDoc.filename}
                </h2>
                <p className="text-gray-400">Document ID: {selectedDoc.id}</p>
              </div>
              <button
                onClick={() => setSelectedDoc(null)}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors flex-shrink-0"
              >
                <X className="w-6 h-6 text-white" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              {/* Type and Classification */}
              <div>
                <h3 className="text-sm font-semibold text-gray-400 uppercase mb-3">Classification</h3>
                <div className="bg-slate-900/50 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white font-medium">Type</span>
                    <span className={`text-sm px-3 py-1 rounded-full font-medium ${getTypeColor(selectedDoc.confidence)}`}>
                      {selectedDoc.type}
                    </span>
                  </div>
                  {selectedDoc.confidence > 0 && (
                    <div className="flex items-center justify-between">
                      <span className="text-white font-medium">Confidence Score</span>
                      <div className="flex items-center gap-2">
                        <div className="w-32 h-2 bg-slate-700 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all"
                            style={{ width: `${selectedDoc.confidence}%` }}
                          />
                        </div>
                        <span className="text-purple-400 font-semibold">{selectedDoc.confidence}%</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Metadata */}
              <div>
                <h3 className="text-sm font-semibold text-gray-400 uppercase mb-3">Metadata</h3>
                <div className="bg-slate-900/50 rounded-xl p-4 space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Source</span>
                    <span className={`text-sm px-3 py-1 rounded-full font-medium ${getSourceBadge(selectedDoc.source)}`}>
                      {selectedDoc.source}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Created At</span>
                    <span className="text-white">{formatDate(selectedDoc.created_at)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Document ID</span>
                    <span className="text-white font-mono">#{selectedDoc.id}</span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-4">
                <button className="flex-1 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-medium hover:from-purple-700 hover:to-pink-700 transition-all">
                  View Full Document
                </button>
                <button className="px-6 py-3 bg-slate-700 text-white rounded-xl font-medium hover:bg-slate-600 transition-all">
                  Download
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}