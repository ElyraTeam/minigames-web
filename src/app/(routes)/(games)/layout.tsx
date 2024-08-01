import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

import getNicknameFromCookies from '@/actions/get-nickname';
import NicknameProvider from '@/components/providers/nickname-provider';

export default async function GamesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headersList = headers();
  const nickname = getNicknameFromCookies();
  const pathname = headersList.get('next-url');
  console.log('layout', pathname);
  if (!nickname)
    redirect(`/getstarted?next=${encodeURIComponent(pathname ?? '') ?? ''}`);

  return (
    <NicknameProvider nickname={nickname}>
      {children}
      {/* <Footer /> */}
    </NicknameProvider>
  );
}
