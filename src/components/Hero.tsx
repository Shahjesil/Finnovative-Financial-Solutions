/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { ArrowDown, TrendingUp, ShieldCheck, PieChart, Users, Award, Percent } from 'lucide-react';

interface HeroProps {
  onNavigate: (sectionId: string) => void;
}

export default function Hero({ onNavigate }: HeroProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100, damping: 20 } },
  };

  const stats = [
    { id: 'stat-aum', icon: PieChart, value: '₹4,500 Cr+', label: 'Assets Advised', color: 'from-emerald-500 to-teal-500' },
    { id: 'stat-users', icon: Users, value: '35,000+', label: 'Happy Families', color: 'from-teal-500 to-cyan-500' },
    { id: 'stat-claims', icon: Award, value: '99.2%', label: 'Claim Settlement', color: 'from-cyan-500 to-blue-500' },
    { id: 'stat-cagr', icon: Percent, value: '14.8%', label: 'Avg Equity CAGR', color: 'from-blue-500 to-emerald-500' },
  ];

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-50"
    >
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/10 w-96 h-96 rounded-full bg-emerald-100/40 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/10 w-[500px] h-[500px] rounded-full bg-cyan-100/30 blur-3xl" />
        {/* Subtle decorative grid lines */}
        <svg className="absolute inset-0 w-full h-full opacity-3" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center justify-center space-y-8"
        >
          {/* Badge */}
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-100/80 text-emerald-800 text-xs font-semibold tracking-wide uppercase"
          >
            <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
            Empowering Your Financial Future
            <ShieldCheck className="w-3.5 h-3.5 text-teal-600" />
          </motion.div>

          {/* Heading */}
          <motion.h1
            variants={itemVariants}
            className="max-w-4xl text-4xl sm:text-5xl md:text-6xl font-display font-extrabold tracking-tight text-slate-900 leading-tight sm:leading-none"
          >
            Smart Wealth Creation.<br />
            <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent">
              Bulletproof Protection.
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={itemVariants}
            className="max-w-2xl text-base sm:text-lg text-slate-600 leading-relaxed"
          >
            At <strong className="text-slate-900 font-semibold">Finnovative Financial Solutions</strong>, we combine data-backed Mutual Fund advisory with bespoke Insurance strategies to secure your family and scale your wealth.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-md pt-2"
          >
            <button
              id="hero-mf-btn"
              onClick={() => onNavigate('mutual-funds')}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-700 to-emerald-600 text-white font-medium shadow-lg shadow-emerald-700/20 hover:scale-102 transition-all duration-200"
            >
              <TrendingUp className="w-5 h-5" />
              Explore Mutual Funds
            </button>
            <button
              id="hero-ins-btn"
              onClick={() => onNavigate('insurance')}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3.5 rounded-2xl bg-white border border-slate-200 text-slate-700 font-medium hover:bg-slate-50 hover:border-slate-300 shadow-sm transition-all duration-200"
            >
              <ShieldCheck className="w-5 h-5 text-teal-600" />
              Secure Life & Health
            </button>
          </motion.div>

          {/* Stats Bar */}
          <motion.div
            variants={itemVariants}
            id="hero-stats-panel"
            className="w-full max-w-5xl grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 pt-12"
          >
            {stats.map((stat) => {
              const IconComponent = stat.icon;
              return (
                <div
                  key={stat.id}
                  id={stat.id}
                  className="bg-white/80 backdrop-blur-md p-5 rounded-2xl border border-slate-100 shadow-xs hover:shadow-md transition-shadow duration-300 text-left flex items-start gap-4"
                >
                  <div className={`p-3 rounded-xl bg-gradient-to-tr ${stat.color} text-white shrink-0 shadow-xs`}>
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block font-display font-bold text-xl sm:text-2xl text-slate-900 tracking-tight">
                      {stat.value}
                    </span>
                    <span className="block text-xs font-medium text-slate-500 tracking-wide uppercase mt-0.5">
                      {stat.label}
                    </span>
                  </div>
                </div>
              );
            })}
          </motion.div>

          {/* Scroll Down Hint */}
          <motion.div
            variants={itemVariants}
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
            onClick={() => onNavigate('mutual-funds')}
            className="hidden sm:flex flex-col items-center gap-1.5 cursor-pointer text-slate-400 hover:text-emerald-600 transition-colors duration-200 pt-8"
          >
            <span className="text-xs font-medium uppercase tracking-widest font-mono">
              Explore Our Solutions
            </span>
            <ArrowDown className="w-4 h-4" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
