import '@/styles/globals.css';

import { Cairo } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import type { Metadata, Viewport } from 'next';

import { TooltipProvider } from '@/components/ui/tooltip-desktop';
import { APP_NAME_EN, HOST, TEAM_NAME_EN } from '@/config/constants';

const font = Cairo({ subsets: ['latin'] });

export const viewport: Viewport = {
  themeColor: '#A86CCD',
};

export const metadata: Metadata = {
  title: {
    default: APP_NAME_EN,
    template: `${APP_NAME_EN} | %s`,
  },
  description: `Minigames Website by ${TEAM_NAME_EN}`,
  metadataBase: new URL(HOST),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="rtl">
      <body className={font.className}>
        <Toaster position="top-center" />
        <TooltipProvider>{children}</TooltipProvider>
      </body>
    </html>
  );
}
