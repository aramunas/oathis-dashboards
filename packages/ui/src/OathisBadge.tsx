"use client";

import React, { useState } from 'react';
import { Shield, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { getBadgeStatus } from '@oathis/oathis-core';

export function OathisBadge() {
  const [isOpen, setIsOpen] = useState(false);
  const status = getBadgeStatus();

  return (
    <>
      <div className="relative inline-block">
        <button 
          onClick={() => setIsOpen(true)}
          className="glass-card px-3 py-1.5 flex items-center gap-2 hover:bg-white/5 transition-colors cursor-pointer"
        >
          <Shield size={16} className="text-copper" />
          <span className="text-cream text-sm font-display font-medium tracking-wide uppercase">Secured by Oathis</span>
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40" 
              onClick={() => setIsOpen(false)} 
            />
            <motion.div 
              initial={{ x: '100%' }} 
              animate={{ x: 0 }} 
              exit={{ x: '100%' }} 
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 w-96 glass-card border-r-0 border-y-0 rounded-none rounded-l-2xl p-6 z-50 overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-8">
                <div className="flex items-center gap-3">
                  <Shield size={24} className="text-copper" />
                  <h3 className="text-xl font-display font-semibold text-cream">Security Status</h3>
                </div>
                <button onClick={() => setIsOpen(false)} className="text-parchment hover:text-white transition-colors cursor-pointer">
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="text-titanium-border text-[10px] uppercase tracking-widest mb-2">Data Classification</h4>
                  <div className="text-cream font-data bg-black/30 px-3 py-2 rounded-md">{status.classification}</div>
                </div>

                <div>
                  <h4 className="text-titanium-border text-[10px] uppercase tracking-widest mb-2">Encryption Status</h4>
                  <div className="text-cream font-data bg-black/30 px-3 py-2 rounded-md">{status.encryption}</div>
                </div>

                <div>
                  <h4 className="text-titanium-border text-[10px] uppercase tracking-widest mb-2">Active Policies</h4>
                  <div className="flex gap-2">
                    {status.policies.map(policy => (
                      <span key={policy} className="text-copper font-data bg-copper/10 px-2 py-1 rounded text-sm">{policy}</span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-titanium-border text-[10px] uppercase tracking-widest mb-2">Audit Trail</h4>
                  <div className="text-mint font-data flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-mint animate-pulse" />
                    {status.auditLog}
                  </div>
                </div>

                <div>
                  <h4 className="text-titanium-border text-[10px] uppercase tracking-widest mb-2">Middleware Stack</h4>
                  <ul className="space-y-2">
                    {status.activeSlots.map((slot, i) => (
                      <li key={slot} className="flex items-center gap-3 text-sm font-data">
                        <span className="text-parchment w-4">{i + 1}.</span>
                        <span className="text-cream">{slot}</span>
                        <span className="ml-auto text-mint text-[10px]">ACTIVE</span>
                      </li>
                    ))}
                    <li className="flex items-center gap-3 text-sm font-data opacity-50">
                      <span className="text-parchment w-4">7.</span>
                      <span className="text-cream">policyBinder</span>
                      <span className="ml-auto text-[10px] text-copper">PENDING</span>
                    </li>
                    <li className="flex items-center gap-3 text-sm font-data opacity-50">
                      <span className="text-parchment w-4">8.</span>
                      <span className="text-cream">federationRouter</span>
                      <span className="ml-auto text-[10px] text-copper">PENDING</span>
                    </li>
                    <li className="flex items-center gap-3 text-sm font-data opacity-50">
                      <span className="text-parchment w-4">9.</span>
                      <span className="text-cream">heartbeatVerifier</span>
                      <span className="ml-auto text-[10px] text-copper">PENDING</span>
                    </li>
                  </ul>
                </div>

                <div className="pt-6 border-t border-titanium-border text-center">
                  <span className="text-xs text-parchment font-data uppercase tracking-widest">{status.version}</span>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
