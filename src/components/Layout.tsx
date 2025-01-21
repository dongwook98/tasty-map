import { PropsWithChildren } from 'react';

import Navbar from './Navbar';

/**
 * 모든 페이지에 적용되는 레이아웃 컴포넌트
 */
export default function Layout({ children }: PropsWithChildren) {
  return (
    <div className='mt-[52px]'>
      <Navbar />
      {children}
    </div>
  );
}
