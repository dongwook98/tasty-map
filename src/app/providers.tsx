'use client';

import { PropsWithChildren } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { SessionProvider } from 'next-auth/react';
import { RecoilRoot } from 'recoil';
import { ToastContainer } from 'react-toastify';
import Navbar from '@/components/Navbar';

const queryClient = new QueryClient();

export const NextProvider = ({ children }: PropsWithChildren) => {
  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <SessionProvider>
          {children}
          <ToastContainer autoClose={1000} pauseOnFocusLoss={false} />
          <ReactQueryDevtools initialIsOpen={false} />
        </SessionProvider>
      </QueryClientProvider>
    </RecoilRoot>
  );
};

export const NextLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className='mt-[52px]'>
      <Navbar />
      {children}
    </div>
  );
};
