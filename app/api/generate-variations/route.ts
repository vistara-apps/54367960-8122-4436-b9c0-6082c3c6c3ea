import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

export async function POST(request: NextRequest) {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY || '',
    baseURL: "https://openrouter.ai/api/v1",
    dangerouslyAllowBrowser: true,
  });
  try {
    const { imageUrl } = await request.json();

    if (!imageUrl) {
      return NextResponse.json({ error: 'Image URL is required' }, { status: 400 });
    }

    // Generate 5 different ad variation prompts
    const prompts = [
      "Professional product showcase with modern clean background, studio lighting, minimalist design",
      "Dynamic lifestyle shot with vibrant colors, action elements, energetic mood",
      "Elegant luxury presentation with premium materials, soft shadows, sophisticated atmosphere",
      "Bold graphic design with geometric shapes, high contrast colors, contemporary style",
      "Warm ambient setting with natural textures, cozy atmosphere, authentic feel"
    ];

    const variations = [];

    // Generate variations using DALL-E
    for (let i = 0; i < 5; i++) {
      try {
        const response = await openai.images.generate({
          model: "dall-e-3",
          prompt: `Create an advertisement variation of a product: ${prompts[i]}. Make it suitable for social media advertising, high quality, eye-catching`,
          n: 1,
          size: "1024x1024",
        });

        if (response.data && response.data[0]) {
          variations.push({
            id: `var_${Date.now()}_${i}`,
            imageUrl: response.data[0].url,
            prompt: prompts[i],
            createdAt: new Date().toISOString(),
            // Mock performance metrics for demo
            performanceMetrics: {
              views: Math.floor(Math.random() * 5000) + 1000,
              clicks: Math.floor(Math.random() * 200) + 20,
              likes: Math.floor(Math.random() * 100) + 10,
            }
          });
        }
      } catch (error) {
        console.error(`Error generating variation ${i}:`, error);
        // Add a fallback/placeholder variation
        variations.push({
          id: `var_${Date.now()}_${i}`,
          imageUrl: imageUrl, // Use original image as fallback
          prompt: prompts[i],
          createdAt: new Date().toISOString(),
          performanceMetrics: {
            views: Math.floor(Math.random() * 5000) + 1000,
            clicks: Math.floor(Math.random() * 200) + 20,
            likes: Math.floor(Math.random() * 100) + 10,
          }
        });
      }
    }

    return NextResponse.json({
      success: true,
      variations,
    });

  } catch (error) {
    console.error('Error generating variations:', error);
    return NextResponse.json(
      { error: 'Failed to generate variations' },
      { status: 500 }
    );
  }
}
