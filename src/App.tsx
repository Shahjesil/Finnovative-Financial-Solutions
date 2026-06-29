/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import MutualFunds from './components/MutualFunds';
import Insurance from './components/Insurance';
import Calculators from './components/Calculators';
import Faqs from './components/Faqs';
import Contact from './components/Contact';
import Footer from './components/Footer';
import PrivacyPolicy from './components/PrivacyPolicy';

export default function App() {
  const [activeSection, setActiveSection] = useState('hero');
  
  // State for navigating to legal documents
  const [legalDocument, setLegalDocument] = useState<'privacy' | 'terms' | 'compliance' | null>(null);
  
  // States for pre-filling consultation form from actions
  const [preFilledService, setPreFilledService] = useState<'Mutual Fund' | 'Insurance' | 'Comprehensive Wealth Management' | 'Other' | null>(null);
  const [preFilledMessage, setPreFilledMessage] = useState('');

  // Handle manual navigation scrolling
  const handleNavigate = (sectionId: string) => {
    setLegalDocument(null);
    setTimeout(() => {
      const el = document.getElementById(sectionId);
      if (el) {
        // Calculate offset for fixed navbar
        const navbarOffset = 70;
        const elementPosition = el.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - navbarOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
        setActiveSection(sectionId);
      }
    }, 100);
  };

  // Pre-fill fields from active cards and scroll to contact form
  const handlePreFillContact = (
    service: 'Mutual Fund' | 'Insurance' | 'Comprehensive Wealth Management',
    message: string
  ) => {
    setPreFilledService(service);
    setPreFilledMessage(message);
    
    // Scroll down to the contact form section
    setTimeout(() => {
      handleNavigate('contact');
    }, 100);
  };

  const handleClearPreFill = () => {
    setPreFilledService(null);
    setPreFilledMessage('');
  };

  // Scroll Listener / Intersection Observer to automatically highlight active section
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'mutual-funds', 'insurance', 'calculators', 'faqs', 'contact'];
      const scrollPosition = window.scrollY + 120; // offset factor

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div id="app-root" className="min-h-screen bg-slate-50 flex flex-col justify-between">
      {/* Dynamic Header */}
      <Navbar onNavigate={handleNavigate} activeSection={activeSection} />

      {/* Reassuring floating prompt when a user has pre-filled action from a card */}
      {preFilledService && (
        <div
          id="prefill-sticky-notification"
          className="fixed bottom-6 right-6 z-40 max-w-sm bg-emerald-900 text-white rounded-2xl p-4 shadow-xl border border-emerald-800 flex flex-col gap-2.5 animate-bounce-short"
        >
          <div className="flex items-start justify-between gap-2">
            <div className="flex gap-2">
              <span className="text-emerald-300 mt-0.5">📊</span>
              <div>
                <h5 className="font-display font-bold text-xs text-white uppercase tracking-wider">
                  Consultation Configured!
                </h5>
                <p className="text-[10px] text-emerald-100 leading-snug mt-0.5">
                  We prefilled your choices for <strong>{preFilledService}</strong>. Scroll down or tap to submit.
                </p>
              </div>
            </div>
            <button
              id="prefill-close-btn"
              onClick={handleClearPreFill}
              className="text-emerald-300 hover:text-white font-bold text-xs p-1"
              title="Clear Prefills"
            >
              &times;
            </button>
          </div>
          <button
            id="prefill-scroll-cta-btn"
            onClick={() => handleNavigate('contact')}
            className="w-full text-center py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-600 text-white font-semibold text-[10px] transition-colors cursor-pointer"
          >
            Review Prefilled Booking Now &darr;
          </button>
        </div>
      )}

      {/* Main Content Sections */}
      <main className="flex-1">
        {legalDocument ? (
          <PrivacyPolicy 
            initialTab={legalDocument} 
            onBackToHome={() => setLegalDocument(null)} 
          />
        ) : (
          <>
            {/* Home Welcome */}
            <Hero onNavigate={handleNavigate} />

            {/* Mutual Funds section */}
            <MutualFunds onPreFillContact={handlePreFillContact} />

            {/* Insurance section */}
            <Insurance onPreFillContact={handlePreFillContact} />

            {/* All Wealth Calculators */}
            <Calculators onPreFillContact={handlePreFillContact} />

            {/* Categorized FAQs */}
            <Faqs />

            {/* Consultation Scheduler and DB Leads */}
            <Contact
              preFilledService={preFilledService}
              preFilledMessage={preFilledMessage}
              onClearPreFill={handleClearPreFill}
            />
          </>
        )}
      </main>

      {/* Footer */}
      <Footer onSelectDocument={(doc) => setLegalDocument(doc)} />
    </div>
  );
}
