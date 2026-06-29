/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldCheck, TrendingUp, Menu, X, ArrowUpRight } from 'lucide-react';

interface NavbarProps {
  onNavigate: (sectionId: string) => void;
  activeSection: string;
}

export default function Navbar({ onNavigate, activeSection }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'hero', label: 'Home' },
    { id: 'mutual-funds', label: 'Mutual Funds' },
    { id: 'insurance', label: 'Insurance' },
    { id: 'calculators', label: 'Calculators' },
    { id: 'faqs', label: 'FAQs' },
    { id: 'contact', label: 'Contact Us' },
    { id: 'privacy-policy', label: 'Privacy Policy' }
  ];

  const handleLinkClick = (id: string) => {
    setIsOpen(false);
    onNavigate(id);
  };

  return (
    <nav
      id="main-nav"
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-100 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div
            id="nav-logo"
            onClick={() => handleLinkClick('hero')}
            className="flex items-center gap-2 cursor-pointer group"
          >
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-cyan-500 text-white shadow-md shadow-emerald-200 group-hover:scale-105 transition-transform duration-200">
              <TrendingUp className="w-5 h-5 absolute" />
              <ShieldCheck className="w-5 h-5 absolute translate-x-1 -translate-y-1 text-teal-100/40" />
            </div>
            <div>
              <span className="font-display font-extrabold text-xl tracking-tight bg-gradient-to-r from-slate-900 via-emerald-950 to-teal-900 bg-clip-text text-transparent">
                Finnovative
              </span>
              <span className="block text-[10px] font-mono font-medium uppercase tracking-widest text-emerald-600 -mt-1">
                Financial Solutions
              </span>
            </div>
          </div>

          {/* Desktop Links */}
          <div id="desktop-menu" className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              if (link.id === 'privacy-policy') {
                return (
                  <a
                    key={link.id}
                    id={`link-${link.id}`}
                    href="?page=privacy-policy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50 flex items-center gap-1 group"
                  >
                    {link.label}
                    <ArrowUpRight className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 transition-opacity" />
                  </a>
                );
              }
              return (
                <button
                  key={link.id}
                  id={`link-${link.id}`}
                  onClick={() => handleLinkClick(link.id)}
                  className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                    activeSection === link.id
                      ? 'text-emerald-700'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  {link.label}
                  {activeSection === link.id && (
                    <motion.div
                      layoutId="navbar-indicator"
                      className="absolute bottom-0 left-4 right-4 h-0.5 bg-emerald-600 rounded-full"
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Consultation CTA */}
          <div className="hidden md:block">
            <button
              id="nav-cta-btn"
              onClick={() => handleLinkClick('contact')}
              className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-emerald-900 hover:bg-emerald-800 text-white font-medium text-sm transition-all duration-200 hover:shadow-lg hover:shadow-emerald-900/15 group"
            >
              Get Free Consultation
              <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center">
            <button
              id="mobile-menu-toggle"
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-menu-drawer"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-white border-b border-slate-100 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-1">
              {navLinks.map((link) => {
                if (link.id === 'privacy-policy') {
                  return (
                    <a
                      key={link.id}
                      id={`mobile-link-${link.id}`}
                      href="?page=privacy-policy"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center justify-between px-4 py-3 rounded-xl text-base font-medium transition-colors text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                    >
                      <span>{link.label}</span>
                      <ArrowUpRight className="w-4 h-4 opacity-60" />
                    </a>
                  );
                }
                return (
                  <button
                    key={link.id}
                    id={`mobile-link-${link.id}`}
                    onClick={() => handleLinkClick(link.id)}
                    className={`block w-full text-left px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                      activeSection === link.id
                        ? 'bg-emerald-50 text-emerald-800'
                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                    }`}
                  >
                    {link.label}
                  </button>
                );
              })}
              <div className="pt-4 px-4">
                <button
                  id="mobile-nav-cta-btn"
                  onClick={() => handleLinkClick('contact')}
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-emerald-900 hover:bg-emerald-800 text-white font-medium text-base transition-colors"
                >
                  Get Free Consultation
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
