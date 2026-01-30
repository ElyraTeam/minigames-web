'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';

import useLocalStore from '@/state/local';
import ElyraLogo from '@/components/ui/elyra-logo';
import WordLogo from '@/components/word/word-logo';
import SlideButton from '@/components/ui/slide-button';
import AuthorLinks from '@/components/about/author-links';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { MAX_NICKNAME_LENGTH, MIN_NICKNAME_LENGTH } from '@/config/constants';

import AuthorModal from './author-modal';

interface NicknameModalProps {
  isOpen: boolean;
}

const NicknameModal: React.FC<NicknameModalProps> = ({ isOpen }) => {
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
        className="bg-white p-0 pt-0 border-none"
        hideCloseButton={!canClose}
        onPointerDownOutside={(e) => !canClose && e.preventDefault()}
        onEscapeKeyDown={(e) => !canClose && e.preventDefault()}
        onInteractOutside={(e) => !canClose && e.preventDefault()}
      >
        <div className="pt-8 pb-6">
          <div className="flex flex-col items-center gap-8 px-12 sm:px-16 pb-7">
            <WordLogo size={100} />
            <h2 className="text-2xl font-semibold">مرحبًا بك في كلمة!</h2>
            <SlideButton
              onInputTextChange={setNewName}
              center
              label="اكتب اسمك"
              initialValue={nickname || ''}
              onKeyPress={(k) => k === 'Enter' && updateNickname()}
              placeholderLabel="اكتب اسمك"
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
              <p className="text-sm font-semibold">تم التطوير بواسطة</p>
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
