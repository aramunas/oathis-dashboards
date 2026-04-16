import React from 'react';

export default function DataExplorer() {
  return (
    <div>
      <h2 className="text-2xl font-display font-semibold mb-6">Data Explorer</h2>
      <div className="glass-card p-8 text-center border-dashed">
        <p className="text-parchment text-sm">Select a subject to export raw ECG or wearable data payload.</p>
        <button className="mt-4 border border-titanium-border text-cream px-4 py-2 rounded hover:bg-white/5 transition-colors text-sm">
          Run Query
        </button>
      </div>
    </div>
  );
}