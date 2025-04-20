'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { signIn, useSession } from 'next-auth/react';
import { AiOutlineGoogle } from 'react-icons/ai';
import { SiNaver } from 'react-icons/si';
import { RiKakaoTalkFill } from 'react-icons/ri';

export default function LoginPage() {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'authenticated') {
      router.replace('/');
    }
  }, [router, status]);

  return (
    <div className='flex flex-col justify-center px-6 lg:px-8 min-h-[calc(100vh-52px)]'>
      <div className='mx-auto w-full max-w-md'>
        <div className="text-center">
          <h1 className='text-primary-600 text-3xl font-bold mb-2'>맛집지도</h1>
          <p className='text-xl font-semibold text-neutral-800 mt-6'>
            SNS 계정으로 로그인해주세요
          </p>
          <p className='mt-2 text-sm text-neutral-600'>
            계정이 없다면 자동으로 회원가입이 진행됩니다
          </p>
        </div>
        
        <div className='mt-10 space-y-4'>
          <button
            type='button'
            onClick={() => signIn('google', { callbackUrl: '/' })}
            className='flex w-full items-center justify-center gap-3 rounded-lg bg-white px-4 py-3 text-neutral-900 shadow-sm ring-1 ring-neutral-200 hover:bg-neutral-50 transition-colors'
          >
            <AiOutlineGoogle className='w-5 h-5 text-[#4285F4]' />
            <span className="text-sm font-medium">Google로 계속하기</span>
          </button>
          
          <button
            type='button'
            onClick={() => signIn('naver', { callbackUrl: '/' })}
            className='flex w-full items-center justify-center gap-3 rounded-lg bg-[#03C75A] px-4 py-3 text-white hover:bg-[#02b350] transition-colors'
          >
            <SiNaver className='w-4 h-4' />
            <span className="text-sm font-medium">네이버로 계속하기</span>
          </button>
          
          <button
            type='button'
            onClick={() => signIn('kakao', { callbackUrl: '/' })}
            className='flex w-full items-center justify-center gap-3 rounded-lg bg-[#FEE500] px-4 py-3 text-neutral-900 hover:bg-[#fdd800] transition-colors'
          >
            <RiKakaoTalkFill className='w-5 h-5' />
            <span className="text-sm font-medium">카카오로 계속하기</span>
          </button>
        </div>
      </div>
    </div>
  );
}
