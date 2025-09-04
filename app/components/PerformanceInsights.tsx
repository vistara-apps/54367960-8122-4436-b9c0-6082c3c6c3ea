'use client';

import { TrendingUp, Award, Target, Zap } from 'lucide-react';

interface PerformanceInsightsProps {
  variations: Array<{
    id: string;
    performanceMetrics?: {
      views: number;
      clicks: number;
      likes: number;
    };
  }>;
}

export function PerformanceInsights({ variations }: PerformanceInsightsProps) {
  const totalViews = variations.reduce((sum, v) => sum + (v.performanceMetrics?.views || 0), 0);
  const totalClicks = variations.reduce((sum, v) => sum + (v.performanceMetrics?.clicks || 0), 0);
  const avgCTR = totalViews > 0 ? (totalClicks / totalViews * 100) : 0;
  
  const bestPerforming = variations.reduce((best, current) => {
    const bestCTR = best.performanceMetrics ? 
      (best.performanceMetrics.clicks / best.performanceMetrics.views * 100) : 0;
    const currentCTR = current.performanceMetrics ? 
      (current.performanceMetrics.clicks / current.performanceMetrics.views * 100) : 0;
    
    return currentCTR > bestCTR ? current : best;
  }, variations[0]);

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-bold text-gradient mb-2">Performance Insights</h3>
        <p className="text-text-secondary">Early engagement metrics from your test campaign</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="glass-effect rounded-lg p-4 text-center">
          <div className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-2">
            <Eye className="w-5 h-5 text-blue-400" />
          </div>
          <div className="text-2xl font-bold">{totalViews.toLocaleString()}</div>
          <div className="text-xs text-text-secondary">Total Views</div>
        </div>
        
        <div className="glass-effect rounded-lg p-4 text-center">
          <div className="w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-2">
            <MousePointer className="w-5 h-5 text-green-400" />
          </div>
          <div className="text-2xl font-bold">{totalClicks.toLocaleString()}</div>
          <div className="text-xs text-text-secondary">Total Clicks</div>
        </div>
        
        <div className="glass-effect rounded-lg p-4 text-center">
          <div className="w-10 h-10 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-2">
            <Target className="w-5 h-5 text-accent" />
          </div>
          <div className="text-2xl font-bold">{avgCTR.toFixed(1)}%</div>
          <div className="text-xs text-text-secondary">Average CTR</div>
        </div>
        
        <div className="glass-effect rounded-lg p-4 text-center">
          <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-2">
            <Award className="w-5 h-5 text-primary" />
          </div>
          <div className="text-2xl font-bold">
            {bestPerforming.performanceMetrics ? 
              ((bestPerforming.performanceMetrics.clicks / bestPerforming.performanceMetrics.views) * 100).toFixed(1) 
              : '0'
            }%
          </div>
          <div className="text-xs text-text-secondary">Best CTR</div>
        </div>
      </div>
      
      <div className="glass-effect rounded-lg p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Zap className="w-5 h-5 text-accent" />
          <h4 className="text-lg font-semibold">AI Recommendations</h4>
        </div>
        
        <div className="space-y-3 text-sm">
          <div className="flex items-start space-x-2">
            <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></div>
            <p className="text-text-secondary">
              Your best performing variation achieved a {
                bestPerforming.performanceMetrics ? 
                  ((bestPerforming.performanceMetrics.clicks / bestPerforming.performanceMetrics.views) * 100).toFixed(1) 
                  : '0'
              }% CTR. Consider similar styling for future campaigns.
            </p>
          </div>
          
          <div className="flex items-start space-x-2">
            <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
            <p className="text-text-secondary">
              Visual elements with higher contrast and bold colors tend to perform better in social feeds.
            </p>
          </div>
          
          <div className="flex items-start space-x-2">
            <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
            <p className="text-text-secondary">
              Your campaign is performing {avgCTR > 2 ? 'above' : 'within'} industry averages. 
              {avgCTR > 2 ? ' Great job!' : ' Consider A/B testing with more variations.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
