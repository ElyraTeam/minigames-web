'use client';

import { useState } from 'react';

import WordButton from '@/components/word/word-button';
import MaintenanceModal from '@/components/modals/maintenance-modal';

interface WordPublicRoomsButtonProps {}

const WordPublicRoomsButton: React.FC<WordPublicRoomsButtonProps> = ({}) => {
  const [isMaintenanceOpen, setMaintenanceOpen] = useState(false);

  return (
    <>
      <MaintenanceModal
        isOpen={isMaintenanceOpen}
        onOpenChange={(open) => setMaintenanceOpen(open)}
      />
      <WordButton
        variant="outline"
        className="
          rounded-2xl text-lg
          hover:bg-white/10
        "
        onClick={() => setMaintenanceOpen(true)}
      >
        جميع الغرف
      </WordButton>
    </>
  );
};

export default WordPublicRoomsButton;
