"use client";

import React from 'react';
import { OathisBadge } from './OathisBadge';
import { Shield, Activity, Users, Watch, Database, Key, Settings } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const navItems = [
  { href: '/dashboard', label: 'Overview', icon: Activity },
  { href: '/subjects', label: 'Subjects', icon: Users },
  { href: '/devices', label: 'Devices', icon: Watch },
  { href: '/data', label: 'Data Explorer', icon: Database },
  { href: '/oura', label: 'Oura API', icon: Key },
  { href: '/admin/config', label: 'System Config', icon: Settings },
  { href: '/admin/audit', label: 'Audit Log', icon: Shield },
  { href: '/admin/health', label: 'System Health', icon: Activity },
];

export function AdminLayout({ children }: AdminLayoutProps) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-titanium-deep text-cream font-body flex">
      {/* Sidebar */}
      <aside className="w-64 glass-card m-4 rounded-xl border-titanium-border flex flex-col hidden md:flex">
        <div className="p-6 pb-2">
          <h1 className="text-xl font-display font-bold text-cream tracking-wide">DigiTwin</h1>
          <div className="text-xs text-parchment uppercase tracking-widest mt-1">ATLAS Command</div>
        </div>

        <nav className="flex-1 py-6 px-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || pathname?.startsWith(item.href + '/');
            return (
              <Link 
                key={item.href} 
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors text-sm font-medium ${
                  isActive 
                    ? 'bg-white/10 text-cream' 
                    : 'text-parchment hover:text-cream hover:bg-white/5'
                }`}
              >
                <Icon size={18} className={isActive ? 'text-copper' : 'text-titanium-border'} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-titanium-border/50">
          <div className="text-[10px] text-parchment uppercase tracking-widest mb-3 px-2">Security Context</div>
          <div className="px-2">
             <OathisBadge />
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col p-4 md:pl-0 h-screen overflow-hidden">
        <header className="glass-card rounded-xl border-titanium-border mb-4 px-6 py-4 flex justify-between items-center shrink-0">
          <div className="text-parchment font-data text-sm">
            {pathname}
          </div>
          <div className="flex items-center gap-4">
             {/* Clerk User Button Placeholder */}
             <div className="w-8 h-8 rounded-full bg-titanium-border flex items-center justify-center text-xs text-parchment font-bold">
                AD
             </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto glass-card rounded-xl border-titanium-border p-6">
          {children}
        </div>
      </main>
    </div>
  );
}
