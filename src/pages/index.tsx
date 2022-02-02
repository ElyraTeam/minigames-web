import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { APP_NAME } from "../config/constants";
import useNickname from "../helpers/hooks/useNickname";

const Home: NextPage = () => {
  const router = useRouter();
  const nickname = useNickname();
  useEffect(() => {
    if (nickname) {
      router.replace("/games/word");
    } else {
      router.replace("/games/getstarted");
    }
  }, []);
  return (
    <div className="home-main">
      <Head>
        <title>{APP_NAME}</title>
      </Head>

      <h2>Homepage</h2>
      <Link href="/games/getstarted">
        <p className="text-primary cursor-pointer">Word Game</p>
      </Link>
    </div>
  );
};

export default Home;
