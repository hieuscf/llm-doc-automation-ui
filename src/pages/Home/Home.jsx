import React, { useState } from 'react';
import Header from '../../component/Header.jsx';
import SettingsModal from '../../component/SettingsModal.jsx';
import UploadSection from '../../component/UploadSection.jsx';
import ApiCards from '../../component/ApiCards.jsx';

export default function LLMDocsHome() {
  const [showSettings, setShowSettings] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Header showSettings={showSettings} setShowSettings={setShowSettings} />
      <SettingsModal showSettings={showSettings} setShowSettings={setShowSettings} />
      <main className="max-w-7xl mx-auto px-6 py-12">
        <UploadSection />
        <ApiCards />
      </main>
    </div>
  );
}
