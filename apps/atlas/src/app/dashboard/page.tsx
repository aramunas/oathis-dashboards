import React from 'react';

export default function Dashboard() {
  return (
    <div>
      <h2 className="text-2xl font-display font-semibold mb-6">Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-card p-6">
          <div className="text-parchment text-xs uppercase tracking-wider mb-2">Total Subjects</div>
          <div className="text-3xl font-data font-bold text-cream">12</div>
        </div>
        <div className="glass-card p-6">
          <div className="text-parchment text-xs uppercase tracking-wider mb-2">Active Streams</div>
          <div className="text-3xl font-data font-bold text-mint">3</div>
        </div>
        <div className="glass-card p-6">
          <div className="text-parchment text-xs uppercase tracking-wider mb-2">System Status</div>
          <div className="text-mint font-bold text-lg mt-1 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-mint animate-pulse" />
            Healthy
          </div>
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-xl font-display font-semibold mb-4">Recent Activity</h3>
        <div className="glass-card overflow-hidden">
          <table className="w-full text-left text-sm font-data">
            <thead className="bg-white/5 border-b border-titanium-border">
              <tr>
                <th className="px-6 py-3 text-parchment font-medium">Time</th>
                <th className="px-6 py-3 text-parchment font-medium">Subject</th>
                <th className="px-6 py-3 text-parchment font-medium">Event</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-titanium-border">
              <tr>
                <td className="px-6 py-4 text-cream">Just now</td>
                <td className="px-6 py-4 text-copper">Sub-3</td>
                <td className="px-6 py-4 text-parchment">Stream connected</td>
              </tr>
              <tr>
                <td className="px-6 py-4 text-cream">5 min ago</td>
                <td className="px-6 py-4 text-copper">Sub-1</td>
                <td className="px-6 py-4 text-parchment">Oura sync completed</td>
              </tr>
              <tr>
                <td className="px-6 py-4 text-cream">12 min ago</td>
                <td className="px-6 py-4 text-copper">Sub-2</td>
                <td className="px-6 py-4 text-parchment">Stream disconnected</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}