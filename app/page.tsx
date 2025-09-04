'use client';

import { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ImageUpload } from './components/ImageUpload';
import { GeneratedCreativeCard } from './components/GeneratedCreativeCard';
import { PerformanceInsights } from './components/PerformanceInsights';
import { PricingSection } from './components/PricingSection';

export default function HomePage() {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [generatedVariations, setGeneratedVariations] = useState<any[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showInsights, setShowInsights] = useState(false);

  const handleImageUpload = (imageUrl: string) => {
    setUploadedImage(imageUrl);
    setGeneratedVariations([]);
    setShowInsights(false);
  };

  const handleGenerate = async () => {
    if (!uploadedImage) return;
    
    setIsGenerating(true);
    try {
      const response = await fetch('/api/generate-variations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ imageUrl: uploadedImage }),
      });
      
      const data = await response.json();
      if (data.success) {
        setGeneratedVariations(data.variations);
      }
    } catch (error) {
      console.error('Error generating variations:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handlePost = async (variationIds: string[]) => {
    try {
      const response = await fetch('/api/post-variations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ variationIds }),
      });
      
      const data = await response.json();
      if (data.success) {
        setShowInsights(true);
      }
    } catch (error) {
      console.error('Error posting variations:', error);
    }
  };

  return (
    <div className="min-h-screen">
      <Header />
      
      {!uploadedImage && !generatedVariations.length && (
        <Hero />
      )}
      
      <main className="container mx-auto px-4 py-6">
        {!uploadedImage ? (
          <div className="max-w-2xl mx-auto">
            <ImageUpload onImageUpload={handleImageUpload} />
            <PricingSection />
          </div>
        ) : (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gradient mb-4">
                Your Product Image
              </h2>
              <div className="max-w-md mx-auto">
                <img 
                  src={uploadedImage} 
                  alt="Uploaded product" 
                  className="w-full rounded-lg shadow-card"
                />
              </div>
            </div>

            {!generatedVariations.length ? (
              <div className="text-center">
                <button
                  onClick={handleGenerate}
                  disabled={isGenerating}
                  className="px-8 py-3 bg-gradient-to-r from-accent to-primary text-white font-semibold rounded-lg shadow-card hover:shadow-lg transition-all duration-200 disabled:opacity-50 glow-effect"
                >
                  {isGenerating ? 'Generating Variations...' : 'Generate 5 Ad Variations ($1)'}
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-center">
                  Generated Ad Variations
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {generatedVariations.map((variation, index) => (
                    <GeneratedCreativeCard
                      key={variation.id}
                      variation={variation}
                      variant={showInsights ? 'withMetrics' : 'default'}
                    />
                  ))}
                </div>
                
                {!showInsights && (
                  <div className="text-center">
                    <button
                      onClick={() => handlePost(generatedVariations.map(v => v.id))}
                      className="px-6 py-2 bg-surface text-accent font-medium rounded-lg border border-accent hover:bg-accent hover:text-white transition-colors duration-200"
                    >
                      Auto-Post to Test Account ($0.50)
                    </button>
                  </div>
                )}
              </div>
            )}

            {showInsights && (
              <PerformanceInsights variations={generatedVariations} />
            )}
          </div>
        )}
      </main>
    </div>
  );
}
