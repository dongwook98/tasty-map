'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { toast } from 'react-toastify';

import { deleteStore, fetchStoreDetail } from '@/apis/stores';
import Loader from '@/components/Loader';
import Map from '@/components/Map';
import Marker from '@/components/Marker';
import Like from '@/components/Like';
import Comments from '@/components/comments';

export default function StoreDetailPage({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { page: string };
}) {
  const router = useRouter();
  const id = params.id;
  const { status } = useSession();

  const {
    data: store,
    isFetching,
    isError,
    isSuccess,
  } = useQuery({
    queryKey: [`store-${id}`],
    queryFn: () => fetchStoreDetail(Number(id)),
    enabled: !!id,
    refetchOnWindowFocus: false,
  });

  const handleDelete = async () => {
    const confirm = window.confirm('해당 맛집을 삭제하시겠습니까?');

    if (confirm) {
      try {
        const result = await deleteStore(id as string);
        if (result.status === 200) {
          toast.success('가게를 삭제했습니다.');
          router.replace('/');
        } else {
          toast.error('서버 에러.. 다시 시도해주세요.');
        }
      } catch (error) {
        console.error(error);
        toast.error('네트워크 에러.. 잠시 후 다시 시도해주세요.');
      }
    }
  };

  if (isError) {
    return (
      <div className='w-full h-screen mx-auto pt-[10%] text-red-500 text-center font-semibold'>
        다시 시도해주세요
      </div>
    );
  }

  if (isFetching) {
    return <Loader className='mt-[20%]' />;
  }

  return (
    <>
      <div className='max-w-5xl mx-auto px-4 py-8'>
        <div className='md:flex justify-between items-center py-4 md:py-0'>
          <div className='px-4 sm:px-0'>
            <h3 className='text-base font-semibold leading-7 text-gray-900'>
              {store?.name}
            </h3>
            <p className='mt-1 max-w-2xl text-sm leading-6 text-gray-500'>
              {store?.address}
            </p>
          </div>
          {status === 'authenticated' && store && (
            <div className='flex items-center gap-4 px-4 py-3'>
              <Like storeId={store?.id} />
              <Link
                href={`/stores/${store?.id}/edit`}
                className='underline hover:text-gray-400 text-sm'
              >
                수정
              </Link>
              <button
                type='button'
                onClick={handleDelete}
                className='underline hover:text-gray-400 text-sm'
              >
                삭제
              </button>
            </div>
          )}
        </div>

        <div className='mt-6 border-t border-gray-100'>
          <dl className='divide-y divide-gray-100'>
            <div className='px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
              <dt className='text-sm font-medium leading-6 text-gray-900'>
                카테고리
              </dt>
              <dd className='mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0'>
                {store?.category}
              </dd>
            </div>
            <div className='px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
              <dt className='text-sm font-medium leading-6 text-gray-900'>
                주소
              </dt>
              <dd className='mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0'>
                {store?.address}
              </dd>
            </div>
            <div className='px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
              <dt className='text-sm font-medium leading-6 text-gray-900'>
                위도
              </dt>
              <dd className='mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0'>
                {store?.lat}
              </dd>
            </div>
            <div className='px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
              <dt className='text-sm font-medium leading-6 text-gray-900'>
                경도
              </dt>
              <dd className='mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0'>
                {store?.lng}
              </dd>
            </div>
            <div className='px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
              <dt className='text-sm font-medium leading-6 text-gray-900'>
                연락처
              </dt>
              <dd className='mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0'>
                {store?.phone}
              </dd>
            </div>
            <div className='px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
              <dt className='text-sm font-medium leading-6 text-gray-900'>
                식품인증구분
              </dt>
              <dd className='mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0'>
                {store?.foodCertifyName}
              </dd>
            </div>
            <div className='px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
              <dt className='text-sm font-medium leading-6 text-gray-900'>
                업종명
              </dt>
              <dd className='mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0'>
                {store?.storeType}
              </dd>
            </div>
          </dl>
        </div>
      </div>
      {isSuccess && (
        <>
          <div className='overflow-hidden w-full mb-20 max-w-5xl mx-auto max-h-[600px]'>
            <Map lat={store?.lat} lng={store?.lng} zoom={1} />
            <Marker store={store} />
          </div>
          <Comments storeId={store.id} page={searchParams.page} />
        </>
      )}
    </>
  );
}
