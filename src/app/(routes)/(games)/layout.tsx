import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

import Footer from '@/components/ui/footer';
import getNicknameFromCookies from '@/actions/get-nickname';
import NicknameProvider from '@/components/providers/nickname-provider';

export default async function GamesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headersList = headers();
  const nickname = getNicknameFromCookies();
  const pathname = headersList.get('x-current-path')!;
  console.log('layout', pathname, headersList);

  if (!nickname)
    redirect(`/getstarted?next=${encodeURIComponent(pathname) ?? ''}`);

  return (
    <NicknameProvider nickname={nickname}>
      {children}
      <Footer />
    </NicknameProvider>
  );
}
