import WordBackground from '@/components/word/word-background';

export default async function WordLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <WordBackground className="text-white scrollbar-thumb-word-secondary scrollbar-track-transparent scrollbar-thumb-rounded-lg">
      {children}
    </WordBackground>
  );
}
