import { useState } from 'react';
import Link from 'next/link';
import { BiMenu } from 'react-icons/bi';
import { AiOutlineClose } from 'react-icons/ai';

/**
 * 모든 페이지에 최상단에 위치하는 Navigation 컴포넌트
 */
export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className='flex justify-between items-center fixed w-full h-[52px] top-0 shadow-sm bg-white'>
        <Link
          className='text-blue-800 text-lg font-semibold cursor-pointer px-[18px] py-0'
          href='/'
        >
          Tasty map
        </Link>
        <div className='hidden md:flex gap-3 items-center px-[18px] py-0'>
          <Link href='/stores' className='cursor-pointer hover:text-gray-600'>
            맛집 목록
          </Link>
          <Link
            href='/stores/new'
            className='cursor-pointer hover:text-gray-600'
          >
            맛집 등록
          </Link>
          <Link
            href='/users/likes'
            className='cursor-pointer hover:text-gray-600'
          >
            찜한 가게
          </Link>
          <Link
            href='/users/mypage'
            className='cursor-pointer hover:text-gray-600'
          >
            마이페이지
          </Link>
          {/* {status === 'authenticated' ? (
            <button type='button' onClick={() => {}}>
              로그아웃
            </button>
          ) : (
            <Link href='/api/auth/signin' className='navbar__list--item'>
              로그인
            </Link>
          )} */}
          <Link
            href='/api/auth/signin'
            className='cursor-pointer hover:text-gray-600'
          >
            로그인
          </Link>
        </div>

        {/* mobile button */}
        <div
          role='presentation'
          className='block px-[18px] py-0 md:hidden cursor-pointer'
          onClick={() => setIsOpen((val) => !val)}
        >
          {isOpen ? <AiOutlineClose /> : <BiMenu />}
        </div>
      </div>

      {/* mobile navbar */}
      {isOpen && (
        <div className='fixed w-full text-white h-screen top-[52px] bg-blue-800'>
          <div className='flex flex-col gap-4 px-[18px] py-6'>
            <Link
              href='/stores'
              className='cursor-pointer hover:text-gray-600'
              onClick={() => setIsOpen(false)}
            >
              맛집 목록
            </Link>
            <Link
              href='/stores/new'
              className='cursor-pointer hover:text-gray-600'
              onClick={() => setIsOpen(false)}
            >
              맛집 등록
            </Link>
            <Link
              href='/users/likes'
              className='cursor-pointer hover:text-gray-600'
              onClick={() => setIsOpen(false)}
            >
              찜한 가게
            </Link>
            <Link
              href='/users/mypage'
              className='cursor-pointer hover:text-gray-600'
              onClick={() => setIsOpen(false)}
            >
              마이페이지
            </Link>
            {/* {status === 'authenticated' ? (
              <button
                type='button'
                onClick={() => {
                  setIsOpen(false);
                }}
                className='cursor-pointer hover:text-gray-600 text-left'
              >
                로그아웃
              </button>
            ) : (
              <Link
                href='/api/auth/signin'
                className='cursor-pointer hover:text-gray-600'
                onClick={() => setIsOpen(false)}
              >
                로그인
              </Link>
            )} */}
            <Link
              href='/api/auth/signin'
              className='cursor-pointer hover:text-gray-600'
              onClick={() => setIsOpen(false)}
            >
              로그인
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
