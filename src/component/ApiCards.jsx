/* eslint-disable no-unused-vars */
import React from "react";
import { FileText, BarChart3, FolderOpen } from "lucide-react";
import { useNavigate } from "react-router-dom";


const cards = [
{ title: "Get Documents", icon: FileText, endpoint: "/documents", desc: "Retrieve all uploaded documents", color: "purple-400" },
{ title: "Get Stats", icon: BarChart3, endpoint: "/stats", desc: "View document statistics and metrics", color: "pink-400" },
{ title: "Get Categories", icon: FolderOpen, endpoint: "/categories", desc: "Browse document categories", color: "blue-400" },
];

export default function ApiCards() {
    const navigate = useNavigate();
    return (
        <div className="grid md:grid-cols-3 gap-6">
            
            {cards.map(({ title, icon: Icon, endpoint, desc, color }, idx) => (
                <div 
                key={idx} 
                onClick={() => navigate(endpoint)}
                className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 hover:bg-white/10 transition-all cursor-pointer group">
                    <div className="flex items-center justify-between mb-4">
                        <Icon className={`w-8 h-8 text-${color}`} />
                        <span className="text-xs font-mono text-gray-400 bg-green-500/20 text-green-400 px-3 py-1 rounded-full">GET</span>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
                    <p className="text-gray-400 text-sm mb-3">{desc}</p>
                    <code className={`text-xs text-${color} font-mono`}>{endpoint}</code>
                </div>
            ))}
        </div>
    );
}
