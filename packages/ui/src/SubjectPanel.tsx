import React from 'react';
import { VitalsCard } from './VitalsCard';
import { ECGCanvas, CircularBuffer } from './ECGCanvas';

interface SubjectPanelProps {
  id: string;
  name: string;
  status: 'live' | 'replay' | 'offline';
  hr: number;
  hrv: number;
  spo2: number;
  sleepScore: number;
  readiness: number;
  skinTemp: number;
  buffer: React.MutableRefObject<CircularBuffer>;
}

export function SubjectPanel({ id, name, status, hr, hrv, spo2, sleepScore, readiness, skinTemp, buffer }: SubjectPanelProps) {
  const statusColors = {
    live: 'bg-mint',
    replay: 'bg-ember',
    offline: 'bg-gray-500'
  };

  return (
    <div className="glass-card p-5 flex flex-col gap-4 mb-4">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className={`w-3 h-3 rounded-full ${statusColors[status]} ${status === 'live' ? 'animate-pulse' : ''}`} />
          <h2 className="text-xl font-display font-semibold text-cream">{name}</h2>
          <span className="text-parchment font-data text-sm bg-black/30 px-2 py-1 rounded">{id}</span>
        </div>
      </div>

      {/* Metrics Row 1 */}
      <div className="grid grid-cols-3 gap-4">
        <VitalsCard label="Heart Rate" value={hr} unit="BPM" highlight />
        <VitalsCard label="HRV" value={hrv} unit="ms" />
        <VitalsCard label="SpO2" value={spo2} unit="%" />
      </div>

      {/* ECG Canvas */}
      <div className="w-full">
        <ECGCanvas buffer={buffer} />
      </div>

      {/* Oura Metrics Row */}
      <div className="grid grid-cols-3 gap-4 border-t border-titanium-border pt-4">
        <VitalsCard label="Sleep Score" value={sleepScore} unit="" />
        <VitalsCard label="Readiness" value={readiness} unit="" />
        <VitalsCard label="Skin Temp" value={skinTemp > 0 ? `+${skinTemp}` : skinTemp} unit="°C" />
      </div>
    </div>
  );
}
