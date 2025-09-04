# AdSpark Remix - AI Ad Variation Generator

A Next.js Base Mini App that instantly generates and tests social media ad variations with AI.

## Features

- **AI Ad Variation Generator**: Upload a product image and generate 5 unique ad variations using OpenAI's DALL-E
- **Automated Social Poster**: Auto-post variations to test social media accounts via Farcaster
- **Performance Insights**: Track engagement metrics and get AI-powered recommendations
- **Performance-Biased Generation**: Learn from performance data to improve future generations

## Tech Stack

- **Framework**: Next.js 15 with TypeScript
- **Styling**: Tailwind CSS with custom design system
- **Blockchain**: Base network integration via OnchainKit
- **AI**: OpenAI DALL-E 3 for image generation, GPT for copy generation
- **Database**: Supabase for data persistence
- **Payments**: Stripe for micro-transactions
- **Social**: Neynar API for Farcaster integration

## Getting Started

1. **Clone and install dependencies:**
   ```bash
   git clone <repo-url>
   cd adspark-remix
   npm install
   ```

2. **Set up environment variables:**
   Copy `.env.local` and fill in your API keys:
   - OnchainKit API key
   - OpenAI API key  
   - Supabase URL and keys
   - Stripe keys
   - Neynar API key

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Open [http://localhost:3000](http://localhost:3000)**

## Business Model

- **$1.00** for 5 AI-generated ad variations
- **$0.50** per auto-post cycle to test accounts
- **$8.00** Starter Pack (10 generations, saves $2)

## Database Schema

### Users
- userId (farcaster_fid or wallet address)
- createdAt
- paymentInfo

### AdCampaigns
- campaignId
- userId
- originalImageURL
- createdAt
- status

### AdVariations
- variationId
- campaignId
- generatedImageURL
- prompt
- createdAt
- postedToPlatform
- performanceMetrics (views, clicks, likes)

## API Routes

- `/api/generate-variations` - Generate AI ad variations
- `/api/post-variations` - Post variations to social platforms
- `/api/performance` - Fetch performance metrics

## Design System

- **Colors**: Dark theme with accent colors (hsl(190 100% 40%)) and primary (hsl(240 100% 50%))
- **Typography**: Modern sans-serif with gradient text effects
- **Components**: Glass morphism effects with subtle animations
- **Layout**: Responsive grid system with fluid 2-column layout

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.
