import React from 'react';

export function VitalsCard({ label, value, unit, highlight }: { label: string, value: string | number, unit: string, highlight?: boolean }) {
  return (
    <div className={`glass-card p-4 flex flex-col justify-center ${highlight ? 'border-mint/50' : ''}`}>
      <div className="text-parchment text-xs uppercase tracking-wider mb-1">{label}</div>
      <div className="flex items-baseline gap-1">
        <span className={`text-2xl font-data font-bold ${highlight ? 'text-mint' : 'text-cream'}`}>{value}</span>
        <span className="text-parchment text-sm">{unit}</span>
      </div>
    </div>
  );
}
