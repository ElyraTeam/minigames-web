import WordChat from './_components/chat/word-chat';
import WordRoomInfoContainer from './_components/info/word-room-info-container';

export default async function WordGameLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid grid-rows-[600px_600px] grid-cols-none lg:grid-rows-none lg:grid-cols-[minmax(200px,275px)_minmax(550px,1fr)_minmax(200px,275px)] lg:h-screen lg:justify-center items-stretch gap-4 py-8 px-3 lg:py-12 lg:px-6">
      <WordRoomInfoContainer />
      {children}
      <WordChat />
    </div>
  );
}
