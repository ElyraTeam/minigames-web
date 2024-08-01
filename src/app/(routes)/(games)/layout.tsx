import getNicknameFromCookies from '@/actions/get-nickname';
import NicknameProvider from '@/components/providers/nickname-provider';

export default async function GamesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const nickname = getNicknameFromCookies();

  return (
    <NicknameProvider nickname={nickname}>
      {children}
      {/* <Footer /> */}
    </NicknameProvider>
  );
}
