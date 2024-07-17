'use client';

import { MdError } from 'react-icons/md';

interface ErrorProps {
  error: Error;
}

export default function ErrorPage({ error }: ErrorProps) {
  return (
    <div className="flex flex-col h-screen justify-center items-center text-4xl gap-6">
      <MdError className="text-danger w-24 h-24" />
      {error.message}
    </div>
  );
}
