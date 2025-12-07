import React, { useState } from "react";
import { X } from "lucide-react";
import { toast } from "react-toastify";
import { useCrawlStore } from "../store/crawlStore";

export default function SettingsModal({ showSettings, setShowSettings }) {
  const { crawl, setCrawl, runCrawl } = useCrawlStore();
  const [loading, setLoading] = useState(false);

  if (!showSettings) return null;

  const handleInputChange = (e) => {
    const value = Number(e.target.value);

    // Kiểm tra số hợp lệ 1-10
    if (!Number.isInteger(value) || value < 1 || value > 10) {
      toast.error("Please enter a number between 1 and 10");
      return;
    }

    setCrawl(value);
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const result = await runCrawl();
      console.log("Crawl result:", result);
      toast.success("Crawl completed successfully!");
      setShowSettings(false);
    } catch (error) {
      console.error("Crawl failed:", error);
      toast.error(`Crawl failed: ${error.response?.data?.detail || error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-slate-800 rounded-2xl p-6 max-w-md w-full border border-white/10">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white">Settings</h2>
          <button
            onClick={() => setShowSettings(false)}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-white" />
          </button>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Crawl (1 - 10)
            </label>
            <input
              type="number"
              value={crawl}
              onChange={handleInputChange}
              placeholder="Default value: 5"
              min={1}
              max={10}
              className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 appearance-none"
            />
          </div>
          <button
            className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-medium hover:from-purple-700 hover:to-pink-700 transition-all"
            onClick={handleSave}
            disabled={loading}
          >
            {loading ? "Running..." : "Save Settings"}
          </button>
        </div>
      </div>
    </div>
  );
}
