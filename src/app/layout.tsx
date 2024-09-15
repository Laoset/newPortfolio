import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Alan Kevin Corman Samanamud',
  description:
    'Portfolio of Alan Kevin Corman Samanamud, Frontend Developer from Argentina, Buenos Aires',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' className='dark'>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
