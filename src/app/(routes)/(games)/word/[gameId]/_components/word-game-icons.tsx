'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';
import { ImExit } from 'react-icons/im';
import { useRouter } from 'next/navigation';
import { FaShareAlt } from 'react-icons/fa';
import { IoVolumeMute, IoVolumeHigh } from 'react-icons/io5';

import useGameStore from '@/state/game';
import { leaveRoom } from '@/api/rooms';
import useLocalStore from '@/state/local';
import { HOST } from '@/config/constants';
import ConfirmModal from '@/components/modals/confirm-modal';

import WordHeaderIcon from './word-header-icon';

interface WordGameIconsProps {
  theme?: 'light' | 'dark';
}

const WordGameIcons: React.FC<WordGameIconsProps> = ({ theme = 'dark' }) => {
  const router = useRouter();
  const isMuted = useLocalStore((state) => state.isMuted);
  const nickname = useLocalStore((state) => state.nickname);
  const toggleMute = useLocalStore((state) => state.toggleMute);
  const roomId = useGameStore((state) => state.game?.id);
  const [loading, setLoading] = useState(false);
  const [leaveModalShow, setLeaveModalShow] = useState(false);

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
    <div className="flex items-center gap-3">
      <ConfirmModal
        subtitle="هل انت متأكد من رغبتك بالمغادرة؟"
        isOpen={leaveModalShow}
        onOpenChange={(open) => setLeaveModalShow(open)}
        onConfirm={handleLeave}
        loading={loading}
      />
      <WordHeaderIcon onClick={handleShare} theme={theme}>
        <FaShareAlt className="text-lg" />
      </WordHeaderIcon>
      <WordHeaderIcon onClick={toggleMute} theme={theme}>
        {isMuted ? (
          <IoVolumeMute className="text-xl" />
        ) : (
          <IoVolumeHigh className="text-xl" />
        )}
      </WordHeaderIcon>
      <WordHeaderIcon onClick={() => setLeaveModalShow(true)} variant="danger" theme={theme}>
        <ImExit className="text-xl" />
      </WordHeaderIcon>
    </div>
  );
};

export default WordGameIcons;
