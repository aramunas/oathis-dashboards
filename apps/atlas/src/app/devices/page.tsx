import React from 'react';

export default function Devices() {
  return (
    <div>
      <h2 className="text-2xl font-display font-semibold mb-6">Device Registry</h2>
      <div className="glass-card p-8 text-center">
        <h3 className="text-lg text-cream mb-2">No unassigned devices found</h3>
        <p className="text-parchment text-sm">New Polar H10 and Oura Ring devices will appear here when paired.</p>
      </div>
    </div>
  );
}