import Link from 'next/link';
import { Metadata } from 'next';
import { Suspense } from 'react';

import { APP_NAME_EN } from '@/config/constants';
import WordLogo from '@/components/word/word-logo';
import AuthorLinks from '@/components/about/author-links';
import AuthorModal from '@/components/modals/author-modal';

import NameInput from './_components/name-input';

export const metadata: Metadata = {
  title: `${APP_NAME_EN} | Get Started`,
};

export default function GetStarted() {
  return (
    <main className="flex flex-col items-center justify-center h-screen gap-24">
      <div className="flex flex-col items-center gap-6">
        <Link href="/word">
          <WordLogo size={100} className="cursor-pointer" />
        </Link>
        <h2 className="text-2xl font-semibold">مرحبا بك في كلمة!</h2>
      </div>
      <Suspense>
        <NameInput />
      </Suspense>
      <div className="flex flex-col items-center">
        <AuthorModal className="text-lg">تطوير</AuthorModal>
        <AuthorLinks />
      </div>
    </main>
  );
}
