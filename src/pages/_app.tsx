import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { SessionProvider } from 'next-auth/react';
import { RecoilRoot } from 'recoil';
import { ToastContainer } from 'react-toastify';

import Layout from '@/components/Layout';

const queryClient = new QueryClient();

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <SessionProvider session={session}>
          <Layout>
            <Component {...pageProps} />
            <ToastContainer autoClose={1000} pauseOnFocusLoss={false} />
          </Layout>
          <ReactQueryDevtools initialIsOpen={false} />
        </SessionProvider>
      </QueryClientProvider>
    </RecoilRoot>
  );
}
