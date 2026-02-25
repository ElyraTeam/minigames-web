'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';
import { ImExit } from 'react-icons/im';
import { useRouter } from 'next/navigation';
import { FaShareAlt } from 'react-icons/fa';
import { useTranslations } from 'next-intl';

import useGameStore from '@/state/game';
import { leaveRoom } from '@/api/rooms';
import useLocalStore from '@/state/local';
import { HOST } from '@/config/constants';
import ConfirmModal from '@/components/modals/confirm-modal';

import WordHeaderIcon from './word-header-icon';
import WordSettingsPopup from './word-settings-popup';

interface WordGameIconsProps {
  theme?: 'light' | 'dark';
}

const WordGameIcons: React.FC<WordGameIconsProps> = ({ theme = 'dark' }) => {
  const t = useTranslations('WordGame');
  const router = useRouter();
  const nickname = useLocalStore((state) => state.nickname);
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
    toast.success(t('linkCopied'), { id: 'word-copy-game' });
  };

  return (
    <div className="flex items-center gap-3">
      <ConfirmModal
        subtitle={t('leaveConfirm')}
        isOpen={leaveModalShow}
        onOpenChange={(open) => setLeaveModalShow(open)}
        onConfirm={handleLeave}
        loading={loading}
      />
      <WordHeaderIcon onClick={handleShare} theme={theme}>
        <FaShareAlt className="text-lg" />
      </WordHeaderIcon>
      <WordSettingsPopup theme={theme} />
      <WordHeaderIcon
        onClick={() => setLeaveModalShow(true)}
        variant="danger"
        theme={theme}
      >
        <ImExit className="text-xl" />
      </WordHeaderIcon>
    </div>
  );
};

export default WordGameIcons;
