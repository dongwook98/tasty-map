import { PropsWithChildren } from 'react';

import Navbar from './Navbar';

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div className='mt-[52px]'>
      <Navbar />
      {children}
    </div>
  );
}
