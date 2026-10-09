import './globals.css';
import { AppProvider } from '@/context/AppContext';
import SiteLayoutShell from '@/components/SiteLayoutShell';

export const metadata = {
  title: 'KCSTours | Sri Lanka Luxury Tours, Private Chauffeurs & Tailor-Made Holidays',
  description: 'Discover Sri Lanka with KCSTours. Tailor-made private chauffeur tours, luxury wildlife safaris, scenic tea train journeys, boutique villas, and airport transfers. Certified Sri Lanka Tourism Partner.',
  keywords: 'Sri Lanka tours, Sri Lanka private driver, Sigiriya tours, Yala safari, Ella scenic train, Sri Lanka holiday packages, Galle fort, Sri Lanka luxury hotels',
  icons: {
    icon: '/images/logo.png',
  },
  openGraph: {
    title: 'KCSTours - Explore Sri Lanka. Your Way.',
    description: 'Experience the teardrop island with Sri Lanka’s leading bespoke travel partner. 100% customized private journeys.',
    images: ['/images/logo.png'],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body>
        <AppProvider>
          <SiteLayoutShell>
            {children}
          </SiteLayoutShell>
        </AppProvider>
      </body>
    </html>
  );
}
