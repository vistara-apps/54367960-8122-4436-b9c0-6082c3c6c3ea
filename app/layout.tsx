import { Providers } from './providers';
import './globals.css';

export const metadata = {
  title: 'AdSpark Remix - AI Ad Variation Generator',
  description: 'Instantly spin & test social ad variations with AI',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="gradient-bg cosmic-bg min-h-screen">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
