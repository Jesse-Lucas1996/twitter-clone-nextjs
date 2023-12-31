import { SessionProvider } from 'next-auth/react';
import '@/styles/globals.css';

import type { AppProps } from 'next/app';
import type { Session } from 'next-auth';
import Head from 'next/head';

// Use of the <SessionProvider> is mandatory to allow components that call
// `useSession()` anywhere in your application to access the `session` object.
export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps<{ session: Session }>) {
  return (
    <SessionProvider session={session}>
      <Head>
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
      </Head>
      <Component {...pageProps} />
    </SessionProvider>
  );
}