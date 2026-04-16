"use client";

import React, { useState, useEffect } from 'react';
import { SubjectPanel, SystemStatus, OathisBadge } from '@oathis/ui';
import { useReplayStream, useSubjects } from '@oathis/data';

function SubjectRow({ subject, sessionId, defaultHr, defaultHrv, defaultSpo2, defaultSleep, defaultReadiness, defaultSkinTemp }: any) {
  const { buffer, isConnected } = useReplayStream(subject.id, sessionId);
  
  return (
    <SubjectPanel 
      id={subject.subject_code} name={subject.display_name} status={isConnected ? 'replay' : 'offline'}
      hr={defaultHr} hrv={defaultHrv} spo2={defaultSpo2} sleepScore={defaultSleep} readiness={defaultReadiness} skinTemp={defaultSkinTemp}
      buffer={buffer}
    />
  );
}

function DemoDashboard() {
  const { subjects, loading } = useSubjects();
  const [totalSamples, setTotalSamples] = useState(0);

  useEffect(() => {
    // A mock interval to update total samples based on active streams
    // For demo purposes, assuming all 3 streams are active
    const active = subjects.length;
    const interval = setInterval(() => {
      setTotalSamples(prev => prev + (active * 130)); // 130 samples per second
    }, 1000);
    return () => clearInterval(interval);
  }, [subjects.length]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-cream">Loading subjects...</div>;
  }

  const activeStreams = subjects.length;

  return (
    <div className="min-h-screen p-6 max-w-6xl mx-auto flex flex-col gap-6">
      {/* Header */}
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-display font-bold text-cream tracking-wide">DigiTwin</h1>
          <div className="text-sm text-parchment uppercase tracking-widest mt-1">ATLAS Health Intelligence Dashboard</div>
        </div>
        <OathisBadge />
      </header>

      {/* Subjects */}
      <main className="flex flex-col gap-4">
        {subjects[0] && <SubjectRow subject={subjects[0]} sessionId="demo-session-1" defaultHr={72} defaultHrv={45} defaultSpo2={98} defaultSleep={85} defaultReadiness={88} defaultSkinTemp={+0.2} />}
        {subjects[1] && <SubjectRow subject={subjects[1]} sessionId="demo-session-2" defaultHr={65} defaultHrv={52} defaultSpo2={99} defaultSleep={91} defaultReadiness={92} defaultSkinTemp={-0.1} />}
        {subjects[2] && <SubjectRow subject={subjects[2]} sessionId="demo-session-3" defaultHr={88} defaultHrv={30} defaultSpo2={96} defaultSleep={70} defaultReadiness={65} defaultSkinTemp={+0.5} />}
      </main>

      {/* Status */}
      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <SystemStatus 
            activeStreams={activeStreams} 
            avgLatency={activeStreams > 0 ? 142 : 0} 
            totalSamples={totalSamples} 
            integrity={100} 
          />
        </div>
        <div className="glass-card p-4 flex flex-col justify-center">
          <div className="text-parchment text-xs uppercase tracking-wider mb-1">Session Info</div>
          <div className="flex items-baseline gap-4 mt-1">
            <div>
              <div className="text-cream font-data font-bold text-xl">{(totalSamples > 0 ? totalSamples / 130 / 60 : 0).toFixed(1)}m</div>
              <div className="text-titanium-border text-[10px] uppercase mt-1">Duration</div>
            </div>
            <div>
              <div className="text-cream font-data font-bold text-xl">{totalSamples.toLocaleString()}</div>
              <div className="text-titanium-border text-[10px] uppercase mt-1">Total Samples</div>
            </div>
          </div>
        </div>
      </div>

      <footer className="text-center mt-8">
        <span className="text-xs text-parchment font-data uppercase tracking-widest bg-titanium-card/50 px-4 py-2 rounded-full">
          OATHIS SECURE DATA FABRIC v0.1 | Audit Trail Active
        </span>
      </footer>
    </div>
  );
}

export default function Page() {
  return <DemoDashboard />;
}