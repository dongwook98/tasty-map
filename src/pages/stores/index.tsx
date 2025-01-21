import Image from 'next/image';

import { StoreType } from '@/interface';

export default function StoreListPage({ stores }: { stores: StoreType[] }) {
  return (
    <div className='px-4 md:max-w-4xl mx-auto py-8'>
      <ul role='list' className='divide-y divide-gray-300'>
        {stores.map((store, index) => (
          <li className='flex justify-between gap-x-6 py-5' key={index}>
            <div className='flex gap-x-4'>
              <Image
                src={
                  store?.category
                    ? `/images/markers/${store.category}.png`
                    : '/images/markers/default.png'
                }
                width={48}
                height={48}
                alt='아이콘 이미지'
              />
              <div>
                <div className='text-sm font-semibold leading-9 text-gray-900'>
                  {store.name}
                </div>
                <div className='mt-1 text-xs truncate leading-5 text-gray-500'>
                  {store.storeType}
                </div>
              </div>
              <div className='hidden sm:flex sm:flex-col sm:items-end'>
                <div className='text-sm font-semibold leading-9 text-gray-900'>
                  {store.address}
                </div>
                <div className='mt-1 text-xs truncate leading-5 text-gray-500'>
                  {store.phone ?? '번호없음'} | {store.foodCertifyName} |{' '}
                  {store.category}
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

// getServerSideProps: 요청시 매번 데이터 페칭
export async function getServerSideProps() {
  const stores = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/stores`
  ).then((res) => res.json());

  return {
    props: { stores },
  };
}
