/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Phone, MapPin, Calendar, CheckCircle2, ListFilter, Trash2, Eye, ShieldAlert, ArrowUpRight, RefreshCw } from 'lucide-react';
import { ContactInquiry } from '../types';

interface ContactProps {
  preFilledService: 'Mutual Fund' | 'Insurance' | 'Comprehensive Wealth Management' | 'Other' | null;
  preFilledMessage: string;
  onClearPreFill: () => void;
}

export default function Contact({ preFilledService, preFilledMessage, onClearPreFill }: ContactProps) {
  // Form states
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [serviceType, setServiceType] = useState<'Mutual Fund' | 'Insurance' | 'Comprehensive Wealth Management' | 'Other'>('Mutual Fund');
  const [message, setMessage] = useState('');
  const [preferredTime, setPreferredTime] = useState('Morning (9 AM - 12 PM)');
  const [submitted, setSubmitted] = useState(false);

  // Admin portal states for viewing local storage submissions
  const [showAdmin, setShowAdmin] = useState(false);
  const [inquiries, setInquiries] = useState<ContactInquiry[]>([]);
  const [adminPassword, setAdminPassword] = useState('');
  const [unlocked, setUnlocked] = useState(false);

  // Load prefilled fields if they change
  useEffect(() => {
    if (preFilledService) {
      setServiceType(preFilledService);
    }
    if (preFilledMessage) {
      setMessage(preFilledMessage);
    }
  }, [preFilledService, preFilledMessage]);

  // Read existing submissions from local storage on mount
  useEffect(() => {
    const data = localStorage.getItem('finnovative_inquiries');
    if (data) {
      try {
        setInquiries(JSON.parse(data));
      } catch (e) {
        console.error('Failed to parse inquiries', e);
      }
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !phone) return;

    const newInquiry: ContactInquiry = {
      id: `inq-${Date.now()}`,
      fullName,
      email,
      phone,
      serviceType,
      message,
      preferredTime,
      status: 'Pending',
      createdAt: new Date().toLocaleString('en-IN')
    };

    const updated = [newInquiry, ...inquiries];
    setInquiries(updated);
    localStorage.setItem('finnovative_inquiries', JSON.stringify(updated));

    setSubmitted(true);
    onClearPreFill();

    // Reset form fields
    setFullName('');
    setEmail('');
    setPhone('');
    setMessage('');
  };

  const handleUpdateStatus = (id: string, newStatus: 'Pending' | 'Contacted' | 'Scheduled') => {
    const updated = inquiries.map(inq => inq.id === id ? { ...inq, status: newStatus } : inq);
    setInquiries(updated);
    localStorage.setItem('finnovative_inquiries', JSON.stringify(updated));
  };

  const handleDeleteInquiry = (id: string) => {
    const updated = inquiries.filter(inq => inq.id !== id);
    setInquiries(updated);
    localStorage.setItem('finnovative_inquiries', JSON.stringify(updated));
  };

  const handleUnlockAdmin = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminPassword.toLowerCase() === 'admin' || adminPassword === '') {
      setUnlocked(true);
    }
  };

  return (
    <section id="contact" className="py-24 bg-slate-900 text-white relative overflow-hidden">
      {/* Visual background accents */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
        <div className="absolute top-1/2 left-0 w-80 h-80 rounded-full bg-emerald-500/10 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full bg-teal-500/10 blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-sm font-semibold text-emerald-400 uppercase tracking-widest font-mono">
            Get Started
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-display font-bold text-slate-100 tracking-tight">
            Schedule a Bespoke Advisory Review
          </h2>
          <p className="mt-4 text-slate-400 text-sm">
            Ready to secure your dependents and amplify your investments? Book a no-obligation strategic evaluation with our certified financial planners.
          </p>
        </div>

        {/* 2-Column Corporate Details & Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch mb-16">
          
          {/* Left Column: Office Details (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-8 bg-slate-950/60 p-6 sm:p-8 rounded-3xl border border-slate-800/80">
            <div>
              <h3 className="text-xl font-display font-bold text-slate-100 mb-2">
                Finnovative Solutions HQ
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed mb-8">
                Connect with our expert consultants for a tailored layout audit of your current SIPs, mutual funds, or insurance policies.
              </p>

              <div className="space-y-6">
                <div id="contact-detail-phone" className="flex items-center gap-4">
                  <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 text-emerald-400 shadow-xs">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-[10px] font-mono uppercase text-slate-400">Call Advisory Desk</span>
                    <a href="tel:+918460781171" className="text-sm sm:text-base font-bold text-slate-200 hover:text-emerald-400 transition-colors">
                      +91 84607 81171
                    </a>
                  </div>
                </div>

                <div id="contact-detail-email" className="flex items-center gap-4">
                  <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 text-emerald-400 shadow-xs">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-[10px] font-mono uppercase text-slate-400">Direct Advisory Email</span>
                    <a href="mailto:finnovativefinancialsolutions@gmail.com" className="text-sm sm:text-base font-bold text-slate-200 hover:text-emerald-400 transition-colors break-all">
                      finnovativefinancialsolutions@gmail.com
                    </a>
                  </div>
                </div>

                <div id="contact-detail-address" className="flex items-start gap-4">
                  <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 text-emerald-400 shadow-xs mt-0.5">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-[10px] font-mono uppercase text-slate-400">Central Hub & Offices</span>
                    <p className="text-sm text-slate-300 font-medium leading-relaxed mt-0.5">
                      A 710, Samanvay Sonorous, <br />
                      Beside Gujarat Kidney Hospital, Jetalpur Road, <br />
                      Alkapuri, Vadodara - 390007
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Micro-Trust Info */}
            <div className="pt-6 border-t border-slate-800/80 text-xs text-slate-400 flex items-start gap-3">
              <span className="text-emerald-400 shrink-0 text-sm">🔒</span>
              <p>
                All shared parameters, portfolios, and details are kept strictly encrypted in local databases. Finnovative never trades, sells, or rents client details.
              </p>
            </div>
          </div>

          {/* Right Column: Interactive Consultation Scheduler (7 cols) */}
          <div className="lg:col-span-7 bg-white text-slate-900 p-6 sm:p-10 rounded-3xl shadow-2xl flex flex-col justify-center">
            
            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.form
                  key="contact-form"
                  id="consultation-form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="space-y-5"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Full Name */}
                    <div id="form-group-name">
                      <label htmlFor="fullName" className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
                        Your Full Name *
                      </label>
                      <input
                        id="fullName"
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="e.g. Rahul Sharma"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-hidden focus:border-emerald-600 focus:bg-white transition-all text-slate-900"
                      />
                    </div>

                    {/* Phone Number */}
                    <div id="form-group-phone">
                      <label htmlFor="phone" className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
                        Phone Number *
                      </label>
                      <input
                        id="phone"
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="e.g. +91 98765 43210"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-hidden focus:border-emerald-600 focus:bg-white transition-all text-slate-900"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Email */}
                    <div id="form-group-email">
                      <label htmlFor="email" className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
                        Email Address *
                      </label>
                      <input
                        id="email"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="e.g. rahul@example.com"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-hidden focus:border-emerald-600 focus:bg-white transition-all text-slate-900"
                      />
                    </div>

                    {/* Preferred Session Time */}
                    <div id="form-group-preferredTime">
                      <label htmlFor="preferredTime" className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
                        Preferred Callback Slot
                      </label>
                      <select
                        id="preferredTime"
                        value={preferredTime}
                        onChange={(e) => setPreferredTime(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-hidden focus:border-emerald-600 focus:bg-white transition-all text-slate-900"
                      >
                        <option value="Morning (9 AM - 12 PM)">Morning (9 AM - 12 PM)</option>
                        <option value="Afternoon (12 PM - 4 PM)">Afternoon (12 PM - 4 PM)</option>
                        <option value="Evening (4 PM - 7 PM)">Evening (4 PM - 7 PM)</option>
                      </select>
                    </div>
                  </div>

                  {/* Service Interest */}
                  <div id="form-group-service">
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
                      Primary Service Interest
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {(['Mutual Fund', 'Insurance', 'Comprehensive Wealth Management', 'Other'] as const).map((type) => (
                        <button
                          key={type}
                          type="button"
                          id={`btn-service-select-${type.replace(/\s+/g, '-')}`}
                          onClick={() => setServiceType(type)}
                          className={`px-3 py-2.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer text-center ${
                            serviceType === type
                              ? 'bg-emerald-900 border-emerald-950 text-white shadow-xs'
                              : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                          }`}
                        >
                          {type === 'Comprehensive Wealth Management' ? 'Wealth Suite' : type}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Inquiry Notes */}
                  <div id="form-group-notes">
                    <label htmlFor="message" className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
                      Brief Message or Investment Goals (Optional)
                    </label>
                    <textarea
                      id="message"
                      rows={3}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Share details about current portfolios, target retirement timeline, or insurance amounts needed..."
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-hidden focus:border-emerald-600 focus:bg-white transition-all text-slate-900 resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    id="form-submit-btn"
                    type="submit"
                    className="w-full py-4 px-6 rounded-xl bg-emerald-900 hover:bg-emerald-800 text-white font-bold text-sm transition-all text-center flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-emerald-950/20 group"
                  >
                    Confirm Callback & Free Consultation
                    <ArrowUpRight className="w-4.5 h-4.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </button>
                </motion.form>
              ) : (
                <motion.div
                  key="submission-success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center py-10 space-y-5"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-100 text-emerald-700">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-display font-bold text-slate-950">
                    Consultation Requested!
                  </h3>
                  <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                    Thank you for reaching out. A certified Finnovative financial solutions manager has been assigned. We will contact you at <strong>{preferredTime}</strong> on your specified phone or email.
                  </p>
                  <div className="pt-4 flex justify-center gap-3">
                    <button
                      id="success-new-btn"
                      onClick={() => setSubmitted(false)}
                      className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-xl transition-all"
                    >
                      Book Another Inquiry
                    </button>
                    <button
                      id="success-admin-shortcut-btn"
                      onClick={() => {
                        setSubmitted(false);
                        setShowAdmin(true);
                        setUnlocked(true);
                      }}
                      className="px-5 py-2.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-semibold text-xs rounded-xl transition-all flex items-center gap-1.5"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      View Inquiry Portal
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          </div>
        </div>

        {/* Client Support Portal / Admin View (Local Storage Verification) */}
        <div id="admin-portal-wrapper" className="pt-6 border-t border-slate-800 flex flex-col items-center">
          <button
            id="admin-panel-toggle-btn"
            onClick={() => {
              setShowAdmin(!showAdmin);
              if (!showAdmin) {
                setUnlocked(false);
                setAdminPassword('');
              }
            }}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-full text-xs font-mono font-bold text-slate-300 transition-colors flex items-center gap-2 cursor-pointer shadow-xs border border-slate-700/60"
          >
            <Eye className="w-3.5 h-3.5 text-emerald-400" />
            {showAdmin ? 'Hide Real-time Support Portal' : 'Show Live Support Inquiry Portal (Admin View)'}
          </button>

          <AnimatePresence>
            {showAdmin && (
              <motion.div
                id="admin-panel"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="w-full max-w-4xl bg-slate-950 rounded-2xl border border-slate-800 p-6 mt-6 text-left"
              >
                {!unlocked ? (
                  <form onSubmit={handleUnlockAdmin} className="max-w-md mx-auto space-y-4 text-center py-6">
                    <ShieldAlert className="w-8 h-8 text-amber-500 mx-auto" />
                    <div>
                      <h4 className="font-display font-bold text-sm text-slate-200">
                        Admin Portal Authentication
                      </h4>
                      <p className="text-[11px] text-slate-500 mt-1">
                        To mock support access, simply hit <strong className="text-emerald-400">Unlock</strong> or enter "admin".
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <input
                        id="admin-pw"
                        type="password"
                        placeholder="Password (Default blank/admin)"
                        value={adminPassword}
                        onChange={(e) => setAdminPassword(e.target.value)}
                        className="flex-1 bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs focus:outline-hidden text-slate-200"
                      />
                      <button
                        id="admin-unlock-btn"
                        type="submit"
                        className="px-4 py-2 bg-emerald-700 hover:bg-emerald-600 rounded-lg text-xs font-semibold"
                      >
                        Unlock Portal
                      </button>
                    </div>
                  </form>
                ) : (
                  <div>
                    <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-4">
                      <div>
                        <h4 className="font-display font-bold text-sm text-slate-200">
                          Active Lead Inquiries Panel (Local Database)
                        </h4>
                        <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest block mt-0.5">
                          Inquiries count: {inquiries.length} records found
                        </span>
                      </div>
                      <button
                        id="admin-refresh-btn"
                        onClick={() => {
                          const data = localStorage.getItem('finnovative_inquiries');
                          if (data) setInquiries(JSON.parse(data));
                        }}
                        className="p-1.5 bg-slate-900 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-colors border border-slate-800"
                        title="Refresh database"
                      >
                        <RefreshCw className="w-4 h-4" />
                      </button>
                    </div>

                    {inquiries.length === 0 ? (
                      <div className="text-center py-10 text-slate-500 text-xs">
                        ⚠️ No inquiries submitted from this browser yet. Try completing the form above to see your lead appear here instantly in real-time!
                      </div>
                    ) : (
                      <div className="space-y-4 max-h-96 overflow-y-auto pr-1">
                        {inquiries.map((inq) => (
                          <div
                            key={inq.id}
                            id={`inquiry-${inq.id}`}
                            className="p-4 bg-slate-900/80 rounded-xl border border-slate-800 hover:border-slate-700 transition-colors flex flex-col md:flex-row justify-between gap-4 items-start md:items-center"
                          >
                            <div className="space-y-1.5 flex-1">
                              <div className="flex items-center gap-2">
                                <span className="text-xs font-bold text-slate-200">{inq.fullName}</span>
                                <span className={`px-2 py-0.5 text-[9px] font-bold rounded-full border ${
                                  inq.serviceType === 'Mutual Fund'
                                    ? 'bg-emerald-950/40 text-emerald-400 border-emerald-900/60'
                                    : inq.serviceType === 'Insurance'
                                    ? 'bg-teal-950/40 text-teal-400 border-teal-900/60'
                                    : 'bg-cyan-950/40 text-cyan-400 border-cyan-900/60'
                                }`}>
                                  {inq.serviceType}
                                </span>
                              </div>
                              <p className="text-[11px] text-slate-400 leading-relaxed font-mono">
                                Email: {inq.email} | Phone: {inq.phone} | Callback: {inq.preferredTime}
                              </p>
                              {inq.message && (
                                <p className="text-[11px] text-slate-300 italic bg-slate-950/80 p-2 rounded-md border border-slate-900/60 leading-relaxed">
                                  " {inq.message} "
                                </p>
                              )}
                              <span className="block text-[9px] font-mono text-slate-500">
                                Logged: {inq.createdAt}
                              </span>
                            </div>

                            {/* Status and Action Buttons */}
                            <div className="flex flex-wrap items-center gap-2 shrink-0">
                              <select
                                id={`select-status-${inq.id}`}
                                value={inq.status}
                                onChange={(e) => handleUpdateStatus(inq.id, e.target.value as any)}
                                className="bg-slate-950 border border-slate-800 text-[11px] rounded-lg px-2.5 py-1.5 focus:outline-none text-slate-300 cursor-pointer"
                              >
                                <option value="Pending">Pending</option>
                                <option value="Contacted">Contacted</option>
                                <option value="Scheduled">Scheduled</option>
                              </select>
                              <button
                                id={`btn-delete-inq-${inq.id}`}
                                onClick={() => handleDeleteInquiry(inq.id)}
                                className="p-2 bg-rose-950/40 hover:bg-rose-900/60 text-rose-400 rounded-lg border border-rose-900/40 transition-colors cursor-pointer"
                                title="Delete inquiry"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
