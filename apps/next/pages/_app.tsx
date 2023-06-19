import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import Layout from '../components/app/Layout';
import { SessionProvider } from 'next-auth/react';
import { useEffect } from 'react';

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  useEffect(() => {
    const interval = setInterval(() => {
      const colors = ['#f00', '#0f0', '#00f', '#ff0', '#f0f', '#0ff'];
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      document.body.style.backgroundColor = randomColor;
    }, 500);
    return () => {
      clearInterval(interval);
    };
  }, []);
  return (
    <SessionProvider session={pageProps.session} refetchInterval={10}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  );
}
