import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { APP_NAME } from "../config/constants";

const Home: NextPage = () => {
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
