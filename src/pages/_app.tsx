// src/pages/_app.tsx
import '../styles/globals.css';
import Head from 'next/head';
import { AppProps } from 'next/app';
import ParticlesComponent from '../components/ParticlesComponent';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Weight Tracker</title>
        <meta name="description" content="Track your weight easily" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&display=swap" />
      </Head>
      <ParticlesComponent />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
