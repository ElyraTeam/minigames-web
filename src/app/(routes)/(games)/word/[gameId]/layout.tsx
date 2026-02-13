import WordChatContainer from './_components/chat/word-chat-container';
import WordMobileChat from './_components/chat/word-mobile-chat';
import WordRoomInfoContainer from './_components/info/word-room-info-container';
import WordMobileHeader from './_components/mobile/word-mobile-header';
import WordMobileBottomBar from './_components/mobile/word-mobile-bottom-bar';

export default async function WordGameLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* Mobile Header */}
      <WordMobileHeader />

      {/* Main Layout */}
      <div className="bg-word-game-600 lg:bg-transparent pt-[102px] pb-[80px] lg:pt-12 lg:pb-12 lg:px-6 min-h-screen flex flex-col lg:grid lg:grid-cols-[minmax(200px,275px)_minmax(550px,1fr)_minmax(200px,275px)] lg:h-screen lg:max-h-screen lg:overflow-hidden lg:justify-center lg:items-stretch lg:gap-4">
        {/* Sidebar - Room Info (desktop only) */}
        <div className="hidden lg:flex lg:flex-col lg:min-h-0">
          <WordRoomInfoContainer />
        </div>

        {/* Main Content */}
        {children}

        {/* Sidebar - Chat (desktop only) */}
        <div className="hidden lg:flex lg:flex-col lg:min-h-0">
          <WordChatContainer />
        </div>
      </div>

      {/* Mobile Chat */}
      <WordMobileChat className="lg:hidden" />

      {/* Mobile Bottom Bar */}
      <WordMobileBottomBar />
    </>
  );
}
