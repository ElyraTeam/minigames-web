'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';

import useLocalStore from '@/state/local';
import ElyraLogo from '@/components/ui/elyra-logo';
import WordLogo from '@/components/word/word-logo';
import SlideButton from '@/components/ui/slide-button';
import AuthorLinks from '@/components/about/author-links';
import LanguageSelect from '@/components/ui/language-select';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { MAX_NICKNAME_LENGTH, MIN_NICKNAME_LENGTH } from '@/config/constants';

import AuthorModal from './author-modal';

interface NicknameModalProps {
  isOpen: boolean;
}

const NicknameModal: React.FC<NicknameModalProps> = ({ isOpen }) => {
  const t = useTranslations('NicknameModal');
  const [newName, setNewName] = useState<string | null | undefined>(null);
  const { nickname, setNickname, setShowNicknameModal } = useLocalStore();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setNewName(nickname);
  }, [nickname]);

  function updateNickname() {
    if (loading) return false;
    setLoading(true);
    if (
      !newName ||
      newName.trim().length < MIN_NICKNAME_LENGTH ||
      newName.trim().length > MAX_NICKNAME_LENGTH
    ) {
      setLoading(false);
      return;
    }
    setNickname(newName.trim());
    setLoading(false);
    setShowNicknameModal(false);
  }

  // Hide close button if user doesn't have a nickname yet (first time)
  const canClose = !!nickname;

  const handleOpenChange = (open: boolean) => {
    if (!open && canClose) {
      setShowNicknameModal(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent
        className="border-none bg-white p-0 pt-0"
        hideCloseButton={!canClose}
        onPointerDownOutside={(e) => !canClose && e.preventDefault()}
        onEscapeKeyDown={(e) => !canClose && e.preventDefault()}
        onInteractOutside={(e) => !canClose && e.preventDefault()}
      >
        <div className="pt-8 pb-6">
          <div className="
            flex flex-col items-center gap-8 px-12 pb-7
            sm:px-16
          ">
            <WordLogo size={100} />
            <h2 className="text-2xl font-semibold">{t('title')}</h2>
            <LanguageSelect />
            <SlideButton
              onInputTextChange={setNewName}
              center
              label={t('label')}
              initialValue={nickname || ''}
              onKeyPress={(k) => k === 'Enter' && updateNickname()}
              placeholderLabel={t('placeholder')}
              className="w-[250px]"
              maxLength={MAX_NICKNAME_LENGTH}
            >
              <Image
                onClick={updateNickname}
                src="/svg/send.svg"
                width="25"
                height="25"
                alt="send-icon"
              />
            </SlideButton>
            <div className="flex flex-col items-center gap-1">
              <p className="text-sm font-semibold">{t('developedBy')}</p>
              <AuthorModal>
                <ElyraLogo size={50} isWhite={false} />
              </AuthorModal>
            </div>
          </div>
          <div className="border-t-2 border-t-black/10">
            <AuthorLinks />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NicknameModal;
