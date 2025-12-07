import React from "react";
import { Settings, FileText, X } from "lucide-react";

export default function Header({ showSettings, setShowSettings }) {
    return (
        <header className="border-b border-white/10 bg-black/20 backdrop-blur-lg">
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                        <FileText className="w-6 h-6 text-white" />
                    </div>
                    <h1 className="text-2xl font-bold text-white">LLM Docs</h1>
                </div>

                <button
                    onClick={() => setShowSettings(!showSettings)}
                    className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                >
                    <Settings className="w-6 h-6 text-white" />
                </button>
            </div>
        </header>
    );
}
