/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { Target, HelpCircle, Award, TrendingUp, Sparkles, RefreshCw, Calculator, DollarSign, Hourglass } from 'lucide-react';

interface CalculatorsProps {
  onPreFillContact: (service: 'Mutual Fund' | 'Insurance' | 'Comprehensive Wealth Management', message: string) => void;
}

export default function Calculators({ onPreFillContact }: CalculatorsProps) {
  const [activeTab, setActiveTab] = useState<'GoalPlanner' | 'CAGR'>('GoalPlanner');

  // Goal Planner States
  const [goalName, setGoalName] = useState<string>('Child Education');
  const [currentCost, setCurrentCost] = useState<number>(1500000); // 15 Lakhs
  const [yearsToGoal, setYearsToGoal] = useState<number>(12);
  const [expectedInflation, setExpectedInflation] = useState<number>(6); // 6%
  const [estimatedReturn, setEstimatedReturn] = useState<number>(12); // 12%

  // CAGR States
  const [initialInvestment, setInitialInvestment] = useState<number>(100000);
  const [finalValue, setFinalValue] = useState<number>(250000);
  const [cagrYears, setCagrYears] = useState<number>(5);

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(val);
  };

  // Computations
  const goalResults = useMemo(() => {
    // 1. Future Cost with inflation: Cost * (1 + inflation)^years
    const iRate = expectedInflation / 100;
    const futureCost = currentCost * Math.pow(1 + iRate, yearsToGoal);

    // 2. Required monthly SIP to reach futureCost
    // Formula for SIP: FutureValue = M * [ ( (1 + r)^n - 1 ) / r ] * (1 + r)
    // Hence, M = FutureValue / { [ ( (1 + r)^n - 1 ) / r ] * (1 + r) }
    const rRate = estimatedReturn / 100 / 12; // monthly rate
    const nMonths = yearsToGoal * 12;
    
    let requiredSIP = 0;
    if (rRate > 0 && nMonths > 0) {
      const compoundFactor = ((Math.pow(1 + rRate, nMonths) - 1) / rRate) * (1 + rRate);
      requiredSIP = futureCost / compoundFactor;
    }

    return {
      futureCost,
      requiredSIP
    };
  }, [currentCost, yearsToGoal, expectedInflation, estimatedReturn]);

  const cagrResult = useMemo(() => {
    if (initialInvestment <= 0 || finalValue <= 0 || cagrYears <= 0) return 0;
    // Formula: (FinalValue / InitialValue)^(1 / Years) - 1
    const rate = Math.pow(finalValue / initialInvestment, 1 / cagrYears) - 1;
    return rate * 100;
  }, [initialInvestment, finalValue, cagrYears]);

  return (
    <section id="calculators" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-sm font-semibold text-emerald-600 uppercase tracking-widest font-mono">
            Interactive Advisory Suite
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-display font-bold text-slate-900 tracking-tight">
            Comprehensive Wealth Planners
          </h2>
          <p className="mt-4 text-slate-600">
            Smart wealth management relies on exact mathematical forecasting. Use our specialized tools to factor inflation and compute exact CAGR metrics.
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex justify-center mb-10">
          <div className="flex bg-slate-100 p-1.5 rounded-2xl border border-slate-200/50">
            <button
              id="tab-goal-planner"
              onClick={() => setActiveTab('GoalPlanner')}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                activeTab === 'GoalPlanner'
                  ? 'bg-white text-emerald-800 shadow-md shadow-slate-200/50'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Target className="w-4 h-4 text-emerald-600" />
              Inflation-Adjusted Goal Planner
            </button>
            <button
              id="tab-cagr-calc"
              onClick={() => setActiveTab('CAGR')}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                activeTab === 'CAGR'
                  ? 'bg-white text-emerald-800 shadow-md shadow-slate-200/50'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <RefreshCw className="w-4 h-4 text-emerald-600" />
              CAGR Growth Rate Calculator
            </button>
          </div>
        </div>

        {/* Tab Body */}
        <div className="max-w-5xl mx-auto bg-slate-50 border border-slate-100 rounded-3xl p-6 sm:p-10 shadow-xs">
          
          {activeTab === 'GoalPlanner' && (
            <div id="panel-goal-planner" className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              {/* Inputs */}
              <div className="lg:col-span-6 space-y-6">
                <div>
                  <h3 className="text-lg font-display font-bold text-slate-900 flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-emerald-600" />
                    Define Your Future Goal
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Calculate exactly how much you need to save to stay ahead of rising lifestyles.
                  </p>
                </div>

                {/* Input: Goal Selection */}
                <div id="input-goal-box">
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                    Goal Description
                  </label>
                  <select
                    id="select-goal-type"
                    value={goalName}
                    onChange={(e) => setGoalName(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 focus:outline-none focus:border-emerald-600"
                  >
                    <option value="Child Education">Child's Higher Education / Ivy League Prep</option>
                    <option value="Retirement Corpus">Peaceful Inflation-proof Retirement</option>
                    <option value="Child Marriage">Grand Marriage Celebration Planning</option>
                    <option value="Dream Home / Villa">Premium Real Estate Acquirement</option>
                    <option value="Luxury Global Cruise">International Vacation/Travel Sabbatical</option>
                  </select>
                </div>

                {/* Input: Current Cost */}
                <div id="input-cost-box">
                  <div className="flex justify-between text-xs font-semibold text-slate-700 uppercase mb-2">
                    <span>Cost of Goal Today</span>
                    <span className="font-mono text-emerald-700 font-bold">{formatCurrency(currentCost)}</span>
                  </div>
                  <input
                    id="range-cost"
                    type="range"
                    min="100000"
                    max="20000000"
                    step="100000"
                    value={currentCost}
                    onChange={(e) => setCurrentCost(Number(e.target.value))}
                    className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-1">
                    <span>₹1 Lakh</span>
                    <span>₹2 Crores</span>
                  </div>
                </div>

                {/* Slider: Years */}
                <div id="input-goal-years-box">
                  <div className="flex justify-between text-xs font-semibold text-slate-700 uppercase mb-2">
                    <span>Years Until Goal Required</span>
                    <span className="font-mono text-emerald-700 font-bold">{yearsToGoal} Years</span>
                  </div>
                  <input
                    id="range-goal-years"
                    type="range"
                    min="1"
                    max="30"
                    value={yearsToGoal}
                    onChange={(e) => setYearsToGoal(Number(e.target.value))}
                    className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-1">
                    <span>1 Year</span>
                    <span>30 Years</span>
                  </div>
                </div>

                {/* Grid for parameters */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-1">
                      Est. Inflation rate
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        id="input-number-inflation"
                        type="number"
                        min="2"
                        max="15"
                        value={expectedInflation}
                        onChange={(e) => setExpectedInflation(Number(e.target.value))}
                        className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-hidden focus:border-emerald-600"
                      />
                      <span className="text-sm font-semibold text-slate-600">%</span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-1">
                      Expected returns (MF)
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        id="input-number-returns"
                        type="number"
                        min="5"
                        max="22"
                        value={estimatedReturn}
                        onChange={(e) => setEstimatedReturn(Number(e.target.value))}
                        className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-hidden focus:border-emerald-600"
                      />
                      <span className="text-sm font-semibold text-slate-600">%</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Outputs (6 cols) */}
              <div className="lg:col-span-6 bg-slate-900 text-white rounded-2xl p-6 sm:p-8 space-y-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none" />
                
                <h4 className="font-display font-semibold text-sm text-slate-400 tracking-wider uppercase border-b border-slate-800 pb-3">
                  Forecast Report for: {goalName}
                </h4>

                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div className="bg-slate-800/40 p-4 rounded-xl border border-slate-800/50">
                    <span className="block text-[10px] font-mono text-slate-400 uppercase tracking-wider mb-1">
                      Today's Cost Value
                    </span>
                    <span className="text-base sm:text-lg font-bold font-mono text-slate-100">
                      {formatCurrency(currentCost)}
                    </span>
                  </div>
                  <div className="bg-emerald-950/20 p-4 rounded-xl border border-emerald-900/20">
                    <span className="block text-[10px] font-mono text-emerald-400 uppercase tracking-wider mb-1">
                      Inflation-Adjusted Cost
                    </span>
                    <span className="text-base sm:text-lg font-bold font-mono text-emerald-400">
                      {formatCurrency(goalResults.futureCost)}
                    </span>
                  </div>
                </div>

                <div className="bg-gradient-to-tr from-emerald-950/80 to-slate-900 p-6 rounded-2xl border border-emerald-900/40 text-center">
                  <span className="block text-[11px] font-mono text-emerald-300 uppercase tracking-widest mb-2">
                    Required Monthly Investment (SIP)
                  </span>
                  <div className="text-3xl sm:text-4xl font-extrabold font-mono text-emerald-400">
                    {formatCurrency(goalResults.requiredSIP)}
                  </div>
                  <p className="text-xs text-emerald-100/60 mt-2.5 max-w-sm mx-auto">
                    Accumulating through structured, monthly mutual fund compounding will achieve the target {formatCurrency(goalResults.futureCost)} over {yearsToGoal} years at {estimatedReturn}% return rate.
                  </p>
                </div>

                <button
                  id="goal-apply-btn"
                  onClick={() => onPreFillContact(
                    'Comprehensive Wealth Management',
                    `Hello! I simulated my future "${goalName}" on your Inflation Planner. Costs: Today: ${formatCurrency(currentCost)}, Adjusted Future Cost: ${formatCurrency(goalResults.futureCost)} in ${yearsToGoal} Years. It shows a required SIP of ${formatCurrency(goalResults.requiredSIP)} / month. I would like a private consultation with a Finnovative wealth advisor to review target funds.`
                  )}
                  className="w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm transition-all text-center block cursor-pointer"
                >
                  Create Targeted Portfolio Blueprint &rarr;
                </button>
              </div>
            </div>
          )}

          {activeTab === 'CAGR' && (
            <div id="panel-cagr" className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              {/* Inputs */}
              <div className="lg:col-span-6 space-y-6">
                <div>
                  <h3 className="text-lg font-display font-bold text-slate-900 flex items-center gap-2">
                    <RefreshCw className="w-5 h-5 text-emerald-600" />
                    Calculate CAGR (Compound Annual Growth Rate)
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Identify the exact annualized rate of return on your past investments or stocks.
                  </p>
                </div>

                {/* Input: Initial Investment */}
                <div id="input-cagr-initial-box">
                  <div className="flex justify-between text-xs font-semibold text-slate-700 uppercase mb-2">
                    <span>Initial Invested Capital</span>
                    <span className="font-mono text-emerald-700 font-bold">{formatCurrency(initialInvestment)}</span>
                  </div>
                  <input
                    id="range-cagr-initial"
                    type="range"
                    min="10000"
                    max="10000000"
                    step="10000"
                    value={initialInvestment}
                    onChange={(e) => setInitialInvestment(Number(e.target.value))}
                    className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-1">
                    <span>₹10,000</span>
                    <span>₹1 Crore</span>
                  </div>
                </div>

                {/* Input: Final Value */}
                <div id="input-cagr-final-box">
                  <div className="flex justify-between text-xs font-semibold text-slate-700 uppercase mb-2">
                    <span>Final Accrued Portfolio Value</span>
                    <span className="font-mono text-emerald-700 font-bold">{formatCurrency(finalValue)}</span>
                  </div>
                  <input
                    id="range-cagr-final"
                    type="range"
                    min="15000"
                    max="20000000"
                    step="15000"
                    value={finalValue}
                    onChange={(e) => setFinalValue(Number(e.target.value))}
                    className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-1">
                    <span>₹15,000</span>
                    <span>₹2 Crores</span>
                  </div>
                </div>

                {/* Slider: CAGR Years */}
                <div id="input-cagr-years-box">
                  <div className="flex justify-between text-xs font-semibold text-slate-700 uppercase mb-2">
                    <span>Holding Period (Years)</span>
                    <span className="font-mono text-emerald-700 font-bold">{cagrYears} Years</span>
                  </div>
                  <input
                    id="range-cagr-years"
                    type="range"
                    min="1"
                    max="25"
                    value={cagrYears}
                    onChange={(e) => setCagrYears(Number(e.target.value))}
                    className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-1">
                    <span>1 Year</span>
                    <span>25 Years</span>
                  </div>
                </div>
              </div>

              {/* Outputs (6 cols) */}
              <div className="lg:col-span-6 bg-slate-900 text-white rounded-2xl p-6 sm:p-8 space-y-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none" />
                
                <h4 className="font-display font-semibold text-sm text-slate-400 tracking-wider uppercase border-b border-slate-800 pb-3">
                  Annualized Growth Rate
                </h4>

                <div className="bg-gradient-to-tr from-emerald-950/80 to-slate-900 p-8 rounded-2xl border border-emerald-900/40 text-center">
                  <span className="block text-[11px] font-mono text-emerald-300 uppercase tracking-widest mb-2.5">
                    Your Computed CAGR
                  </span>
                  <div className="text-4xl sm:text-5xl font-extrabold font-mono text-emerald-400">
                    {cagrResult.toFixed(2)}%
                  </div>
                  <p className="text-xs text-emerald-100/60 mt-4 max-w-xs mx-auto">
                    An annualized return of {cagrResult.toFixed(2)}% would grow an initial {formatCurrency(initialInvestment)} into {formatCurrency(finalValue)} over a {cagrYears}-year horizon.
                  </p>
                </div>

                <div className="p-4 bg-slate-800/40 border border-slate-800 rounded-xl text-center text-xs text-slate-300">
                  ⚡ Benchmark reference: Historical equity index yields hover around <strong>12-14% CAGR</strong> in high-performing emerging markets.
                </div>

                <button
                  id="cagr-cta-btn"
                  onClick={() => onPreFillContact(
                    'Mutual Fund',
                    `Hi! I ran a CAGR calculation on your platform. Initial: ${formatCurrency(initialInvestment)}, Final: ${formatCurrency(finalValue)}, Period: ${cagrYears} Years, yielding a return rate of ${cagrResult.toFixed(2)}%. I want to discuss restructuring my current mutual fund and equity assets to target higher CAGR opportunities with Finnovative.`
                  )}
                  className="w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm transition-all text-center block cursor-pointer"
                >
                  Request Portfolio Audit &rarr;
                </button>
              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
}
