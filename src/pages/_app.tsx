import "../styles/globals.css";
import type { AppProps } from "next/app";
import wrapper from "../state/store";
import Head from "next/head";
import { HOST_TEMP, seoTags } from "../config/constants";
import { DefaultSeo } from "next-seo";

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="viewport-fit=cover" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#54ec99" />
        <meta name="msapplication-TileColor" content="#54ec99" />
        <meta name="theme-color" content="#54ec99" />

        <meta name="description" content="Minigames Website by Team Elyra" />
        <meta name="apple-mobile-web-app-title" content="ElyraMinis" />
        <meta name="application-name" content="ElyraMinis" />
      </Head>
      <DefaultSeo {...seoTags} />
      <Component {...pageProps} />
    </>
  );
}

export default wrapper.withRedux(App);
