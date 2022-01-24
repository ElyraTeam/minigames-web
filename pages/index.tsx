import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';

const Home: NextPage = () => {
  return (
    <div className="home-main">
      <Head>
        <title>BianMinis</title>
      </Head>

      <h2>Homepage</h2>
      <Link href="/games/word"><p className="text-primary cursor-pointer">Word Game</p></Link>
    </div>
  );
};

export default Home;
