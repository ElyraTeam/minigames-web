import { APP_NAME_EN } from '@/config/constants';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: `${APP_NAME_EN} | Get Started`,
};

export default function GetStarted() {
  return (
    <main className="flex flex-col items-center justiy-center p-12 gap-4">
      <h2>ElyraGames GetStarted</h2>
    </main>
  );
}
