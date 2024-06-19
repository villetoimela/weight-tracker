import '../styles/globals.css';
import Head from 'next/head';
import { AppProps } from 'next/app';
import ParticlesComponent from '../components/ParticlesComponent';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Weight Tracker</title>
      </Head>
      <ParticlesComponent />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
