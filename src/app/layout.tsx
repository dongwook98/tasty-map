import '@/styles/globals.css';
import { Metadata } from 'next';
import { PropsWithChildren } from 'react';

import { NextProvider, NextLayout } from './providers';

export const metadata: Metadata = {
  title: '맛집 지도',
  description: '맛집 지도 웹 앱',
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang='en'>
      <body>
        <NextProvider>
          <NextLayout>{children}</NextLayout>
        </NextProvider>
      </body>
    </html>
  );
}
