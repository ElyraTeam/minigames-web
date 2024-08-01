'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';
import { ImExit } from 'react-icons/im';
import { useRouter } from 'next/navigation';
import { FaInfoCircle, FaShareAlt } from 'react-icons/fa';
import { IoVolumeMute, IoVolumeHigh } from 'react-icons/io5';

import useGameStore from '@/state/game';
import { leaveRoom } from '@/api/rooms';
import useLocalStore from '@/state/local';
import { HOST } from '@/config/constants';
import ConfirmModal from '@/components/modals/confirm-modal';

import WordGameIcon from './word-game-icon';

interface WordGameIconsProps {}

const WordGameIcons: React.FC<WordGameIconsProps> = ({}) => {
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
      router.push('/word');
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
    <div className="flex items-center gap-6">
      <ConfirmModal
        subtitle="هل انت متأكد من رغبتك بالمغادرة؟"
        isOpen={leaveModalShow}
        onOpenChange={(open) => setLeaveModalShow(open)}
        onConfirm={handleLeave}
        loading={loading}
      />
      <WordGameIcon
        onClick={toggleMute}
        active={isMuted}
        tooltip={isMuted ? 'الغاء الكتم' : 'كتم الصوت'}
      >
        {isMuted ? <IoVolumeMute /> : <IoVolumeHigh />}
      </WordGameIcon>
      <WordGameIcon onClick={handleShare} tooltip="نسخ الرابط">
        <FaShareAlt />
      </WordGameIcon>
      <WordGameIcon>
        <FaInfoCircle className="w-6 h-6" />
      </WordGameIcon>
      <div className="w-[2px] bg-word-secondary/40 h-6" />
      <WordGameIcon
        onClick={() => setLeaveModalShow(true)}
        className="hover:bg-danger"
        tooltip="خروج"
      >
        <ImExit className="text-danger group-hover:text-white transition-all" />
      </WordGameIcon>
    </div>
  );
};

export default WordGameIcons;
