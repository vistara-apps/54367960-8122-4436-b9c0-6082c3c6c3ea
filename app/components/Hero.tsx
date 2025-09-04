'use client';

import { TrendingUp, Zap, BarChart3 } from 'lucide-react';

export function Hero() {
  return (
    <section className="py-20 text-center">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-gradient">
            AdSpark Remix
          </h1>
          <p className="text-lg md:text-xl text-text-secondary mb-8 max-w-2xl mx-auto">
            The power of instantly spin & test social ad variations with AI. 
            Generate eye-catching creatives and test them across social platforms 
            for maximum engagement.
          </p>
          
          <div className="flex justify-center mb-12">
            <button className="px-8 py-3 bg-gradient-to-r from-accent to-primary text-white font-semibold rounded-lg shadow-card hover:shadow-lg transition-all duration-200 animate-pulse-glow">
              Start Creating
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="glass-effect rounded-lg p-6 floating-animation" style={{ animationDelay: '0s' }}>
              <div className="w-12 h-12 bg-gradient-to-br from-accent to-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2">AI-Powered Variations</h3>
              <p className="text-text-secondary text-sm">
                Upload one product image and get 5 unique ad creatives instantly
              </p>
            </div>

            <div className="glass-effect rounded-lg p-6 floating-animation" style={{ animationDelay: '0.5s' }}>
              <div className="w-12 h-12 bg-gradient-to-br from-accent to-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Auto-Post Testing</h3>
              <p className="text-text-secondary text-sm">
                Automatically post to test accounts and gather performance data
              </p>
            </div>

            <div className="glass-effect rounded-lg p-6 floating-animation" style={{ animationDelay: '1s' }}>
              <div className="w-12 h-12 bg-gradient-to-br from-accent to-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Performance Insights</h3>
              <p className="text-text-secondary text-sm">
                Get early engagement metrics and optimize future campaigns
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
