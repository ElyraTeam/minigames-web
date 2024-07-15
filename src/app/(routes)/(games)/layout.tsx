import '@/styles/globals.css';

import Footer from '@/components/ui/footer';

export default function GamesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <Footer />
    </>
  );
}
