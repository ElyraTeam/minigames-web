import Link from 'next/link';
import { Metadata } from 'next';
import { Suspense } from 'react';

import { APP_NAME_EN } from '@/config/constants';
import ElyraLogo from '@/components/ui/elyra-logo';
import WordLogo from '@/components/word/word-logo';
import AuthorLinks from '@/components/about/author-links';
import AuthorModal from '@/components/modals/author-modal';
import WordBackground from '@/components/word/word-background';

import NameInput from './_components/name-input';

export const metadata: Metadata = {
  title: `${APP_NAME_EN} | Get Started`,
};

export default function GetStarted() {
  return (
    <WordBackground className="word-dark-background flex flex-col items-center justify-center h-screen gap-24">
      <div className="bg-white rounded-3xl pt-8 pb-6">
        <div className="flex flex-col items-center gap-8 px-12 sm:px-16 pb-7">
          <Link href="/word">
            <WordLogo size={100} className="cursor-pointer" />
          </Link>
          <h2 className="text-2xl font-semibold">مرحبًا بك في كلمة!</h2>
          <Suspense>
            <NameInput />
          </Suspense>
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
    </WordBackground>
  );
}
