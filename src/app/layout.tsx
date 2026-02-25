import '@/styles/globals.css';

import { Cairo } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import type { Metadata, Viewport } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages } from 'next-intl/server';

import { TooltipProvider } from '@/components/ui/tooltip-desktop';
import { APP_NAME_EN, HOST, TEAM_NAME_EN } from '@/config/constants';

const font = Cairo({ subsets: ['latin', 'arabic'] });

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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const messages = await getMessages();
  const dir = locale === 'ar' ? 'rtl' : 'ltr';

  return (
    <html lang={locale} dir={dir}>
      <body className={font.className}>
        <NextIntlClientProvider messages={messages}>
          <Toaster position="top-center" containerStyle={{ zIndex: 999999 }} />
          <TooltipProvider>{children}</TooltipProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
