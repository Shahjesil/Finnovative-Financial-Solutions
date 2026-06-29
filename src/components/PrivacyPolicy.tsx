/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShieldCheck, 
  ArrowLeft, 
  Lock, 
  FileText, 
  Scale, 
  AlertTriangle, 
  Eye, 
  CheckCircle2, 
  Mail, 
  Phone, 
  MapPin, 
  Search,
  ExternalLink
} from 'lucide-react';

interface PrivacyPolicyProps {
  initialTab: 'privacy' | 'terms' | 'compliance';
  onBackToHome: () => void;
}

export default function PrivacyPolicy({ initialTab, onBackToHome }: PrivacyPolicyProps) {
  const [activeTab, setActiveTab] = useState<'privacy' | 'terms' | 'compliance'>(initialTab);
  const [searchQuery, setSearchQuery] = useState('');

  // Scroll to top when tab or document is opened
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [activeTab]);

  const tabs = [
    { id: 'privacy' as const, label: 'Privacy Policy', icon: ShieldCheck, desc: 'How we protect your personal & financial data' },
    { id: 'terms' as const, label: 'Terms of Service', icon: FileText, desc: 'Rules & agreements for using our services' },
    { id: 'compliance' as const, label: 'Regulatory Disclaimers', icon: Scale, desc: 'AMFI, IRDAI, and SEBI compliance records' },
  ];

  // Helper to highlight matching text
  const highlightText = (text: string, search: string) => {
    if (!search.trim()) return text;
    const regex = new RegExp(`(${search.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')})`, 'gi');
    const parts = text.split(regex);
    return (
      <>
        {parts.map((part, i) => 
          regex.test(part) ? (
            <mark key={i} className="bg-amber-100 text-amber-900 rounded-xs px-0.5 font-medium">{part}</mark>
          ) : (
            part
          )
        )}
      </>
    );
  };

  return (
    <div id="privacy-page-container" className="min-h-screen bg-slate-50 pt-24 pb-16">
      {/* Background Graphic Accents */}
      <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-emerald-50/40 via-transparent to-transparent -z-10 pointer-events-none" />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Button & Navigation Path */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <button
            id="back-to-home-btn"
            onClick={onBackToHome}
            className="flex items-center gap-2 text-sm text-slate-600 hover:text-emerald-600 font-medium transition-colors cursor-pointer group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Back to Advisory Desk</span>
          </button>
          
          <div className="text-xs text-slate-400 font-mono">
            <span>FINNOVATIVE</span> &bull; <span>LEGAL & COMPLIANCE HUB</span>
          </div>
        </div>

        {/* Hero Section */}
        <div className="mb-10 text-center sm:text-left">
          <h1 className="text-3xl sm:text-4xl font-display font-bold text-slate-900 tracking-tight">
            Legal & Compliance Center
          </h1>
          <p className="text-slate-600 text-sm mt-2 max-w-2xl leading-relaxed">
            Finnovative Financial Solutions operates under strict statutory standards set by Indian financial authorities. Transparency, data isolation, and ethical wealth management represent the pillars of our client relationships.
          </p>
        </div>

        {/* Dynamic Navigation Tabs & Search */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Side Tabs and Info Desk */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Search Input */}
            <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-xs">
              <label htmlFor="legal-search" className="block text-xs font-mono uppercase text-slate-400 mb-2 font-medium">
                Search Legal Library
              </label>
              <div className="relative">
                <input
                  id="legal-search"
                  type="text"
                  placeholder="e.g. KYC, CAMS, insurance..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 py-2 text-xs focus:outline-hidden text-slate-800 placeholder:text-slate-400 focus:border-emerald-500 focus:bg-white transition-colors"
                />
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              </div>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="mt-2 text-[10px] font-medium text-slate-500 hover:text-emerald-600 transition-colors cursor-pointer"
                >
                  Clear search filter
                </button>
              )}
            </div>

            {/* Document Switcher Cards */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-xs overflow-hidden">
              <div className="px-4 py-3 bg-slate-900 text-white font-mono text-[10px] uppercase tracking-wider font-semibold">
                Available Agreements
              </div>
              <div className="p-2 space-y-1">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      id={`tab-select-${tab.id}`}
                      onClick={() => {
                        setActiveTab(tab.id);
                        setSearchQuery('');
                      }}
                      className={`w-full text-left p-3 rounded-xl transition-all flex items-start gap-3 cursor-pointer ${
                        isActive 
                          ? 'bg-emerald-50/70 border border-emerald-100 text-slate-900' 
                          : 'hover:bg-slate-50 border border-transparent text-slate-600'
                      }`}
                    >
                      <div className={`p-2 rounded-lg shrink-0 mt-0.5 transition-colors ${
                        isActive ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-500'
                      }`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-semibold text-xs sm:text-sm">{tab.label}</div>
                        <div className="text-[10px] text-slate-500 leading-tight mt-0.5">{tab.desc}</div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Regulatory Summary Box */}
            <div className="bg-emerald-950 text-emerald-100 p-5 rounded-2xl border border-emerald-900 shadow-xs relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-800/10 rounded-full blur-2xl pointer-events-none" />
              <h4 className="font-display font-bold text-xs uppercase tracking-wider text-emerald-300">
                Statutory Registry ID
              </h4>
              <div className="mt-3 space-y-2.5 text-xs">
                <div className="flex justify-between border-b border-emerald-900/60 pb-1.5">
                  <span className="text-emerald-400">AMFI Mutual Fund ID:</span>
                  <span className="font-mono font-medium text-white">ARN-23483321</span>
                </div>
                <div className="flex justify-between border-b border-emerald-900/60 pb-1.5">
                  <span className="text-emerald-400">IRDAI Corporate Agent:</span>
                  <span className="font-mono font-medium text-white">CA09483321</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-emerald-400">SEBI Referral Desk:</span>
                  <span className="font-mono font-medium text-white">Registered</span>
                </div>
              </div>
              <p className="text-[10px] text-emerald-300/80 leading-relaxed mt-4 pt-1 border-t border-emerald-900/60">
                Finnovative acts as an authorized distributor of mutual funds and registered corporate referral agent for secure insurance solutions in India.
              </p>
            </div>

          </div>

          {/* Main Document Content */}
          <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-100 shadow-xs p-6 sm:p-8">
            <AnimatePresence mode="wait">
              {activeTab === 'privacy' && (
                <motion.div
                  key="privacy-doc"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-6 text-slate-700 text-sm leading-relaxed"
                >
                  <div className="flex flex-wrap items-center justify-between border-b border-slate-100 pb-4 gap-2">
                    <div>
                      <h2 className="text-xl sm:text-2xl font-bold text-slate-950 font-display">
                        Privacy Policy
                      </h2>
                      <p className="text-xs text-slate-400 mt-1">
                        Effective Date: June 2026 &bull; Version 2.1
                      </p>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 font-mono text-[10px] font-bold">
                      🔒 SECURE PORTAL
                    </span>
                  </div>

                  {/* Privacy Policy Content */}
                  <p className="italic text-slate-500">
                    Your financial security is built on a foundation of absolute trust. At Finnovative Financial Solutions ("Finnovative", "we", "us", or "our"), we hold your privacy and data autonomy in the highest regard. This policy details how we collect, safeguard, process, and respect the details shared across our wealth advisory desk, calculators, and offline offices.
                  </p>

                  <section className="space-y-3">
                    <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                      <span className="text-emerald-600">1.</span> Information Collection & KYC Compliance
                    </h3>
                    <p>
                      To distribute regulated financial products in India, such as mutual funds, we are statutory-bound to fulfill Know Your Customer (KYC) mandates. We collect:
                    </p>
                    <ul className="list-disc pl-5 space-y-1.5 text-slate-600">
                      <li>
                        <strong>Identities:</strong> {highlightText("Full legal name, date of birth, and gender as recorded in state archives.", searchQuery)}
                      </li>
                      <li>
                        <strong>Tax & Registry Keys:</strong> {highlightText("Permanent Account Number (PAN), Aadhaar Number, and Central-KYC (CKYC) registry keys.", searchQuery)}
                      </li>
                      <li>
                        <strong>Contact Details:</strong> {highlightText("Secure email addresses, active telephone numbers, and billing/communication addresses.", searchQuery)}
                      </li>
                      <li>
                        <strong>Financial Accounts:</strong> {highlightText("Verified banking details (such as account numbers and IFSC keys) to enable direct subscription with Mutual Fund AMCs.", searchQuery)}
                      </li>
                      <li>
                        <strong>Special Disclosures:</strong> {highlightText("Physical medical conditions and lifestyle records, strictly used for securing high-value Insurance Solicitation with underwriting partners.", searchQuery)}
                      </li>
                    </ul>
                  </section>

                  <section className="space-y-3">
                    <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                      <span className="text-emerald-600">2.</span> Intended Use of Private Data
                    </h3>
                    <p>
                      The processed data is restricted solely to fulfilling operational requirements under regulatory guidelines. Specifically:
                    </p>
                    <ul className="list-disc pl-5 space-y-1 text-slate-600">
                      <li>{highlightText("Facilitating your investments directly with SEBI-authorized Asset Management Companies.", searchQuery)}</li>
                      <li>{highlightText("Forwarding life and health insurance applications to accredited corporate underwriters.", searchQuery)}</li>
                      <li>{highlightText("Providing customized wealth projection outputs based on your active interactions with our calculators.", searchQuery)}</li>
                      <li>{highlightText("Reaching out to fulfill direct advisory, physical consultations, and emergency portfolio rebalancing requests.", searchQuery)}</li>
                    </ul>
                  </section>

                  <section className="space-y-3">
                    <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                      <span className="text-emerald-600">3.</span> Data Sovereignty & Isolation Policy
                    </h3>
                    <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/60 flex items-start gap-3">
                      <Lock className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-bold text-xs text-slate-900 uppercase tracking-wider font-mono">Zero Third-Party Commercialization</h4>
                        <p className="text-xs text-slate-600 mt-1">
                          We {highlightText("never sell, lease, or distribute your email, contact log, or investment patterns", searchQuery)} to third-party telemarketers, brokers, or data brokers. Your files remain stored in secure systems.
                        </p>
                      </div>
                    </div>
                  </section>

                  <section className="space-y-3">
                    <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                      <span className="text-emerald-600">4.</span> Regulatory Sharing Disclosures
                    </h3>
                    <p>
                      In alignment with AMFI, IRDAI, and SEBI directives, your data may be shared with designated statutory intermediaries who perform central database services:
                    </p>
                    <ul className="list-disc pl-5 space-y-1 text-slate-600 font-mono text-xs">
                      <li>CAMS (Computer Age Management Services)</li>
                      <li>KFintech (KFin Technologies Private Limited)</li>
                      <li>Authorised insurance companies soliciting your policies</li>
                      <li>SEBI or IRDAI auditors under statutory enforcement rules</li>
                    </ul>
                  </section>

                  <section className="space-y-3">
                    <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                      <span className="text-emerald-600">5.</span> Data Retention & Erasure Rights
                    </h3>
                    <p>
                      Under SEBI and AMFI guidelines, financial intermediaries must retain record audits for a minimum period (typically 5-7 years post-termination of relationship). If you wish to cease relationships:
                    </p>
                    <p className="text-slate-600">
                      You may send a direct deletion request to our Grievance Desk. We will delete all personal contacts and digital cookie records from our servers immediately, except for statutory transactions required by Indian financial law.
                    </p>
                  </section>

                  <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-50 p-4 rounded-2xl">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-xl bg-emerald-100 text-emerald-800">
                        <Mail className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="font-bold text-xs text-slate-900">Privacy & Grievance Desk</h4>
                        <p className="text-xs text-slate-500">finnovativefinancialsolutions@gmail.com</p>
                      </div>
                    </div>
                    <button 
                      id="contact-grievance-btn"
                      onClick={() => {
                        onBackToHome();
                        setTimeout(() => {
                          const contactEl = document.getElementById('contact');
                          if (contactEl) {
                            contactEl.scrollIntoView({ behavior: 'smooth' });
                          }
                        }, 200);
                      }}
                      className="px-3.5 py-1.5 bg-slate-900 text-white font-semibold text-xs rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
                    >
                      Connect with Officer
                    </button>
                  </div>
                </motion.div>
              )}

              {activeTab === 'terms' && (
                <motion.div
                  key="terms-doc"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-6 text-slate-700 text-sm leading-relaxed"
                >
                  <div className="flex flex-wrap items-center justify-between border-b border-slate-100 pb-4 gap-2">
                    <div>
                      <h2 className="text-xl sm:text-2xl font-bold text-slate-950 font-display">
                        Terms of Service
                      </h2>
                      <p className="text-xs text-slate-400 mt-1">
                        Revised: June 2026 &bull; Version 1.9
                      </p>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-cyan-50 text-cyan-700 font-mono text-[10px] font-bold">
                      ⚖️ USER AGREEMENT
                    </span>
                  </div>

                  <p className="italic text-slate-500">
                    Welcome to Finnovative Financial Solutions. By interacting with our digital wealth estimators, subscribing to mutual funds, or soliciting insurance policies, you legally agree to the terms listed below. Please read carefully.
                  </p>

                  <section className="space-y-3">
                    <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                      <span className="text-cyan-600">1.</span> Professional Status as a Distributor
                    </h3>
                    <p>
                      Finnovative acts as an {highlightText("AMFI Registered Mutual Fund Distributor (ARN-23483321)", searchQuery)}. We do not direct direct advisory schemes without referral disclosures:
                    </p>
                    <ul className="list-disc pl-5 space-y-1 text-slate-600">
                      <li>We distribute regular plans of Mutual Fund schemes and receive distribution commissions from Asset Management Companies as legally permitted by SEBI.</li>
                      <li>Any calculations, estimates, or models generated by our SIP or Lumpsum calculators do not constitute a legal guarantee of performance.</li>
                    </ul>
                  </section>

                  <section className="space-y-3">
                    <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                      <span className="text-cyan-600">2.</span> Calculator Estimates and Wealth Models
                    </h3>
                    <p>
                      All computational projections shown on this platform are {highlightText("purely illustrative and mathematical", searchQuery)}:
                    </p>
                    <ul className="list-disc pl-5 space-y-1 text-slate-600">
                      <li>Mutual funds are subject to macro-market risks. Past performance does not assure future capital growth.</li>
                      <li>The inflation-adjusted calculators (FIRE & ELSS Tax) use standard indexation estimates and historical CAGR, which are subject to variations in future monetary policy.</li>
                    </ul>
                  </section>

                  <section className="space-y-3">
                    <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                      <span className="text-cyan-600">3.</span> Solicitations and Underwriting Boundaries
                    </h3>
                    <div className="p-4 bg-amber-50 rounded-xl border border-amber-200/60 flex items-start gap-3 text-amber-900">
                      <AlertTriangle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-bold text-xs uppercase tracking-wider font-mono">Insurance Solicitation Warning</h4>
                        <p className="text-xs text-amber-800 mt-1">
                          Insurance is the subject matter of solicitation. Premium quotes generated by our estimators are indicative. Underwriters require physical or digital medical tests, and they retain full legal authority to accept, modify, load, or reject any policy proposal.
                        </p>
                      </div>
                    </div>
                  </section>

                  <section className="space-y-3">
                    <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                      <span className="text-cyan-600">4.</span> Limit of Liability
                    </h3>
                    <p className="text-slate-600">
                      Finnovative, its founders, and affiliates will not be liable for any financial losses or opportunity costs incurred directly or indirectly by relying on this application's calculators. Users are encouraged to combine digital estimates with formal customized plans.
                    </p>
                  </section>

                  <section className="space-y-3">
                    <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                      <span className="text-cyan-600">5.</span> Jurisdictional Authority
                    </h3>
                    <p className="text-slate-600">
                      These terms are governed exclusively by the laws of India. Any litigation, dispute, or discrepancy is subject to the exclusive jurisdiction of the competent courts in {highlightText("Vadodara, Gujarat, India", searchQuery)}.
                    </p>
                  </section>
                </motion.div>
              )}

              {activeTab === 'compliance' && (
                <motion.div
                  key="compliance-doc"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-6 text-slate-700 text-sm leading-relaxed"
                >
                  <div className="flex flex-wrap items-center justify-between border-b border-slate-100 pb-4 gap-2">
                    <div>
                      <h2 className="text-xl sm:text-2xl font-bold text-slate-950 font-display">
                        Regulatory Disclaimers & AMFI Credentials
                      </h2>
                      <p className="text-xs text-slate-400 mt-1">
                        Audit Cycle: FY 2026-27 &bull; Last Verified
                      </p>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-purple-50 text-purple-700 font-mono text-[10px] font-bold">
                      📑 COMPLIANCE STATUS: ACTIVE
                    </span>
                  </div>

                  <p className="italic text-slate-500">
                    Finnovative Financial Solutions acts in complete alignment with regulatory disclosures required by SEBI, AMFI, and IRDAI. Our registrations are current and verified.
                  </p>

                  {/* Highlight box of Credentials */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                      <div className="flex items-center gap-2 mb-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <h4 className="font-bold text-xs text-slate-900 uppercase font-mono">Mutual Fund ARN</h4>
                      </div>
                      <p className="text-xs text-slate-600">
                        <strong>ID:</strong> ARN-23483321 <br />
                        <strong>Registrant:</strong> Finnovative Financial Solutions <br />
                        <strong>Valid thru:</strong> Dec 2031 <br />
                        <strong>Authority:</strong> Association of Mutual Funds in India (AMFI).
                      </p>
                    </div>

                    <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                      <div className="flex items-center gap-2 mb-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <h4 className="font-bold text-xs text-slate-900 uppercase font-mono">Corporate Referral Agent</h4>
                      </div>
                      <p className="text-xs text-slate-600">
                        <strong>ID:</strong> CA09483321 <br />
                        <strong>Authorized Partner:</strong> National Insurers <br />
                        <strong>Valid thru:</strong> Oct 2029 <br />
                        <strong>Authority:</strong> Insurance Regulatory and Development Authority (IRDAI).
                      </p>
                    </div>
                  </div>

                  <section className="space-y-3">
                    <h3 className="text-base font-bold text-slate-900">
                      AMFI Best Practice Guidelines (MFD Circulars)
                    </h3>
                    <p className="text-slate-600">
                      Under SEBI (Mutual Funds) Regulations, 1996, distributors must present all investment alternatives fairly. Finnovative {highlightText("distributes Regular Schemes of Mutual Funds", searchQuery)} which contain built-in commissions to support advisory operations, portfolio review, and automated tracking infrastructure.
                    </p>
                    <p className="text-slate-600">
                      Commission details for specific asset management plans are fully transparent and will be furnished immediately upon written email request.
                    </p>
                  </section>

                  <section className="space-y-3">
                    <h3 className="text-base font-bold text-slate-900">
                      SEBI Investment Advisers (IA) Referrals
                    </h3>
                    <p className="text-slate-600">
                      For clients seeking custom discretionary portfolio management services (PMS) or direct fee-only advisory plans, Finnovative acts as a {highlightText("referral partner to SEBI Registered Investment Advisers", searchQuery)}. We do not charge direct advisory fees to the client for referral mappings.
                    </p>
                  </section>

                  <div className="p-4 bg-slate-950 text-white rounded-xl space-y-2">
                    <h4 className="font-mono text-xs uppercase text-emerald-400 font-bold">Registered Corporate Address</h4>
                    <div className="text-xs text-slate-300 space-y-1 leading-relaxed">
                      <p className="flex items-center gap-2">
                        <MapPin className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                        <span>A 710, Samanvay Sonorous, Beside Gujarat Kidney Hospital, Jetalpur Road, Alkapuri, Vadodara - 390007</span>
                      </p>
                      <p className="flex items-center gap-2">
                        <Phone className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                        <span>+91 84607 81171</span>
                      </p>
                      <p className="flex items-center gap-2">
                        <Mail className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                        <span>finnovativefinancialsolutions@gmail.com</span>
                      </p>
                    </div>
                  </div>

                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>

      </div>
    </div>
  );
}
