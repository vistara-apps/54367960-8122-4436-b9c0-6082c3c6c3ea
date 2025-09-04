'use client';

import { useState } from 'react';
import { Eye, MousePointer, Share2, Download, Heart } from 'lucide-react';
import { MetricBadge } from './MetricBadge';

interface GeneratedCreativeCardProps {
  variation: {
    id: string;
    imageUrl: string;
    prompt: string;
    performanceMetrics?: {
      views: number;
      clicks: number;
      likes: number;
    };
  };
  variant: 'default' | 'withMetrics';
}

export function GeneratedCreativeCard({ variation, variant }: GeneratedCreativeCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isSelected, setIsSelected] = useState(false);

  return (
    <div 
      className={`
        glass-effect rounded-lg overflow-hidden transition-all duration-200 animate-fade-in
        ${isHovered ? 'scale-105 shadow-lg' : 'shadow-card'}
        ${isSelected ? 'ring-2 ring-accent' : ''}
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative group">
        <img 
          src={variation.imageUrl} 
          alt={variation.prompt}
          className="w-full h-48 object-cover"
        />
        
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center space-x-2">
          <button className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors">
            <Download className="w-4 h-4 text-white" />
          </button>
          <button className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors">
            <Share2 className="w-4 h-4 text-white" />
          </button>
          <button 
            onClick={() => setIsSelected(!isSelected)}
            className={`p-2 rounded-full transition-colors ${
              isSelected 
                ? 'bg-accent text-white' 
                : 'bg-white/20 hover:bg-white/30 text-white'
            }`}
          >
            <Heart className="w-4 h-4" />
          </button>
        </div>
        
        {variant === 'withMetrics' && variation.performanceMetrics && (
          <div className="absolute top-2 right-2 space-y-1">
            <MetricBadge 
              variant="views" 
              value={variation.performanceMetrics.views} 
            />
            <MetricBadge 
              variant="clicks" 
              value={variation.performanceMetrics.clicks} 
            />
          </div>
        )}
      </div>
      
      <div className="p-4">
        <p className="text-sm text-text-secondary mb-3 line-clamp-2">
          {variation.prompt}
        </p>
        
        {variant === 'withMetrics' && variation.performanceMetrics && (
          <div className="flex items-center justify-between text-xs text-text-secondary">
            <div className="flex items-center space-x-4">
              <span className="flex items-center">
                <Eye className="w-3 h-3 mr-1" />
                {variation.performanceMetrics.views}
              </span>
              <span className="flex items-center">
                <MousePointer className="w-3 h-3 mr-1" />
                {variation.performanceMetrics.clicks}
              </span>
              <span className="flex items-center">
                <Heart className="w-3 h-3 mr-1" />
                {variation.performanceMetrics.likes}
              </span>
            </div>
            <div className="text-accent font-medium">
              {((variation.performanceMetrics.clicks / variation.performanceMetrics.views) * 100).toFixed(1)}% CTR
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
