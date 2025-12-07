import React, { useState } from "react";
import { Upload, Link2 } from "lucide-react";

export default function UploadSection() {
    const [activeTab, setActiveTab] = useState("upload");
    const [file, setFile] = useState(null);
    const [url, setUrl] = useState("");

    const handleFileChange = (e) => e.target.files && setFile(e.target.files[0]);
    const handleUpload = () => {
        if (activeTab === "upload" && file) console.log("Uploading file:", file.name);
        if (activeTab === "url" && url) console.log("Fetching URL:", url);
    };

    return (
        <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 p-8 mb-8">
            <h2 className="text-3xl font-bold text-white mb-6">Upload Documents - Link</h2>
            {/* Tabs */}
            <div className="flex gap-4 mb-6">
                <button onClick={() => setActiveTab("upload")} className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${activeTab === 'upload' ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white' : 'bg-white/5 text-gray-300 hover:bg-white/10'}`}>
                    <Upload className="w-5 h-5" /> Upload File
                </button>
                <button onClick={() => setActiveTab("url")} className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${activeTab === 'url' ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white' : 'bg-white/5 text-gray-300 hover:bg-white/10'}`}>
                    <Link2 className="w-5 h-5" /> From URL
                </button>
            </div>

            {activeTab === "upload" ? (
                <label className="block">
                    <input type="file" onChange={handleFileChange} className="hidden" accept=".pdf,.doc,.docx,.txt" />
                    <div className="border-2 border-dashed border-white/20 rounded-2xl p-12 text-center cursor-pointer hover:border-purple-500 hover:bg-white/5 transition-all">
                        <Upload className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                        <p className="text-white font-medium mb-2">{file ? file.name : 'Click to upload or drag and drop'}</p>
                        <p className="text-gray-400 text-sm">PDF, DOC, DOCX, TXT up to 10MB</p>
                    </div>
                </label>
            ) : (
                <input type="url" value={url} onChange={(e) => setUrl(e.target.value)} placeholder="http://chinhphu.vn/" className="w-full px-6 py-4 bg-slate-800 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 mb-4" />
            )}

            <button onClick={handleUpload} disabled={activeTab === 'upload' ? !file : !url} className="mt-6 w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-medium hover:from-purple-700 hover:to-pink-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed">
                {activeTab === 'upload' ? 'Upload Document' : 'Fetch from URL'}
            </button>
        </div>
    );
}
