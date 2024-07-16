import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import Footer from '@/components/ui/footer';
import NicknameProvider from '@/components/providers/nickname-provider';

export default async function GamesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = cookies();
  const nickname = cookieStore.get('nextjs.session');
  if (!nickname) redirect('/getstarted');

  return (
    <NicknameProvider nickname={nickname.value}>
      {children}
      <Footer />
    </NicknameProvider>
  );
}
