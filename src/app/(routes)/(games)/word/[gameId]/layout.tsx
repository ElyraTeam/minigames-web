import WordChatContainer from './_components/chat/word-chat-container';
import WordRoomInfoContainer from './_components/info/word-room-info-container';

export default async function WordGameLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-[275px_minmax(600px,1fr)_275px] h-screen justify-center items-stretch gap-6 py-12 px-6">
      <WordRoomInfoContainer />
      {children}
      <WordChatContainer />
    </div>
  );
}
