import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex flex-col items-center justiy-center p-12 gap-4">
      <div className="text-center">
        <h2>ElyraGames Homepage</h2>
        <h3>
          Hello <span className="text-primary">Username</span>
        </h3>
      </div>
      <Link href="/word" className="text-primary text-2xl underline">
        Word Game
      </Link>
    </main>
  );
}
