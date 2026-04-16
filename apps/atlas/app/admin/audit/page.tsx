import React from 'react';

export default function AdminAudit() {
  return (
    <div>
      <h2 className="text-2xl font-display font-semibold mb-6">Audit Log</h2>
      <div className="glass-card overflow-hidden">
        <table className="w-full text-left text-sm font-data">
          <thead className="bg-white/5 border-b border-titanium-border">
            <tr>
              <th className="px-6 py-3 text-parchment font-medium">Timestamp</th>
              <th className="px-6 py-3 text-parchment font-medium">Actor</th>
              <th className="px-6 py-3 text-parchment font-medium">Action</th>
              <th className="px-6 py-3 text-parchment font-medium">Resource</th>
              <th className="px-6 py-3 text-parchment font-medium text-right">Signature</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-titanium-border">
            <tr>
              <td className="px-6 py-4 text-parchment whitespace-nowrap">2026-04-15 22:45:11</td>
              <td className="px-6 py-4 text-cream">Subject_Alpha_UUID</td>
              <td className="px-6 py-4 text-mint font-bold uppercase text-xs">INGEST_ECG</td>
              <td className="px-6 py-4 text-parchment">atlas_ecg_samples</td>
              <td className="px-6 py-4 text-right text-titanium-border text-xs truncate max-w-xs">e3b0c442...855</td>
            </tr>
            <tr>
              <td className="px-6 py-4 text-parchment whitespace-nowrap">2026-04-15 22:45:10</td>
              <td className="px-6 py-4 text-cream">Subject_Beta_UUID</td>
              <td className="px-6 py-4 text-mint font-bold uppercase text-xs">INGEST_ECG</td>
              <td className="px-6 py-4 text-parchment">atlas_ecg_samples</td>
              <td className="px-6 py-4 text-right text-titanium-border text-xs truncate max-w-xs">8d969eef...b10</td>
            </tr>
            <tr>
              <td className="px-6 py-4 text-parchment whitespace-nowrap">2026-04-15 22:45:09</td>
              <td className="px-6 py-4 text-cream">System_Worker</td>
              <td className="px-6 py-4 text-copper font-bold uppercase text-xs">POLL_OURA</td>
              <td className="px-6 py-4 text-parchment">wearable_metrics</td>
              <td className="px-6 py-4 text-right text-titanium-border text-xs truncate max-w-xs">9f86d081...e58</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}