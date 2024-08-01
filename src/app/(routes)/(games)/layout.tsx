import { CookiesProvider } from 'next-client-cookies/server';

import NicknameProvider from '@/components/providers/nickname-provider';

export default async function GamesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CookiesProvider>
      <NicknameProvider>
        {children}
        {/* <Footer /> */}
      </NicknameProvider>
    </CookiesProvider>
  );
}
