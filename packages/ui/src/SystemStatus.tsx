import React from 'react';

export function SystemStatus({ activeStreams, avgLatency, totalSamples, integrity }: { activeStreams: number, avgLatency: number, totalSamples: number, integrity: number }) {
  return (
    <div className="glass-card p-4 flex gap-8 items-center justify-between">
      <div className="flex gap-8">
        <div>
          <div className="text-parchment text-xs uppercase tracking-wider mb-1">Active Streams</div>
          <div className="text-cream font-data font-bold text-xl">{activeStreams} / 3</div>
        </div>
        <div>
          <div className="text-parchment text-xs uppercase tracking-wider mb-1">Avg Latency</div>
          <div className="text-cream font-data font-bold text-xl">{avgLatency}ms</div>
        </div>
        <div>
          <div className="text-parchment text-xs uppercase tracking-wider mb-1">Total Samples</div>
          <div className="text-cream font-data font-bold text-xl">{(totalSamples/1000).toFixed(1)}k</div>
        </div>
        <div>
          <div className="text-parchment text-xs uppercase tracking-wider mb-1">Integrity</div>
          <div className="text-mint font-data font-bold text-xl">{integrity}%</div>
        </div>
      </div>
      <div className="text-right">
        <div className="text-mint flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-mint animate-pulse"></div>
          <span className="text-sm font-bold tracking-wide uppercase">System Healthy</span>
        </div>
      </div>
    </div>
  );
}
