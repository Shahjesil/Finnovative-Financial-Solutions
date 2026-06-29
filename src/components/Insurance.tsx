/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Heart, Users, Activity, Crosshair, ArrowUpRight, HelpCircle, CheckCircle } from 'lucide-react';

interface InsuranceProps {
  onPreFillContact: (service: 'Insurance', message: string) => void;
}

export default function Insurance({ onPreFillContact }: InsuranceProps) {
  // Protection Needs Planner State
  const [insType, setInsType] = useState<'TermLife' | 'Health'>('TermLife');
  const [userAge, setUserAge] = useState<number>(30);
  const [coverageLimit, setCoverageLimit] = useState<number>(insType === 'TermLife' ? 10000000 : 1000000); // 1 Cr or 10 L
  const [smoker, setSmoker] = useState<boolean>(false);
  const [dependents, setDependents] = useState<boolean>(true);

  // Sync state if category changes
  const handleTypeChange = (type: 'TermLife' | 'Health') => {
    setInsType(type);
    setCoverageLimit(type === 'TermLife' ? 10000000 : 1000000);
  };

  // Perform dynamic premium/protection calculation
  const calculations = useMemo(() => {
    let monthlyPremium = 0;
    let taxSaving = 0;
    let protectionAdvice = '';

    if (insType === 'TermLife') {
      // Base calculation logic for Term Life
      // ₹1 Crore term life cover for healthy 30 year old is approx ₹1,000 / month
      const baseRatePerMillion = 100; // Rs per 10 Lakh coverage per year for a standard 30-year old
      const ageMultiplier = Math.max(0.6, (userAge * userAge) / 900); // age 30 = 1x, age 45 = 2.25x
      const smokerMultiplier = smoker ? 1.6 : 1.0;
      
      const annualPremium = (coverageLimit / 1000000) * baseRatePerMillion * ageMultiplier * smokerMultiplier;
      monthlyPremium = annualPremium / 12;
      
      // Tax saving via Sec 80C is premium amount up to limit
      taxSaving = Math.min(annualPremium, 46800 * 0.3); // max limit times max slab

      // Protection Advice
      if (coverageLimit < 10000000) {
        protectionAdvice = 'Recommended Term Cover for your profile is at least ₹1 Crore (or 20x of your annual salary) to fully absorb home loans, education, and family liability costs.';
      } else {
        protectionAdvice = 'Solid protection selection. Ensure to opt for the "Waiver of Premium" and "Accidental Disability" riders to guard against income halts.';
      }
    } else {
      // Health Insurance (Mediclaim)
      // ₹10 Lakh cover for standard family is approx ₹1,200 / month
      const baseRate = 8000; // annual base for a 30 year old at 10L
      const ageMultiplier = Math.max(0.7, userAge / 30); // age 30 = 1x, age 50 = 1.6x
      const coverageMultiplier = coverageLimit / 1000000; // proportional
      const dependentsMultiplier = dependents ? 1.8 : 1.0; // Family Floater effect

      const annualPremium = baseRate * ageMultiplier * coverageMultiplier * dependentsMultiplier;
      monthlyPremium = annualPremium / 12;

      // Tax saving via Sec 80D
      taxSaving = Math.min(annualPremium, 25000); // Up to 25k (75k for senior parents, using 25k as typical base)

      if (dependents) {
        protectionAdvice = 'Family Floater recommended. Features Cashless Claim across 14,000+ national hospitals with No Copay and Zero Room Rent capping options.';
      } else {
        protectionAdvice = 'Perfect base coverage. Consider adding a "Super Top-Up" rider to easily double your coverage shield at 70% cheaper premiums.';
      }
    }

    return {
      monthlyPremium,
      taxSaving,
      protectionAdvice,
    };
  }, [insType, userAge, coverageLimit, smoker, dependents]);

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(val);
  };

  const plans = [
    {
      id: 'plan-term',
      icon: ShieldCheck,
      title: 'Bespoke Term Life Protection',
      description: 'Create an absolute iron-clad legacy structure. Pays a lump-sum to your dependents, ensuring active home loans, credit card balances, and children education budgets are fully covered.',
      features: ['High cover up to ₹5 Crore', 'Zero-cost return of premium options', 'Waiver of premium on disability', 'Instant critical illness riders'],
      badge: 'Secure Legacy'
    },
    {
      id: 'plan-health',
      icon: Heart,
      title: 'Elite Health & Mediclaim Care',
      description: 'Zero-compromise medical coverage for your entire household. Rest easy knowing that sudden illnesses or surgeries won’t dent your long-term compounding portfolio.',
      features: ['Cashless claims in 12,000+ networks', 'Zero Copay & No Room Rent Cap options', 'Global/Air ambulance cover included', 'Pre-existing disease covers in 24 months'],
      badge: 'Family Well-being'
    },
    {
      id: 'plan-illness',
      icon: Activity,
      title: 'Critical Illness Protection',
      description: 'Standard health covers only pay hospital bills. Critical Illness pays a lump sum on diagnosis (Cancer, Heart Attack, Stroke, etc.) to cover lost salary, therapies, and travel.',
      features: ['Covers 36 major critical conditions', 'Payout directly on first diagnosis', 'Use lump sum for global treatment', 'Premium remains locked for 5 years'],
      badge: 'Income Shield'
    }
  ];

  return (
    <section id="insurance" className="py-24 bg-slate-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-sm font-semibold text-teal-600 uppercase tracking-widest font-mono">
            Wealth Protection & Risk Shield
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-display font-bold text-slate-900 tracking-tight">
            Integrated Insurance Advisory
          </h2>
          <p className="mt-4 text-slate-600">
            A solid wealth compounding portfolio can be shattered by a single health crisis or emergency. We build rigorous protection strategies to insulate your lifestyle.
          </p>
        </div>

        {/* Dynamic 2-Column Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Column 1: Protection Planner Calculator (5 cols) */}
          <div className="lg:col-span-5 bg-white border border-slate-100 rounded-3xl p-6 sm:p-8 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-5 mb-6">
              <div>
                <h3 className="font-display font-bold text-lg text-slate-950">
                  Risk Assessment
                </h3>
                <span className="text-[11px] font-mono text-teal-600 uppercase tracking-widest">
                  Protection Estimator
                </span>
              </div>
              
              {/* Selector */}
              <div className="flex bg-slate-100 rounded-xl p-1 border border-slate-200/50">
                <button
                  id="ins-term-toggle"
                  onClick={() => handleTypeChange('TermLife')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                    insType === 'TermLife' ? 'bg-teal-700 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Term Life
                </button>
                <button
                  id="ins-health-toggle"
                  onClick={() => handleTypeChange('Health')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                    insType === 'Health' ? 'bg-teal-700 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Health Care
                </button>
              </div>
            </div>

            {/* Inputs */}
            <div className="space-y-5">
              {/* Age Input */}
              <div id="input-age-box">
                <div className="flex justify-between items-center mb-1.5">
                  <label className="text-xs font-medium text-slate-700">Your Current Age</label>
                  <span className="text-sm font-bold text-slate-900 font-mono">{userAge} Years</span>
                </div>
                <input
                  id="input-range-age"
                  type="range"
                  min="18"
                  max="65"
                  value={userAge}
                  onChange={(e) => setUserAge(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-teal-600"
                />
              </div>

              {/* Coverage Amount Slider */}
              <div id="input-coverage-box">
                <div className="flex justify-between items-center mb-1.5">
                  <label className="text-xs font-medium text-slate-700">Desired Sum Assured</label>
                  <span className="text-sm font-bold text-slate-900 font-mono">
                    {formatCurrency(coverageLimit)}
                  </span>
                </div>
                <input
                  id="input-range-coverage"
                  type="range"
                  min={insType === 'TermLife' ? 2500000 : 300000} // 25 Lakh or 3 Lakh
                  max={insType === 'TermLife' ? 30000000 : 5000000} // 3 Cr or 50 Lakh
                  step={insType === 'TermLife' ? 2500000 : 100000}
                  value={coverageLimit}
                  onChange={(e) => setCoverageLimit(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-teal-600"
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-1">
                  <span>{insType === 'TermLife' ? '₹25 Lakhs' : '₹3 Lakhs'}</span>
                  <span>{insType === 'TermLife' ? '₹3 Crores' : '₹50 Lakhs'}</span>
                </div>
              </div>

              {/* Toggle Parameters (Smoker vs Dependents) */}
              <div className="pt-2">
                {insType === 'TermLife' ? (
                  <div className="flex items-center justify-between p-3 bg-slate-50 border border-slate-100 rounded-xl">
                    <div>
                      <span className="block text-xs font-semibold text-slate-800">Tobacco/Smoker Status</span>
                      <span className="text-[10px] text-slate-400">Affects risk bracket rating</span>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        id="checkbox-smoker"
                        type="checkbox"
                        checked={smoker}
                        onChange={(e) => setSmoker(e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-slate-200 peer-focus:outline-hidden rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-600"></div>
                    </label>
                  </div>
                ) : (
                  <div className="flex items-center justify-between p-3 bg-slate-50 border border-slate-100 rounded-xl">
                    <div>
                      <span className="block text-xs font-semibold text-slate-800">Include Dependents (Family Floater)</span>
                      <span className="text-[10px] text-slate-400">Covers spouse + up to 3 children</span>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        id="checkbox-dependents"
                        type="checkbox"
                        checked={dependents}
                        onChange={(e) => setDependents(e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-slate-200 peer-focus:outline-hidden rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-600"></div>
                    </label>
                  </div>
                )}
              </div>
            </div>

            {/* Price Output Shield */}
            <div className="mt-6 p-5 rounded-2xl bg-teal-950 text-white text-center relative overflow-hidden">
              <span className="block text-[10px] font-mono text-teal-400 uppercase tracking-widest mb-1.5">
                Estimated Premium
              </span>
              <div className="flex items-baseline justify-center gap-1">
                <span className="text-2xl sm:text-3xl font-extrabold font-mono text-teal-300">
                  {formatCurrency(calculations.monthlyPremium)}
                </span>
                <span className="text-xs text-teal-100">/ month</span>
              </div>
              <p className="text-[11px] text-teal-100/70 mt-2">
                *Taxes and G.S.T. are applicable. Final underwriting subject to medical records.
              </p>
            </div>

            {/* Dynamic Advice Context */}
            <div className="mt-5 p-4 rounded-xl bg-amber-50 border border-amber-100 flex items-start gap-3">
              <Crosshair className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <h5 className="text-[11px] font-bold text-amber-900 uppercase tracking-wider">Advisory Insight</h5>
                <p className="text-[11px] text-amber-800 leading-relaxed mt-0.5">
                  {calculations.protectionAdvice}
                </p>
                <div className="mt-1 text-[10px] font-semibold text-amber-950 flex items-center gap-1.5">
                  🛡️ Est. Annual Tax Saving: {formatCurrency(calculations.taxSaving)} under Income Tax Code
                </div>
              </div>
            </div>

            {/* Submit Action */}
            <button
              id="ins-quote-btn"
              onClick={() => onPreFillContact(
                'Insurance',
                `Hi! I ran an assessment for ${insType === 'TermLife' ? 'Term Life Insurance' : 'Health Insurance/Mediclaim'} on your portal. Profile Details: Age: ${userAge}, Desired Sum Assured: ${formatCurrency(coverageLimit)}, Smoker/Dependents: ${insType === 'TermLife' ? (smoker ? 'Yes' : 'No') : (dependents ? 'Yes' : 'No')}. I would like Finnovative to send me tailored quotes and comparisons from top-rated insurers.`
              )}
              className="mt-5 w-full py-3.5 px-4 rounded-xl bg-teal-800 hover:bg-teal-700 text-white font-semibold text-sm transition-all text-center flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-teal-900/15 group"
            >
              Request Custom Insurance Quotes
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </div>

          {/* Column 2: Protection Plans List (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <h3 className="text-xl font-display font-semibold text-slate-900 border-l-4 border-teal-600 pl-3">
              Comprehensive Coverage Suites
            </h3>

            <div className="space-y-6">
              {plans.map((plan, idx) => {
                const PlanIcon = plan.icon;
                return (
                  <div
                    key={plan.id}
                    id={`plan-card-${plan.id}`}
                    className="group bg-white rounded-2xl p-6 border border-slate-100 hover:border-teal-100 hover:shadow-lg hover:shadow-teal-900/5 transition-all duration-300 flex flex-col md:flex-row gap-5 items-start"
                  >
                    <div className="p-4 rounded-xl bg-teal-50 text-teal-700 shrink-0 group-hover:bg-teal-700 group-hover:text-white transition-all duration-300">
                      <PlanIcon className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <h4 className="font-display font-bold text-slate-900 text-base group-hover:text-teal-800 transition-colors">
                          {plan.title}
                        </h4>
                        <span className="hidden sm:inline-block px-2.5 py-0.5 text-[10px] font-bold text-teal-800 bg-teal-50 rounded-full">
                          {plan.badge}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 leading-relaxed mb-4">
                        {plan.description}
                      </p>
                      
                      {/* Features Bullet Grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {plan.features.map((feat, fIdx) => (
                          <div key={fIdx} className="flex items-center gap-1.5 text-[11px] text-slate-700">
                            <CheckCircle className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                            <span>{feat}</span>
                          </div>
                        ))}
                      </div>

                      <div className="mt-4 pt-4 border-t border-slate-50 flex justify-end">
                        <button
                          id={`btn-quote-plan-${plan.id}`}
                          onClick={() => onPreFillContact('Insurance', `Hello! I would like to consult with Finnovative regarding the "${plan.title}" policy structure.`)}
                          className="text-xs font-semibold text-teal-800 hover:text-teal-950 flex items-center gap-1"
                        >
                          Request Consultation &rarr;
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
