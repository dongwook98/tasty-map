import Image from 'next/image';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

import { StoreType } from '@/interface';
import ListLoading from '@/components/ListLoading';

export default function StoreListPage() {
  const {
    isLoading,
    isError,
    data: stores,
  } = useQuery({
    queryKey: ['stores'],
    queryFn: async () => {
      const { data } = await axios(
        `${process.env.NEXT_PUBLIC_API_URL}/api/stores`
      );
      return data as StoreType[];
    },
  });

  if (isError) {
    return (
      <div className='w-full h-screen mx-auto pt-[10%] text-red-500 text-center font-semibold'>
        다시 시도해주세요.
      </div>
    );
  }

  return (
    <div className='px-4 md:max-w-4xl mx-auto py-8'>
      <ul role='list' className='divide-y divide-gray-300'>
        {isLoading ? (
          <ListLoading />
        ) : (
          stores?.map((store, index) => (
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
          ))
        )}
      </ul>
    </div>
  );
}

// // getServerSideProps: 요청시 매번 데이터 페칭
// export async function getServerSideProps() {
//   const stores = await axios(`${process.env.NEXT_PUBLIC_API_URL}/api/stores`);

//   return {
//     props: { stores: stores.data },
//   };
// }
