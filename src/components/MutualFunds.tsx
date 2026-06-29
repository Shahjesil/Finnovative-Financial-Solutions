/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { TrendingUp, Coins, PiggyBank, Briefcase, Calendar, ShieldCheck, HelpCircle, CheckCircle } from 'lucide-react';

interface MutualFundsProps {
  onPreFillContact: (service: 'Mutual Fund', message: string) => void;
}

export default function MutualFunds({ onPreFillContact }: MutualFundsProps) {
  // Calculator state
  const [calcMode, setCalcMode] = useState<'SIP' | 'Lumpsum'>('SIP');
  const [investment, setInvestment] = useState<number>(calcMode === 'SIP' ? 10000 : 100000);
  const [expectedReturn, setExpectedReturn] = useState<number>(12);
  const [years, setYears] = useState<number>(10);

  // Sync state if calculation mode changes
  const handleModeChange = (mode: 'SIP' | 'Lumpsum') => {
    setCalcMode(mode);
    setInvestment(mode === 'SIP' ? 10000 : 100000);
  };

  // Perform compounding calculations
  const results = useMemo(() => {
    const r = expectedReturn / 100;
    let totalInvested = 0;
    let totalValue = 0;

    if (calcMode === 'SIP') {
      const monthlyRate = r / 12;
      const totalMonths = years * 12;
      totalInvested = investment * totalMonths;
      // Formula: P * [ ( (1 + i)^n - 1 ) / i ] * (1 + i)
      totalValue = investment * (((Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate) * (1 + monthlyRate));
    } else {
      totalInvested = investment;
      // Formula: P * (1 + r)^n
      totalValue = investment * Math.pow(1 + r, years);
    }

    const wealthGained = Math.max(0, totalValue - totalInvested);

    // Generate coordinate points for growth curve chart
    const dataPoints: { year: number; invested: number; value: number }[] = [];
    for (let i = 0; i <= years; i++) {
      let inv = 0;
      let val = 0;
      if (calcMode === 'SIP') {
        const m = i * 12;
        inv = investment * m;
        const monthlyRate = r / 12;
        val = m === 0 ? 0 : investment * (((Math.pow(1 + monthlyRate, m) - 1) / monthlyRate) * (1 + monthlyRate));
      } else {
        inv = investment;
        val = investment * Math.pow(1 + r, i);
      }
      dataPoints.push({ year: i, invested: inv, value: val });
    }

    return {
      totalInvested,
      totalValue,
      wealthGained,
      dataPoints
    };
  }, [calcMode, investment, expectedReturn, years]);

  // Formatter helper
  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(val);
  };

  // Curated Mutual Fund Categories
  const fundCategories = [
    {
      title: 'Equity Growth Funds',
      description: 'Engineered for aggressive, long-term wealth compounding. Focused on blue-chip, large-cap, and dynamic multi-cap equities.',
      returns: '15.4% Average 5-Yr CAGR',
      risk: 'High Risk',
      riskColor: 'text-rose-600 bg-rose-50 border-rose-100',
      icon: TrendingUp,
      accent: 'emerald'
    },
    {
      title: 'Balanced & Hybrid Portfolios',
      description: 'Combining stability with capital appreciation. Dynamically balances high-quality equity assets and conservative debt instruments.',
      returns: '11.8% Average 5-Yr CAGR',
      risk: 'Moderate Risk',
      riskColor: 'text-amber-600 bg-amber-50 border-amber-100',
      icon: Briefcase,
      accent: 'teal'
    },
    {
      title: 'Tax Saver (ELSS) Funds',
      description: 'Save up to ₹46,800 in taxes under Section 80C. Combines wealth creation of diversified equity with the shortest 3-year lock-in.',
      returns: '14.2% Average 5-Yr CAGR',
      risk: 'High Risk',
      riskColor: 'text-rose-600 bg-rose-50 border-rose-100',
      icon: PiggyBank,
      accent: 'cyan'
    },
    {
      title: 'Conservative Debt Portfolios',
      description: 'Ideal for short-to-medium term horizons where capital safety is paramount. Replaces traditional bank FDs with enhanced post-tax yields.',
      returns: '7.5% Average 5-Yr CAGR',
      risk: 'Low Risk',
      riskColor: 'text-emerald-600 bg-emerald-50 border-emerald-100',
      icon: Coins,
      accent: 'indigo'
    }
  ];

  // Helper for generating SVG coordinates for graph
  const chartHeight = 180;
  const chartWidth = 400;
  const maxVal = Math.max(...results.dataPoints.map(d => d.value), 1);
  const maxYear = years;

  const getSvgCoordinates = () => {
    let investedPoints = '';
    let valuePoints = '';

    results.dataPoints.forEach((pt, index) => {
      const x = (pt.year / maxYear) * chartWidth;
      const yInvested = chartHeight - (pt.invested / maxVal) * chartHeight;
      const yValue = chartHeight - (pt.value / maxVal) * chartHeight;

      if (index === 0) {
        investedPoints = `${x},${yInvested}`;
        valuePoints = `${x},${yValue}`;
      } else {
        investedPoints += ` L ${x},${yInvested}`;
        valuePoints += ` L ${x},${yValue}`;
      }
    });

    return { investedPoints, valuePoints };
  };

  const { investedPoints, valuePoints } = getSvgCoordinates();

  const handleApplyNow = (category: string) => {
    onPreFillContact(
      'Mutual Fund',
      `Hello! I am highly interested in discussing and investing in the "${category}" portfolio options with Finnovative.`
    );
  };

  return (
    <section id="mutual-funds" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-sm font-semibold text-emerald-600 uppercase tracking-widest font-mono">
            Wealth Creation Engine
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-display font-bold text-slate-900 tracking-tight">
            Curated Mutual Fund Solutions
          </h2>
          <p className="mt-4 text-slate-600">
            Investing shouldn't be dynamic guesswork. We develop personalized risk-calibrated asset allocations backed by empirical macro-research.
          </p>
        </div>

        {/* 2-Column Core Layout (Advisory Cards + SIP Calculator) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Column 1: Fund Solutions (7 columns) */}
          <div className="lg:col-span-7 space-y-6">
            <h3 className="text-xl font-display font-semibold text-slate-900 border-l-4 border-emerald-600 pl-3">
              Tailored Investment Strategies
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {fundCategories.map((category, idx) => {
                const IconComp = category.icon;
                return (
                  <div
                    key={idx}
                    id={`fund-card-${idx}`}
                    className="group bg-slate-50 border border-slate-100 rounded-2xl p-6 hover:bg-white hover:shadow-xl hover:shadow-slate-100/70 transition-all duration-300 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div className="p-3 rounded-xl bg-white text-emerald-600 shadow-xs group-hover:bg-emerald-50 transition-colors">
                          <IconComp className="w-5 h-5" />
                        </div>
                        <span className={`px-2.5 py-0.5 text-[11px] font-semibold tracking-wide uppercase rounded-full border ${category.riskColor}`}>
                          {category.risk}
                        </span>
                      </div>
                      <h4 className="font-display font-bold text-slate-900 group-hover:text-emerald-700 transition-colors text-base">
                        {category.title}
                      </h4>
                      <p className="mt-2 text-xs text-slate-500 leading-relaxed">
                        {category.description}
                      </p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-slate-100/80 flex items-center justify-between">
                      <div>
                        <span className="block text-[10px] font-mono uppercase tracking-wider text-slate-400">
                          Target Yield
                        </span>
                        <span className="font-bold text-sm text-slate-800">
                          {category.returns}
                        </span>
                      </div>
                      <button
                        id={`btn-apply-fund-${idx}`}
                        onClick={() => handleApplyNow(category.title)}
                        className="text-xs font-semibold text-emerald-700 hover:text-emerald-950 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform"
                      >
                        Invest Now &rarr;
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Quick trust statement */}
            <div className="bg-emerald-50/50 rounded-2xl p-5 border border-emerald-100/40 flex items-start gap-3.5">
              <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <h5 className="text-sm font-semibold text-emerald-950">
                  Zero Brokerage Commission & Paperless Process
                </h5>
                <p className="text-xs text-emerald-800/80 mt-1 leading-relaxed">
                  Enjoy completely transparent, direct, paperless transactions via NSDL/CDSL platforms. No hidden advisory cuts. Your wealth stays yours.
                </p>
              </div>
            </div>
          </div>

          {/* Column 2: Interactive Compound Growth Calculator (5 columns) */}
          <div className="lg:col-span-5 bg-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
            {/* Ambient glows inside calculator */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />
            
            {/* Header / Mode Toggles */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-5 mb-6">
              <div>
                <h3 className="font-display font-bold text-lg text-slate-100">
                  Growth Planner
                </h3>
                <span className="text-[11px] font-mono text-emerald-400 uppercase tracking-widest">
                  Compounding Simulator
                </span>
              </div>
              <div className="flex bg-slate-800 rounded-xl p-1 border border-slate-700/50">
                <button
                  id="calc-sip-toggle"
                  onClick={() => handleModeChange('SIP')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                    calcMode === 'SIP' ? 'bg-emerald-600 text-white shadow-xs' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Monthly SIP
                </button>
                <button
                  id="calc-lumpsum-toggle"
                  onClick={() => handleModeChange('Lumpsum')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                    calcMode === 'Lumpsum' ? 'bg-emerald-600 text-white shadow-xs' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Lumpsum
                </button>
              </div>
            </div>

            {/* Input sliders */}
            <div className="space-y-6">
              {/* Slider 1: Investment Amount */}
              <div id="slider-investment-box">
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-medium text-slate-300">
                    {calcMode === 'SIP' ? 'Monthly SIP Amount' : 'One-time Lumpsum'}
                  </label>
                  <span className="text-sm font-mono font-bold text-emerald-400">
                    {formatCurrency(investment)}
                  </span>
                </div>
                <input
                  id="input-range-investment"
                  type="range"
                  min={calcMode === 'SIP' ? 500 : 5000}
                  max={calcMode === 'SIP' ? 200000 : 5000000}
                  step={calcMode === 'SIP' ? 500 : 5000}
                  value={investment}
                  onChange={(e) => setInvestment(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                />
                <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
                  <span>{calcMode === 'SIP' ? '₹500' : '₹5,000'}</span>
                  <span>{calcMode === 'SIP' ? '₹2 Lakhs' : '₹50 Lakhs'}</span>
                </div>
              </div>

              {/* Slider 2: Rate of Return */}
              <div id="slider-return-box">
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-medium text-slate-300">
                    Expected Return Rate (p.a.)
                  </label>
                  <span className="text-sm font-mono font-bold text-emerald-400">
                    {expectedReturn}%
                  </span>
                </div>
                <input
                  id="input-range-returns"
                  type="range"
                  min="5"
                  max="25"
                  step="0.5"
                  value={expectedReturn}
                  onChange={(e) => setExpectedReturn(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                />
                <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
                  <span>5%</span>
                  <span>25%</span>
                </div>
              </div>

              {/* Slider 3: Duration */}
              <div id="slider-duration-box">
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-medium text-slate-300">
                    Time Horizon (Duration)
                  </label>
                  <span className="text-sm font-mono font-bold text-emerald-400">
                    {years} Years
                  </span>
                </div>
                <input
                  id="input-range-years"
                  type="range"
                  min="1"
                  max="40"
                  step="1"
                  value={years}
                  onChange={(e) => setYears(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                />
                <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
                  <span>1 Yr</span>
                  <span>40 Yrs</span>
                </div>
              </div>
            </div>

            {/* Results Display Grid */}
            <div className="bg-slate-800/60 rounded-2xl p-4 mt-6 grid grid-cols-3 gap-2 text-center border border-slate-800">
              <div>
                <span className="block text-[9px] font-medium text-slate-400 uppercase tracking-wider mb-1">
                  Total Invested
                </span>
                <span className="block text-xs sm:text-sm font-bold font-mono text-slate-200">
                  {formatCurrency(results.totalInvested)}
                </span>
              </div>
              <div>
                <span className="block text-[9px] font-medium text-slate-400 uppercase tracking-wider mb-1">
                  Est. Gain
                </span>
                <span className="block text-xs sm:text-sm font-bold font-mono text-teal-400">
                  {formatCurrency(results.wealthGained)}
                </span>
              </div>
              <div>
                <span className="block text-[9px] font-medium text-slate-300 uppercase tracking-wider mb-1">
                  Maturity Value
                </span>
                <span className="block text-xs sm:text-sm font-extrabold font-mono text-emerald-400">
                  {formatCurrency(results.totalValue)}
                </span>
              </div>
            </div>

            {/* Premium Custom SVG Chart Line & Area Overlay */}
            <div className="mt-6 border border-slate-800/80 bg-slate-950/40 rounded-2xl p-4 flex flex-col items-center">
              <span className="text-[10px] font-mono text-slate-400 mb-2 uppercase tracking-widest block self-start">
                Growth Curve Timeline
              </span>

              {/* Responsive SVG container */}
              <div className="w-full flex justify-center items-center">
                <svg
                  viewBox={`0 0 ${chartWidth} ${chartHeight}`}
                  className="overflow-visible w-full h-auto max-w-[400px]"
                >
                  <defs>
                    {/* Gradients */}
                    <linearGradient id="valueGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#10b981" stopOpacity="0.25" />
                      <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
                    </linearGradient>
                    <linearGradient id="investedGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#64748b" stopOpacity="0.1" />
                      <stop offset="100%" stopColor="#64748b" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>

                  {/* Horizontal gridlines */}
                  <line x1="0" y1={chartHeight * 0.25} x2={chartWidth} y2={chartHeight * 0.25} stroke="#334155" strokeDasharray="3 3" strokeOpacity="0.4" />
                  <line x1="0" y1={chartHeight * 0.5} x2={chartWidth} y2={chartHeight * 0.5} stroke="#334155" strokeDasharray="3 3" strokeOpacity="0.4" />
                  <line x1="0" y1={chartHeight * 0.75} x2={chartWidth} y2={chartHeight * 0.75} stroke="#334155" strokeDasharray="3 3" strokeOpacity="0.4" />

                  {/* Value (Growth) area shape */}
                  <path
                    d={`M 0,${chartHeight} L ${valuePoints} L ${chartWidth},${chartHeight} Z`}
                    fill="url(#valueGrad)"
                  />

                  {/* Invested Area shape */}
                  <path
                    d={`M 0,${chartHeight} L ${investedPoints} L ${chartWidth},${chartHeight} Z`}
                    fill="url(#investedGrad)"
                  />

                  {/* Invested curve line */}
                  <path
                    d={`M ${investedPoints}`}
                    fill="none"
                    stroke="#64748b"
                    strokeWidth="1.5"
                    strokeOpacity="0.8"
                  />

                  {/* Growth curve line */}
                  <path
                    d={`M ${valuePoints}`}
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="3"
                  />

                  {/* Marker points on last year */}
                  <circle
                    cx={chartWidth}
                    cy={chartHeight - (results.totalValue / maxVal) * chartHeight}
                    r="5"
                    fill="#10b981"
                    className="animate-pulse"
                  />
                  <circle
                    cx={chartWidth}
                    cy={chartHeight - (results.totalInvested / maxVal) * chartHeight}
                    r="4"
                    fill="#64748b"
                  />
                </svg>
              </div>

              {/* Legend */}
              <div className="flex gap-4 justify-center items-center mt-3 text-[10px] font-mono text-slate-400">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-1.5 bg-slate-500 rounded-xs block" />
                  <span>Capital Invested</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-1.5 bg-emerald-500 rounded-xs block" />
                  <span>Compounded Wealth</span>
                </div>
              </div>
            </div>

            {/* Quick Action trigger inside calculator */}
            <button
              id="calc-submit-lead-btn"
              onClick={() => onPreFillContact(
                'Mutual Fund',
                `Hello! I simulated my wealth compounding plan using your planner. Mode: ${calcMode}, Investment: ${formatCurrency(investment)}, Term: ${years} Years. I would like a certified wealth planner from Finnovative to construct a specific mutual fund strategy for me.`
              )}
              className="mt-6 w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 font-semibold text-sm transition-all text-center flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-emerald-900/10 group"
            >
              Get Custom Asset Allocation Review
              <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}
