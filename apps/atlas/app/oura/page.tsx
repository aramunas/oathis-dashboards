import React from 'react';

export default function OuraAPI() {
  return (
    <div>
      <h2 className="text-2xl font-display font-semibold mb-6">Oura OAuth2 Management</h2>
      <div className="glass-card p-8">
        <h3 className="text-lg text-cream mb-4">Pending Developer Credentials</h3>
        <p className="text-parchment text-sm">Awaiting Oura API credentials to establish the OAuth2 flow.</p>
        <button className="mt-6 border border-titanium-border text-cream px-4 py-2 rounded opacity-50 cursor-not-allowed text-sm">
          Connect Oura
        </button>
      </div>
    </div>
  );
}