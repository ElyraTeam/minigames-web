import '@/styles/globals.css';

import type { Metadata } from 'next';
import { Cairo } from 'next/font/google';

import Footer from '@/components/ui/footer';

const font = Cairo({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'ElyraMinis | العاب إليرا',
  description: 'Minigames Website by Team Elyra',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="rtl">
      <body className={font.className}>
        {children}
        <Footer />
      </body>
    </html>
  );
}
