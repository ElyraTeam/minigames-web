import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { APP_NAME } from '../config/constants';
import useNickname from '../helpers/hooks/useNickname';

const Home: NextPage = () => {
  const router = useRouter();
  const nickname = useNickname();
  useEffect(() => {
    if (!nickname) {
      router.replace('/getstarted');
    }
  }, []);
  return (
    <div className="home-main text-center">
      <Head>
        <title>{APP_NAME}</title>
      </Head>

      <h2 className="text-3xl mt-8">ElyraGames Homepage</h2>
      <p className="text-3xl mb-4">Hello <span className="text-primary">{nickname}</span></p>
      <Link href="/word">
        <p className="text-primary cursor-pointer underline text-xl">Word Game</p>
      </Link>
    </div>
  );
};

export default Home;
