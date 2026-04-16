import React from 'react';

export default function Subjects() {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-display font-semibold">Subjects</h2>
        <button className="bg-copper text-white px-4 py-2 rounded-lg font-medium text-sm hover:bg-copper/90 transition-colors">
          Enroll Subject
        </button>
      </div>

      <div className="glass-card overflow-hidden">
        <table className="w-full text-left text-sm font-data">
          <thead className="bg-white/5 border-b border-titanium-border">
            <tr>
              <th className="px-6 py-3 text-parchment font-medium">ID</th>
              <th className="px-6 py-3 text-parchment font-medium">Name</th>
              <th className="px-6 py-3 text-parchment font-medium">Status</th>
              <th className="px-6 py-3 text-parchment font-medium">Last Sync</th>
              <th className="px-6 py-3 text-parchment font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-titanium-border">
            <tr>
              <td className="px-6 py-4 text-cream font-bold">A0B1C2D3</td>
              <td className="px-6 py-4 text-parchment">Subject 1 (Alpha)</td>
              <td className="px-6 py-4">
                <span className="bg-mint/10 text-mint px-2 py-1 rounded text-xs font-bold uppercase">Streaming</span>
              </td>
              <td className="px-6 py-4 text-parchment">Just now</td>
              <td className="px-6 py-4 text-right text-copper cursor-pointer hover:underline">Manage</td>
            </tr>
            <tr>
              <td className="px-6 py-4 text-cream font-bold">B1C2D3E4</td>
              <td className="px-6 py-4 text-parchment">Subject 2 (Beta)</td>
              <td className="px-6 py-4">
                <span className="bg-mint/10 text-mint px-2 py-1 rounded text-xs font-bold uppercase">Streaming</span>
              </td>
              <td className="px-6 py-4 text-parchment">2 min ago</td>
              <td className="px-6 py-4 text-right text-copper cursor-pointer hover:underline">Manage</td>
            </tr>
            <tr>
              <td className="px-6 py-4 text-cream font-bold">C2D3E4F5</td>
              <td className="px-6 py-4 text-parchment">Subject 3 (Gamma)</td>
              <td className="px-6 py-4">
                <span className="bg-ember/10 text-ember px-2 py-1 rounded text-xs font-bold uppercase">Replay Mode</span>
              </td>
              <td className="px-6 py-4 text-parchment">15 min ago</td>
              <td className="px-6 py-4 text-right text-copper cursor-pointer hover:underline">Manage</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}