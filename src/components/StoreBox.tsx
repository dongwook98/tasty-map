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

  return (
    <div className='fixed transition ease-in-out delay-150 inset-x-0 mx-auto bottom-20 rounded-lg shadow-lg max-w-sm md:max-w-xl z-10 w-full bg-white'>
      {store && (
        <>
          <div className='p-8'>
            <div className='flex justify-between items-start'>
              <div className='flex gap-4 items-center'>
                <Image
                  src={
                    store?.category
                      ? `/images/markers/${store?.category}.png`
                      : '/images/markers/default.png'
                  }
                  width={40}
                  height={40}
                  alt='아이콘 이미지'
                />
                <div>
                  <div className='font-semibold'>{store?.name}</div>
                  <div className='text-sm'>{store?.storeType}</div>
                </div>
              </div>
              <button type='button' onClick={() => setStore(null)}>
                <AiOutlineClose />
              </button>
            </div>
            <div className='flex justify-between gap-4'>
              <div className='mt-4 flex gap-2 items-center col-span-3'>
                <HiOutlineMapPin />
                {store?.address}
              </div>
              <Like storeId={store.id} />
            </div>
            <div className='mt-2 flex gap-2 items-center'>
              <AiOutlinePhone />
              {store?.phone}
            </div>
            <div className='mt-2 flex gap-2 items-center'>
              <AiOutlineInfoCircle />
              {store?.storeType}
            </div>
            <div className='mt-2 flex gap-2 items-center'>
              <AiOutlineCheck />
              {store?.category}
            </div>
          </div>
          <button
            type='button'
            onClick={() => router.push(`/stores/${store.id}`)}
            className='w-full bg-blue-700 hover:bg-blue-500 focus:bg-blue-500 py-3 text-white font-semibold rounded-b-lg'
          >
            상세보기
          </button>
        </>
      )}
    </div>
  );
}
