/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ShieldCheck, TrendingUp, Mail, ArrowUpRight, CheckCircle2 } from 'lucide-react';

interface FooterProps {
  onSelectDocument?: (doc: 'privacy' | 'terms' | 'compliance') => void;
}

export default function Footer({ onSelectDocument }: FooterProps) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setEmail('');
  };

  return (
    <footer id="main-footer" className="bg-slate-950 text-slate-400 border-t border-slate-900 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Upper Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 border-b border-slate-900 pb-12 mb-10">
          
          {/* Brand Info (4 cols) */}
          <div className="md:col-span-4 space-y-4">
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-600 text-white shadow-xs">
                <TrendingUp className="w-4 h-4" />
              </div>
              <div>
                <span className="font-display font-bold text-lg text-white tracking-tight">
                  Finnovative
                </span>
                <span className="block text-[8px] font-mono font-medium uppercase tracking-widest text-emerald-400 -mt-1">
                  Financial Solutions
                </span>
              </div>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed max-w-sm">
              Securing livelihoods and growing generational fortunes. Authorized direct mutual fund facilitator and certified insurance advisory firm.
            </p>
          </div>

          {/* Quick links (2 cols) */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="text-white font-semibold text-xs uppercase tracking-wider">
              Investment Core
            </h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#mutual-funds" className="hover:text-emerald-400 transition-colors">Equity Growth Funds</a></li>
              <li><a href="#mutual-funds" className="hover:text-emerald-400 transition-colors">Balanced Hybrid Plans</a></li>
              <li><a href="#mutual-funds" className="hover:text-emerald-400 transition-colors">Tax Saver ELSS</a></li>
              <li><a href="#calculators" className="hover:text-emerald-400 transition-colors">SIP Compounding Tools</a></li>
            </ul>
          </div>

          {/* Insurance Links (2 cols) */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="text-white font-semibold text-xs uppercase tracking-wider">
              Bespoke Security
            </h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#insurance" className="hover:text-teal-400 transition-colors">High-Value Term Life</a></li>
              <li><a href="#insurance" className="hover:text-teal-400 transition-colors">Cashless Family Health</a></li>
              <li><a href="#insurance" className="hover:text-teal-400 transition-colors">Income Protection</a></li>
              <li><a href="#insurance" className="hover:text-teal-400 transition-colors">Premium Estimator</a></li>
            </ul>
          </div>

          {/* Newsletter (4 cols) */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-white font-semibold text-xs uppercase tracking-wider">
              Weekly Wealth Insights
            </h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              No spam. Just professional macro analysis, policy reviews, and tax optimization updates directly from our research desk.
            </p>
            
            {!subscribed ? (
              <form onSubmit={handleSubscribe} id="newsletter-form" className="flex gap-2">
                <input
                  id="newsletter-email"
                  type="email"
                  required
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs focus:outline-hidden text-slate-300 placeholder:text-slate-600 focus:border-emerald-600"
                />
                <button
                  id="newsletter-submit"
                  type="submit"
                  className="px-4 py-2 bg-emerald-750 hover:bg-emerald-600 text-white font-semibold text-xs rounded-lg transition-colors flex items-center gap-1 shrink-0 cursor-pointer"
                >
                  Join
                  <ArrowUpRight className="w-3 h-3" />
                </button>
              </form>
            ) : (
              <div className="flex items-center gap-2 p-3.5 bg-slate-900/60 rounded-xl border border-slate-800/80 text-emerald-400 text-xs">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Successfully added! Check your inbox for our latest report.</span>
              </div>
            )}
          </div>

        </div>

        {/* Regulatory Disclaimers & AMFI Credentials */}
        <div id="regulatory-disclaimers" className="space-y-4 text-[10px] text-slate-600 leading-relaxed border-b border-slate-900 pb-10 mb-8">
          <p>
            <strong>MUTUAL FUND DISCLAIMER:</strong> Mutual Fund investments are subject to market risks, read all scheme related documents carefully before investing. Past performance is not an indicator of future returns. Returns are not guaranteed. Net Asset Value (NAV) of the schemes can fluctuate upwards or downwards depending upon macro factors and asset valuations.
          </p>
          <p>
            <strong>INSURANCE SOLICITATION DISCLAIMER:</strong> Insurance is the subject matter of solicitation. Finnovative Financial Solutions acts as a corporate referral agent and does not underwrite the risks directly. Product features, coverages, claims, riders, and premiums are subject to specific insurance company policies and physical medical checkups.
          </p>
          <p>
            <strong>REGULATORY COMPLIANCE:</strong> Finnovative Financial Solutions | AMFI Registered Mutual Fund Distributor | IRDAI Corporate Agent ID: CA09483321 | SEBI Registered Investment Advisory Referral Desk. Registered Address: A 710, Samanvay Sonorous, Beside Gujarat Kidney Hospital, Jetalpur Road, Alkapuri, Vadodara - 390007.
          </p>
        </div>

        {/* Brand Bottom Creds */}
        <div className="flex flex-col sm:flex-row justify-between items-center text-[11px] text-slate-600 gap-4">
          <div>
            &copy; {new Date().getFullYear()} Finnovative Financial Solutions. All rights reserved.
          </div>
          <div className="flex gap-4">
            <a
              href="/privacy-policy"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-slate-400 transition-colors cursor-pointer"
            >
              Privacy Policy
            </a>
            <span className="text-slate-900">&bull;</span>
            <a
              href="/terms-of-service"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-slate-400 transition-colors cursor-pointer"
            >
              Terms of Service
            </a>
            <span className="text-slate-900">&bull;</span>
            <a
              href="/compliance"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-slate-400 transition-colors cursor-pointer"
            >
              Compliance Audits
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}
