import '@/styles/globals.css';

import { TooltipProvider } from '@/components/ui/tooltip-desktop';
import { APP_NAME_AR, APP_NAME_EN, TEAM_NAME_EN } from '@/config/constants';

import type { Metadata } from 'next';
import { Cairo } from 'next/font/google';
import { Toaster } from 'react-hot-toast';

const font = Cairo({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: `${APP_NAME_EN} | ${APP_NAME_AR}`,
  description: `Minigames Website by ${TEAM_NAME_EN}`,
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
