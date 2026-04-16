import React from 'react';
import { SystemStatus } from '@oathis/ui';

export default function AdminHealth() {
  return (
    <div>
      <h2 className="text-2xl font-display font-semibold mb-6">System Health</h2>
      <SystemStatus activeStreams={3} avgLatency={121} totalSamples={1420500} integrity={100} />
      
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-card p-6">
          <h3 className="text-parchment uppercase text-xs tracking-widest mb-4 font-bold">Railway Backend</h3>
          <div className="space-y-3">
             <div className="flex justify-between items-center text-sm font-data">
                <span className="text-parchment">API Status</span>
                <span className="text-mint flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-mint" /> Online</span>
             </div>
             <div className="flex justify-between items-center text-sm font-data">
                <span className="text-parchment">Oura Worker</span>
                <span className="text-copper flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-copper" /> Pending OAuth</span>
             </div>
             <div className="flex justify-between items-center text-sm font-data">
                <span className="text-parchment">Clerk Verification</span>
                <span className="text-mint flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-mint" /> Active</span>
             </div>
          </div>
        </div>

        <div className="glass-card p-6">
          <h3 className="text-parchment uppercase text-xs tracking-widest mb-4 font-bold">ATLAS Supabase DB</h3>
          <div className="space-y-3">
             <div className="flex justify-between items-center text-sm font-data">
                <span className="text-parchment">Postgres Status</span>
                <span className="text-mint flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-mint" /> Active</span>
             </div>
             <div className="flex justify-between items-center text-sm font-data">
                <span className="text-parchment">Realtime Broadcast</span>
                <span className="text-mint flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-mint" /> Subscribed</span>
             </div>
             <div className="flex justify-between items-center text-sm font-data">
                <span className="text-parchment">Row Level Security</span>
                <span className="text-mint flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-mint" /> Enforced</span>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}