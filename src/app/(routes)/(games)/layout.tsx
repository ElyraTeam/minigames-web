import { redirect } from 'next/navigation';

import Footer from '@/components/ui/footer';
import getNicknameFromCookies from '@/actions/get-nickname';
import NicknameProvider from '@/components/providers/nickname-provider';

export default async function GamesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const nickname = getNicknameFromCookies();

  if (!nickname) redirect('/getstarted');

  return (
    <NicknameProvider nickname={nickname}>
      {children}
      <Footer />
    </NicknameProvider>
  );
}
