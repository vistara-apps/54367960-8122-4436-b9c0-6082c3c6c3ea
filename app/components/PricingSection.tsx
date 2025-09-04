'use client';

import { Check, Sparkles, Zap } from 'lucide-react';

export function PricingSection() {
  return (
    <section className="py-12">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gradient mb-2">Simple, Transparent Pricing</h2>
        <p className="text-text-secondary">Pay only for what you use. No subscriptions, no hidden fees.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        <div className="glass-effect rounded-lg p-6 border border-white/10">
          <div className="flex items-center space-x-2 mb-4">
            <Zap className="w-5 h-5 text-accent" />
            <h3 className="text-lg font-semibold">Pay Per Use</h3>
          </div>
          
          <div className="space-y-4 mb-6">
            <div className="flex items-center justify-between">
              <span className="text-text-secondary">5 AI Variations</span>
              <span className="font-semibold">$1.00</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-text-secondary">Auto-Post Cycle</span>
              <span className="font-semibold">$0.50</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-text-secondary">Performance Analytics</span>
              <span className="text-green-400 font-semibold">Free</span>
            </div>
          </div>
          
          <ul className="space-y-2 text-sm text-text-secondary mb-6">
            <li className="flex items-center">
              <Check className="w-4 h-4 text-green-400 mr-2" />
              High-quality AI generated variations
            </li>
            <li className="flex items-center">
              <Check className="w-4 h-4 text-green-400 mr-2" />
              Instant social media posting
            </li>
            <li className="flex items-center">
              <Check className="w-4 h-4 text-green-400 mr-2" />
              Basic performance metrics
            </li>
          </ul>
        </div>
        
        <div className="glass-effect rounded-lg p-6 border-2 border-accent relative">
          <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
            <span className="bg-gradient-to-r from-accent to-primary px-3 py-1 rounded-full text-xs font-semibold text-white">
              BEST VALUE
            </span>
          </div>
          
          <div className="flex items-center space-x-2 mb-4">
            <Sparkles className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-semibold">Starter Pack</h3>
          </div>
          
          <div className="text-center mb-6">
            <div className="text-3xl font-bold text-gradient">$8</div>
            <div className="text-text-secondary text-sm">Save $2 • 10 generations included</div>
          </div>
          
          <ul className="space-y-2 text-sm text-text-secondary mb-6">
            <li className="flex items-center">
              <Check className="w-4 h-4 text-green-400 mr-2" />
              50 AI generated variations (10 campaigns)
            </li>
            <li className="flex items-center">
              <Check className="w-4 h-4 text-green-400 mr-2" />
              Unlimited auto-posting
            </li>
            <li className="flex items-center">
              <Check className="w-4 h-4 text-green-400 mr-2" />
              Advanced performance insights
            </li>
            <li className="flex items-center">
              <Check className="w-4 h-4 text-green-400 mr-2" />
              Priority AI processing
            </li>
          </ul>
          
          <button className="w-full px-6 py-3 bg-gradient-to-r from-accent to-primary text-white font-semibold rounded-lg shadow-card hover:shadow-lg transition-all duration-200 glow-effect">
            Get Starter Pack
          </button>
        </div>
      </div>
    </section>
  );
}
