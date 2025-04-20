'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useRecoilState } from 'recoil';
import {
  AiOutlineClose,
  AiOutlineInfoCircle,
  AiOutlineCheck,
  AiOutlinePhone,
} from 'react-icons/ai';
import { HiOutlineMapPin } from 'react-icons/hi2';

import { currentStoreState } from '@/atom';
import Like from './Like';

/**
 * 사용자가 클릭한 가게 정보를 박스형태로 간단하게 표시해주는 컴포넌트
 */
export default function StoreBox() {
  const [store, setStore] = useRecoilState(currentStoreState);
  const router = useRouter();

  if (!store) return null;

  return (
    <div className='fixed transition-all duration-300 ease-in-out inset-x-0 mx-auto bottom-20 rounded-xl shadow-lg max-w-sm md:max-w-xl z-10 w-full bg-white overflow-hidden'>
      <div className='p-6'>
        <div className='flex justify-between items-start'>
          <div className='flex gap-4 items-center'>
            <div className='bg-primary-100 p-2 rounded-lg'>
              <Image
                src={
                  store?.category
                    ? `/images/markers/${store?.category}.png`
                    : '/images/markers/default.png'
                }
                width={36}
                height={36}
                alt='아이콘 이미지'
                className='object-contain'
              />
            </div>
            <div>
              <div className='font-bold text-lg text-neutral-900'>{store?.name}</div>
              <div className='text-sm text-neutral-600'>{store?.storeType}</div>
            </div>
          </div>
          <button 
            type='button' 
            onClick={() => setStore(null)}
            className='text-neutral-500 hover:text-neutral-700 p-1 rounded-full hover:bg-neutral-100 transition-colors'
          >
            <AiOutlineClose className='w-5 h-5' />
          </button>
        </div>
        
        <div className='mt-4 space-y-2'>
          <div className='flex items-start gap-3'>
            <HiOutlineMapPin className='w-5 h-5 text-neutral-500 mt-0.5' />
            <span className='text-neutral-700 text-sm flex-1'>{store?.address}</span>
            <Like storeId={store.id} />
          </div>
          
          <div className='flex gap-3 items-center'>
            <AiOutlinePhone className='w-5 h-5 text-neutral-500' />
            <span className='text-neutral-700 text-sm'>{store?.phone}</span>
          </div>
          
          <div className='flex gap-3 items-center'>
            <AiOutlineInfoCircle className='w-5 h-5 text-neutral-500' />
            <span className='text-neutral-700 text-sm'>{store?.storeType}</span>
          </div>
          
          <div className='flex gap-3 items-center'>
            <AiOutlineCheck className='w-5 h-5 text-neutral-500' />
            <span className='text-neutral-700 text-sm'>{store?.category}</span>
          </div>
        </div>
      </div>
      
      <button
        type='button'
        onClick={() => router.push(`/stores/${store.id}`)}
        className='w-full bg-primary-600 hover:bg-primary-700 py-3 text-white font-semibold transition-colors'
      >
        상세보기
      </button>
    </div>
  );
}
