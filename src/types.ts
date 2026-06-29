/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface ContactInquiry {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  serviceType: 'Mutual Fund' | 'Insurance' | 'Comprehensive Wealth Management' | 'Other';
  message: string;
  status: 'Pending' | 'Contacted' | 'Scheduled';
  createdAt: string;
  preferredTime?: string;
}

export interface MutualFundScheme {
  id: string;
  name: string;
  category: 'Equity' | 'Debt' | 'Hybrid' | 'ELSS (Tax Saving)';
  riskProfile: 'Low' | 'Moderate' | 'High' | 'Very High';
  historicalReturns: {
    oneYear: number;
    threeYear: number;
    fiveYear: number;
  };
  minInvestment: number;
  description: string;
  iconName: string;
}

export interface InsurancePlan {
  id: string;
  name: string;
  type: 'Term Life' | 'Health' | 'Critical Illness' | 'Family Floater';
  coverageAmountRange: string;
  benefits: string[];
  description: string;
  iconName: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company?: string;
  comment: string;
  rating: number;
  avatarSeed: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'General' | 'Mutual Funds' | 'Insurance';
}
