import '../styles/globals.css';
import type { AppProps } from 'next/app';
import wrapper from '../state/store';
import Head from 'next/head';

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="viewport-fit=cover" />
      </Head>
      <Component {...pageProps} />
    </>
  )
}

export default wrapper.withRedux(App);
