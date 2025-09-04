'use client';

import { ConnectWallet } from '@coinbase/onchainkit/wallet';
import { Sparkles } from 'lucide-react';

export function Header() {
  return (
    <header className="border-b border-white/10 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-br from-accent to-primary rounded-lg flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-xl font-bold text-gradient">AdSpark Remix</h1>
        </div>
        
        <nav className="hidden md:flex items-center space-x-6">
          <a href="#features" className="text-text-secondary hover:text-text-primary transition-colors">
            Features
          </a>
          <a href="#pricing" className="text-text-secondary hover:text-text-primary transition-colors">
            Pricing
          </a>
          <a href="#insights" className="text-text-secondary hover:text-text-primary transition-colors">
            Insights
          </a>
        </nav>

        <div className="flex items-center space-x-4">
          <ConnectWallet className="bg-gradient-to-r from-accent to-primary hover:from-accent/80 hover:to-primary/80" />
        </div>
      </div>
    </header>
  );
}
