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
      <div className="
        flex min-h-screen flex-col bg-word-game-600 pt-[102px] pb-[80px]
        lg:grid lg:h-screen lg:max-h-screen
        lg:grid-cols-[minmax(200px,275px)_minmax(550px,1fr)_minmax(200px,275px)]
        lg:items-stretch lg:justify-center lg:gap-4 lg:overflow-hidden
        lg:bg-transparent lg:px-6 lg:pt-12 lg:pb-12
      ">
        {/* Sidebar - Room Info (desktop only) */}
        <div className="
          hidden
          lg:flex lg:min-h-0 lg:flex-col
        ">
          <WordRoomInfoContainer />
        </div>

        {/* Main Content */}
        {children}

        {/* Sidebar - Chat (desktop only) */}
        <div className="
          hidden
          lg:flex lg:min-h-0 lg:flex-col
        ">
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
