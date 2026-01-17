import NicknameProvider from '@/components/providers/nickname-provider';

export default async function GamesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <NicknameProvider>
      {children}
      {/* <Footer /> */}
    </NicknameProvider>
  );
}
