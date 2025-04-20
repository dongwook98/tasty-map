'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';
import {
  MdOutlineRestaurantMenu,
  MdOutlineMap,
  MdOutlinePerson,
} from 'react-icons/md';
import { AiOutlineHeart } from 'react-icons/ai';

export default function Navbar() {
  const pathname = usePathname();
  const { status } = useSession();

  return (
    <div className='fixed top-0 left-0 w-full z-50 bg-white shadow-md'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between h-14'>
          <div className='flex'>
            <Link href='/' className='flex items-center'>
              <span className='text-primary-600 font-bold text-xl'>
                맛집지도
              </span>
            </Link>
          </div>

          <div className='flex items-center space-x-1 md:space-x-4'>
            <Link
              href='/'
              className={`flex flex-col items-center p-2 rounded-lg transition-colors ${
                pathname === '/'
                  ? 'text-primary-600'
                  : 'text-neutral-500 hover:text-primary-600 hover:bg-neutral-50'
              }`}
            >
              <MdOutlineMap className='h-5 w-5' />
              <span className='text-xs mt-1'>지도</span>
            </Link>

            <Link
              href='/stores'
              className={`flex flex-col items-center p-2 rounded-lg transition-colors ${
                pathname === '/stores'
                  ? 'text-primary-600'
                  : 'text-neutral-500 hover:text-primary-600 hover:bg-neutral-50'
              }`}
            >
              <MdOutlineRestaurantMenu className='h-5 w-5' />
              <span className='text-xs mt-1'>맛집목록</span>
            </Link>

            {status === 'authenticated' && (
              <>
                <Link
                  href='/users/likes'
                  className={`flex flex-col items-center p-2 rounded-lg transition-colors ${
                    pathname === '/users/likes'
                      ? 'text-primary-600'
                      : 'text-neutral-500 hover:text-primary-600 hover:bg-neutral-50'
                  }`}
                >
                  <AiOutlineHeart className='h-5 w-5' />
                  <span className='text-xs mt-1'>찜목록</span>
                </Link>

                <Link
                  href='/stores/new'
                  className={`flex flex-col items-center p-2 rounded-lg transition-colors ${
                    pathname === '/stores/new'
                      ? 'text-primary-600'
                      : 'text-neutral-500 hover:text-primary-600 hover:bg-neutral-50'
                  }`}
                >
                  <MdOutlineRestaurantMenu className='h-5 w-5' />
                  <span className='text-xs mt-1'>맛집 등록</span>
                </Link>

                <Link
                  href='/users/mypage'
                  className={`flex flex-col items-center p-2 rounded-lg transition-colors ${
                    pathname === '/users/mypage'
                      ? 'text-primary-600'
                      : 'text-neutral-500 hover:text-primary-600 hover:bg-neutral-50'
                  }`}
                >
                  <MdOutlinePerson className='h-5 w-5' />
                  <span className='text-xs mt-1'>내정보</span>
                </Link>
              </>
            )}

            {status === 'unauthenticated' && (
              <Link href='/users/login' className='btn btn-primary text-sm'>
                로그인
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
