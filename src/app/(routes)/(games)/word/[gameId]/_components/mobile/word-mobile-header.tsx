'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { FaShareAlt } from 'react-icons/fa';
import { IoGameController, IoVolumeMute, IoVolumeHigh } from 'react-icons/io5';
import { MdExitToApp } from 'react-icons/md';

import { cn } from '@/lib/utils';
import useGameStore from '@/state/game';
import { leaveRoom } from '@/api/rooms';
import useLocalStore from '@/state/local';
import { HOST } from '@/config/constants';
import WordLogo from '@/components/word/word-logo';
import ConfirmModal from '@/components/modals/confirm-modal';

import WordMobileSidebar from './word-mobile-sidebar';
import { ImExit } from 'react-icons/im';

interface WordMobileHeaderProps {}

const WordMobileHeader: React.FC<WordMobileHeaderProps> = ({}) => {
  const router = useRouter();
  const isMuted = useLocalStore((state) => state.isMuted);
  const nickname = useLocalStore((state) => state.nickname);
  const toggleMute = useLocalStore((state) => state.toggleMute);
  const roomId = useGameStore((state) => state.game?.id);
  const [loading, setLoading] = useState(false);
  const [leaveModalShow, setLeaveModalShow] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLeave = async () => {
    if (loading) return;
    if (!nickname) return toast.error('Nickname is not found.');
    if (!roomId) return toast.error('Room ID is not found.');
    setLoading(true);
    try {
      await leaveRoom(roomId);
      router.push('/');
    } catch (err) {
      console.error(err);
      toast.error("Couldn't leave this room.");
    }
    setLoading(false);
    setLeaveModalShow(false);
  };

  const handleShare = () => {
    navigator.clipboard.writeText(`${HOST}/word/${roomId}`);
    toast.success('تم نسخ رابط الغرفة.', { id: 'word-copy-game' });
  };

  return (
    <>
      <ConfirmModal
        subtitle="هل انت متأكد من رغبتك بالمغادرة؟"
        isOpen={leaveModalShow}
        onOpenChange={(open) => setLeaveModalShow(open)}
        onConfirm={handleLeave}
        loading={loading}
      />

      <WordMobileSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <header className="lg:hidden fixed top-0 left-0 right-0 z-50 h-[115px]">
        {/* Background layers */}
        <div className="absolute inset-0 bg-word-side-400 rounded-b-2xl shadow-[0px_5px_16.8px_0px_rgba(0,0,0,0.25)]" />
        <div className="absolute inset-0 bottom-[16px] bg-word-side-200 rounded-b-xl" />

        {/* Content */}
        <div className="relative flex items-center justify-between px-4 pt-5 pb-4">
          {/* Left side: Players button */}
          <button
            onClick={() => setSidebarOpen(true)}
            className={cn(
              'flex items-center gap-1.5',
              'border-2 border-word-side-100 bg-word-side-100/10',
              'rounded-full px-3 py-1.5',
              'transition-colors hover:bg-word-side-100/20'
            )}
          >
            <IoGameController className="text-white text-lg" />
            <span className="text-white text-base">اللاعبون</span>
          </button>

          {/* Right side: Icon buttons + Logo */}
          <div className="flex items-center flex-1 justify-evenly sm:flex-none sm:justify-end sm:gap-3">
            <IconButton onClick={handleShare}>
              <FaShareAlt className="text-lg" />
            </IconButton>

            <IconButton onClick={toggleMute}>
              {isMuted ? (
                <IoVolumeMute className="text-xl" />
              ) : (
                <IoVolumeHigh className="text-xl" />
              )}
            </IconButton>

            <IconButton onClick={() => setLeaveModalShow(true)} variant="danger">
              <ImExit className="text-xl" />
            </IconButton>

            <WordLogo size={60} />
          </div>
        </div>
      </header>
    </>
  );
};

interface IconButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'default' | 'danger';
}

const IconButton: React.FC<IconButtonProps> = ({ children, onClick, variant = 'default' }) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        'flex bg-word-side-100 items-center justify-center size-10 rounded-full',
        'transition-colors',
        variant === 'danger'
          ? 'text-danger hover:bg-danger/80'
          : 'bg-word-side-100 text-word-side-400 hover:bg-word-side-100/80'
      )}
    >
      {children}
    </button>
  );
};

export default WordMobileHeader;
