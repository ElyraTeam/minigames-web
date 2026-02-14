'use client';

import { MdError } from 'react-icons/md';

interface ErrorProps {
  error: Error;
}

export default function ErrorPage({ error }: ErrorProps) {
  return (
    <div className="
      flex h-screen flex-col items-center justify-center gap-6 text-4xl
    ">
      <MdError className="size-24 text-danger" />
      {error.message}
    </div>
  );
}
