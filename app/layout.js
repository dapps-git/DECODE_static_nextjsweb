import './globals.css';

export const metadata = {
  title: 'DECODE AUTO DIAGNOSING HUB | Mampad, PIN: 676542 | PH: 9567386024',
  description:
    'DECODE AUTO DIAGNOSING HUB, Mampad (PIN 676542, PH: 9567386024). Exclusively for German & European Premium Vehicles. Advanced Electrical, Mechanical, AC, PMS, Performance, Accessories, Used Spares, and Digital Service History.',
  keywords: [
    'Decode Auto Diagnosing Hub',
    'German car repair Mampad',
    'Mampad 676542',
    'BMW Audi Mercedes Porsche coding',
    'Auto electrical',
    'Auto scanning',
    'Car AC service Mampad',
    'Kerala European car workshop',
  ],
  openGraph: {
    title: 'DECODE AUTO DIAGNOSING HUB | Mampad PIN 676542',
    description:
      'Exclusively for German & European Premium Vehicles in Mampad, PIN Code: 676542. Call 9567386024.',
    images: ['/images/hero-building.jpg'],
    type: 'website',
  },
  icons: {
    icon: '/images/logo.png',
    apple: '/images/logo.png',
  },
};

export const viewport = {
  themeColor: '#ffffff',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/images/logo.png" />
      </head>
      <body>{children}</body>
    </html>
  );
}
