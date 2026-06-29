/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { HelpCircle, ChevronDown, ChevronUp, BookOpen, Lightbulb } from 'lucide-react';
import { FAQItem } from '../types';

export default function Faqs() {
  const [activeCategory, setActiveCategory] = useState<'General' | 'Mutual Funds' | 'Insurance'>('General');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const faqItems: FAQItem[] = [
    // General
    {
      id: 'gen-1',
      category: 'General',
      question: 'Who are Finnovative Financial Solutions and how do you operate?',
      answer: 'We are a certified, transparent, data-driven financial advisory. We build customized, goal-centric portfolios combining highly rated Direct Mutual Funds (which save you high intermediary cuts) and iron-clad insurance safety frameworks. We operate with absolute advisory clarity—zero hidden transaction lock-ins, and zero conflict of interest.'
    },
    {
      id: 'gen-2',
      category: 'General',
      question: 'How do I start my relationship with Finnovative?',
      answer: 'It begins with our simple Consultation form. After inputting your goals, current age, and protective requirements, we schedule a free 1-on-1 session to run a thorough layout audit of any existing investment instruments, pinpointing optimization areas and asset reallocations.'
    },
    {
      id: 'gen-3',
      category: 'General',
      question: 'Are there any hidden fees or commission reductions?',
      answer: 'Absolutely not. For Mutual Funds, we recommend Direct Schemes instead of Regular Schemes, allowing clients to save up to 1% annually in recurring broker cuts. For Insurance, we source rates directly from leading carriers, passing all direct corporate discounts onto your premium schedule.'
    },
    // Mutual Funds
    {
      id: 'mf-1',
      category: 'Mutual Funds',
      question: 'What is the main difference between a SIP and a Lumpsum investment?',
      answer: 'An SIP (Systematic Investment Plan) allows you to compound small, regular amounts monthly, benefiting from rupee-cost averaging (buying more units when prices are low and fewer when high). Lumpsum is a single one-time allocation best suited when you receive bonuses, inheritance, or capital gains.'
    },
    {
      id: 'mf-2',
      category: 'Mutual Funds',
      question: 'Can I stop, pause, or increase my SIP contributions at any time?',
      answer: 'Yes! All direct SIP plans designed by Finnovative are fully flexible. You can pause, modify the monthly amount, cancel, or make extra lumpsum top-ups on the fly with zero penalties or structural lock-in delays.'
    },
    {
      id: 'mf-3',
      category: 'Mutual Funds',
      question: 'What are ELSS Tax Saving funds and how do they benefit me?',
      answer: 'ELSS (Equity Linked Savings Scheme) is a specific mutual fund category that lets you deduct up to ₹1,500,000 from your taxable income under Sec 80C. It offers a shorter lock-in of only 3 years compared to PPF (15 years) or tax-saver bank FDs (5 years), while historically yielding much higher equity compounding returns.'
    },
    // Insurance
    {
      id: 'ins-1',
      category: 'Insurance',
      question: 'Why do you recommend Term Life Insurance instead of standard Endowment/money-back plans?',
      answer: 'Endowment policies combine insurance and low-interest savings, leading to high premiums and severely low coverages. Term Life is pure protection: for a tiny annual premium, you secure a huge coverage (₹1 Cr to ₹5 Cr), allowing your family to maintain their standard of living without compromise.'
    },
    {
      id: 'ins-2',
      category: 'Insurance',
      question: 'What is the "No Room Rent Cap" and "Copay" clause in Health Insurance?',
      answer: 'Many standard health insurance policies capping room rent to 1% of the sum assured, forcing you to pay huge balance out-of-pocket bills. "Zero Copay" ensures the insurer settles 100% of valid medical claims without requiring you to share the bill. Finnovative recommends premium policies that feature zero room capping and zero copays.'
    },
    {
      id: 'ins-3',
      category: 'Insurance',
      question: 'How do you assist with the insurance claim settlement process?',
      answer: 'We have a dedicated 24/7 Claim Support Desk. If an emergency occurs, our operations team coordinates directly with the TPA (Third Party Administrator) and hospital desks to trigger cashless authorizations, managing all documentation so you can focus entirely on recovery.'
    }
  ];

  const filteredFaqs = faqItems.filter(item => item.category === activeCategory);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section id="faqs" className="py-24 bg-slate-50 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-sm font-semibold text-emerald-600 uppercase tracking-widest font-mono">
            Support & Clarity
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-display font-bold text-slate-900 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-slate-600 text-sm">
            Knowledge is the first step of wealth security. Read our candid, direct responses regarding systematic compounding and risk shields.
          </p>
        </div>

        {/* Categories Selector */}
        <div className="flex justify-center gap-2 mb-10 overflow-x-auto pb-2">
          {(['General', 'Mutual Funds', 'Insurance'] as const).map((cat) => (
            <button
              key={cat}
              id={`faq-tab-${cat.replace(/\s+/g, '-')}`}
              onClick={() => {
                setActiveCategory(cat);
                setExpandedId(null);
              }}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold border transition-all cursor-pointer whitespace-nowrap ${
                activeCategory === cat
                  ? 'bg-emerald-900 border-emerald-950 text-white shadow-md shadow-emerald-900/10'
                  : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {filteredFaqs.map((faq) => {
            const isExpanded = expandedId === faq.id;
            return (
              <div
                key={faq.id}
                id={`faq-item-${faq.id}`}
                className={`bg-white rounded-2xl border transition-all duration-300 ${
                  isExpanded ? 'border-emerald-200 shadow-md shadow-slate-100' : 'border-slate-100 hover:border-slate-200'
                }`}
              >
                <button
                  id={`faq-btn-${faq.id}`}
                  onClick={() => toggleExpand(faq.id)}
                  className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 cursor-pointer focus:outline-hidden"
                >
                  <span className="font-display font-bold text-slate-900 text-sm sm:text-base pr-2 leading-snug">
                    {faq.question}
                  </span>
                  <div className={`p-1.5 rounded-lg shrink-0 transition-colors ${isExpanded ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-50 text-slate-400'}`}>
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      id={`faq-answer-wrapper-${faq.id}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                      className="overflow-hidden border-t border-slate-50"
                    >
                      <div className="px-6 pb-6 pt-4 text-xs sm:text-sm text-slate-600 leading-relaxed bg-slate-50/40">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Quick Help Card */}
        <div className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-emerald-900 to-teal-900 text-white flex flex-col sm:flex-row gap-5 items-center justify-between">
          <div className="flex gap-4 items-start text-center sm:text-left">
            <div className="hidden sm:flex p-3 rounded-xl bg-white/10 text-emerald-300">
              <Lightbulb className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-display font-semibold text-base">
                Have a highly custom portfolio scenario?
              </h4>
              <p className="text-xs text-emerald-100/70 mt-1 max-w-md">
                Get specialized, bespoke feedback regarding joint accounts, NRI tax implications, trust properties, or premium high-value life insurance keys.
              </p>
            </div>
          </div>
          <a
            href="#contact"
            id="faq-help-cta"
            className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white font-bold text-xs transition-colors shrink-0 whitespace-nowrap"
          >
            Consult Our Experts
          </a>
        </div>

      </div>
    </section>
  );
}
