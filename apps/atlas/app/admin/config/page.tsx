import React from 'react';

export default function AdminConfig() {
  return (
    <div>
      <h2 className="text-2xl font-display font-semibold mb-6">System Configuration</h2>
      
      <div className="glass-card p-6 space-y-6">
        <div>
          <h3 className="text-parchment uppercase text-xs tracking-widest mb-2 font-bold">Demo Mode</h3>
          <select className="bg-titanium-deep border border-titanium-border text-cream text-sm rounded-lg focus:ring-mint focus:border-mint block w-full p-2.5">
            <option>Live (Realtime Only)</option>
            <option>Replay (Simulated DB Polling)</option>
            <option selected>Hybrid (Live + Fallback)</option>
          </select>
        </div>

        <div className="pt-4 border-t border-titanium-border">
          <h3 className="text-parchment uppercase text-xs tracking-widest mb-2 font-bold">Data Retention Policy</h3>
          <select className="bg-titanium-deep border border-titanium-border text-cream text-sm rounded-lg focus:ring-mint focus:border-mint block w-full p-2.5">
            <option>30 Days</option>
            <option selected>90 Days</option>
            <option>Indefinite</option>
          </select>
        </div>
        
        <button className="bg-copper text-white px-4 py-2 rounded-lg font-medium text-sm hover:bg-copper/90 transition-colors w-full md:w-auto">
          Save Configuration
        </button>
      </div>
    </div>
  );
}