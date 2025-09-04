import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
  dangerouslyAllowBrowser: true,
});

export async function generateAdVariations(originalImageDescription: string) {
  try {
    // Generate creative prompts for ad variations
    const promptResponse = await openai.chat.completions.create({
      model: "google/gemini-2.0-flash-001",
      messages: [
        {
          role: "system",
          content: "You are an expert creative director specializing in social media advertising. Generate 5 distinct, creative prompts for ad variations that would perform well on social platforms."
        },
        {
          role: "user",
          content: `Create 5 different advertising creative prompts for a product based on this description: "${originalImageDescription}". Each prompt should target different emotions and visual styles suitable for social media ads. Make them diverse in style, color scheme, and mood.`
        }
      ],
    });

    const promptsText = promptResponse.choices[0]?.message?.content || '';
    const prompts = promptsText.split('\n')
      .filter(line => line.trim().length > 10)
      .slice(0, 5);

    // Generate images for each prompt
    const variations = [];
    
    for (let i = 0; i < prompts.length; i++) {
      try {
        const imageResponse = await openai.images.generate({
          model: "dall-e-3",
          prompt: `Social media advertisement: ${prompts[i]}. Professional quality, eye-catching, optimized for mobile viewing`,
          n: 1,
          size: "1024x1024",
          quality: "standard",
        });

        if (imageResponse.data && imageResponse.data[0]) {
          variations.push({
            prompt: prompts[i],
            imageUrl: imageResponse.data[0].url,
          });
        }
      } catch (error) {
        console.error(`Error generating image for prompt ${i}:`, error);
      }
    }

    return variations;
  } catch (error) {
    console.error('Error in generateAdVariations:', error);
    throw error;
  }
}

export async function generateAdCopy(productDescription: string, style: string) {
  try {
    const response = await openai.chat.completions.create({
      model: "google/gemini-2.0-flash-001",
      messages: [
        {
          role: "system",
          content: "You are an expert copywriter specializing in high-converting social media ads. Write compelling, concise ad copy that drives engagement and conversions."
        },
        {
          role: "user",
          content: `Write compelling ad copy for a ${productDescription} in a ${style} style. The copy should be suitable for social media platforms, under 150 characters, and include a clear call-to-action.`
        }
      ],
      max_tokens: 100,
    });

    return response.choices[0]?.message?.content || '';
  } catch (error) {
    console.error('Error generating ad copy:', error);
    throw error;
  }
}

export { openai };
