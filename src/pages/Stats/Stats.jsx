import React, { useState, useEffect } from 'react';
import { BarChart3, PieChart, FileText, TrendingUp, Loader2, AlertCircle, RefreshCw } from 'lucide-react';
import { useStatsStore } from '../../store/statsStore';
export default function StatsPage() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://127.0.0.1:8000/stats');
      if (!response.ok) throw new Error('Failed to fetch stats');
      const data = await response.json();
      setStats(data.stats);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getStatsArray = () => {
    if (!stats) return [];
    return Object.entries(stats).map(([type, count]) => ({
      type,
      count,
      percentage: (count / getTotalDocs() * 100).toFixed(1)
    }));
  };

  const getTotalDocs = () => {
    if (!stats) return 0;
    return Object.values(stats).reduce((sum, count) => sum + count, 0);
  };

  const getTypeColor = (index) => {
    const colors = [
      'from-purple-500 to-pink-500',
      'from-blue-500 to-cyan-500',
      'from-green-500 to-emerald-500',
      'from-orange-500 to-red-500',
      'from-yellow-500 to-orange-500',
      'from-indigo-500 to-purple-500',
      'from-gray-500 to-slate-500'
    ];
    return colors[index % colors.length];
  };

  const getBarColor = (index) => {
    const colors = [
      'bg-gradient-to-r from-purple-500 to-pink-500',
      'bg-gradient-to-r from-blue-500 to-cyan-500',
      'bg-gradient-to-r from-green-500 to-emerald-500',
      'bg-gradient-to-r from-orange-500 to-red-500',
      'bg-gradient-to-r from-yellow-500 to-orange-500',
      'bg-gradient-to-r from-indigo-500 to-purple-500',
      'bg-gradient-to-r from-gray-500 to-slate-500'
    ];
    return colors[index % colors.length];
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-purple-400 animate-spin mx-auto mb-4" />
          <p className="text-white text-lg">Loading statistics...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="bg-red-500/10 border border-red-500/50 rounded-2xl p-8 max-w-md">
          <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-white text-center mb-2">Error Loading Statistics</h2>
          <p className="text-gray-300 text-center mb-4">{error}</p>
          <button 
            onClick={fetchStats}
            className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const statsArray = getStatsArray();
  const totalDocs = getTotalDocs();
  const maxCount = Math.max(...statsArray.map(s => s.count));

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="border-b border-white/10 bg-black/20 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white">Document Statistics</h1>
          </div>
          <button
            onClick={fetchStats}
            className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors"
          >
            <RefreshCw className="w-5 h-5 text-white" />
            <span className="text-white font-medium">Refresh</span>
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Overview Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                <FileText className="w-6 h-6 text-white" />
              </div>
            </div>
            <p className="text-gray-400 text-sm mb-1">Total Documents</p>
            <p className="text-4xl font-bold text-white">{totalDocs}</p>
          </div>

          <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                <PieChart className="w-6 h-6 text-white" />
              </div>
            </div>
            <p className="text-gray-400 text-sm mb-1">Document Types</p>
            <p className="text-4xl font-bold text-white">{statsArray.length}</p>
          </div>

          <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
            </div>
            <p className="text-gray-400 text-sm mb-1">Most Common Type</p>
            <p className="text-lg font-bold text-white truncate">
              {statsArray.length > 0 ? statsArray.sort((a, b) => b.count - a.count)[0].type : 'N/A'}
            </p>
          </div>
        </div>

        {/* Bar Chart */}
        <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 mb-8">
          <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-purple-400" />
            Document Distribution
          </h2>
          
          <div className="space-y-4">
            {statsArray.sort((a, b) => b.count - a.count).map((item, index) => (
              <div key={item.type}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white font-medium text-sm truncate max-w-[60%]">
                    {item.type}
                  </span>
                  <div className="flex items-center gap-3">
                    <span className="text-gray-400 text-sm">{item.percentage}%</span>
                    <span className="text-white font-bold text-lg min-w-[3rem] text-right">
                      {item.count}
                    </span>
                  </div>
                </div>
                <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${getBarColor(index)} transition-all duration-500 rounded-full`}
                    style={{ width: `${(item.count / maxCount) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Detailed Breakdown */}
        <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6">
          <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <PieChart className="w-6 h-6 text-purple-400" />
            Detailed Breakdown
          </h2>
          
          <div className="grid md:grid-cols-2 gap-4">
            {statsArray.map((item, index) => (
              <div 
                key={item.type}
                className="bg-slate-800/50 rounded-xl p-4 border border-white/5 hover:border-white/20 transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 bg-gradient-to-br ${getTypeColor(index)} rounded-lg flex items-center justify-center flex-shrink-0`}>
                    <span className="text-white font-bold text-lg">{item.count}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-white font-semibold mb-1 break-words">
                      {item.type}
                    </h3>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-2 bg-slate-700 rounded-full overflow-hidden">
                        <div 
                          className={`h-full bg-gradient-to-r ${getTypeColor(index)} transition-all duration-500`}
                          style={{ width: `${item.percentage}%` }}
                        />
                      </div>
                      <span className="text-gray-400 text-sm font-medium">
                        {item.percentage}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}