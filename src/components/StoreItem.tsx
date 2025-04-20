import Image from 'next/image';
import { StoreType } from '@/interface';
import { HiOutlineMapPin } from 'react-icons/hi2';

interface StoreItemProps {
  store: StoreType;
}

export default function StoreItem({ store }: StoreItemProps) {
  return (
    <div className='flex items-start gap-4 p-4 hover:bg-neutral-50 transition-colors rounded-lg'>
      <div className='bg-primary-100 p-2 rounded-lg flex-shrink-0'>
        <Image
          src={
            store?.category
              ? `/images/markers/${store?.category}.png`
              : '/images/markers/default.png'
          }
          width={40}
          height={40}
          alt='가게 아이콘'
          className='object-contain'
        />
      </div>
      
      <div className='flex-1 min-w-0'>
        <h3 className='font-semibold text-neutral-900 truncate'>{store?.name}</h3>
        <div className='mt-1 flex items-start gap-1 text-neutral-600'>
          <HiOutlineMapPin className='w-4 h-4 flex-shrink-0 mt-0.5' />
          <p className='text-sm truncate'>{store?.address}</p>
        </div>
        <div className='mt-2 flex items-center gap-2'>
          <span className='inline-flex items-center rounded-full bg-primary-50 px-2 py-1 text-xs font-medium text-primary-700'>
            {store?.category || '기타'}
          </span>
          <span className='inline-flex items-center rounded-full bg-neutral-100 px-2 py-1 text-xs font-medium text-neutral-700'>
            {store?.storeType || '일반음식점'}
          </span>
        </div>
      </div>
    </div>
  );
}
