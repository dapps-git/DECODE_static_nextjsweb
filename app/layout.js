import './globals.css';

export const metadata = {
  title: 'DECODE AUTO DIAGNOSING HUB | German & European Premium Vehicles | Mampad',
  description:
    'Exclusively for German & European Premium Vehicles in Mampad, Edakkara-Kalasagar. Expert auto electrical, auto scanning, car AC service, vehicle programming & coding.',
  keywords: [
    'Decode Auto Diagnosing Hub',
    'German car repair Mampad',
    'European car specialist Edakkara',
    'BMW Audi Mercedes Porsche coding',
    'Auto electrical',
    'Auto scanning',
    'Car AC service Mampad',
    'Kerala European car workshop',
  ],
  openGraph: {
    title: 'DECODE AUTO DIAGNOSING HUB | Mampad, Edakkara',
    description:
      'Exclusively for German & European Premium Vehicles. Auto Electrical, Auto Scanning & Coding, Car AC Service.',
    images: ['/images/workshop.jpg'],
    type: 'website',
  },
  icons: {
    icon: '/images/logo.png',
    apple: '/images/logo.png',
  },
};

export const viewport = {
  themeColor: '#070709',
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
