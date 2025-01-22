import { Fragment, useCallback, useEffect, useRef } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import Image from 'next/image';

import { StoreType } from '@/interface';
import ListLoading from '@/components/ListLoading';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';
import Loader from '@/components/Loader';
import { fetchStores } from '@/apis/stores';

export default function StoreListPage() {
  const ref = useRef<HTMLDivElement | null>(null);
  const pageRef = useIntersectionObserver(ref, {});
  const isPageEnd = pageRef?.isIntersecting;

  const {
    data: stores,
    isFetching,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    isError,
    isLoading,
  } = useInfiniteQuery({
    queryKey: ['stores'],
    queryFn: ({ pageParam }) => fetchStores(pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.data.length > 0 ? lastPage.page + 1 : undefined,
  });

  const fetchNextPageWrapper = useCallback(async () => {
    const res = await fetchNextPage();
    if (res.isError) {
      console.error(res.error);
    }
  }, [fetchNextPage]);

  useEffect(() => {
    let timerId: NodeJS.Timeout | undefined;

    if (isPageEnd && hasNextPage) {
      timerId = setTimeout(() => {
        fetchNextPageWrapper();
      }, 500);
    }

    return () => clearTimeout(timerId);
  }, [fetchNextPageWrapper, isPageEnd, hasNextPage]);

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
          stores?.pages.map((page, index) => (
            <Fragment key={index}>
              {page.data.map((store: StoreType, index: number) => (
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
            </Fragment>
          ))
        )}
      </ul>
      {(isFetching || hasNextPage || isFetchingNextPage) && <Loader />}
      {/* Page 끝부분, 무한 스크롤 시작을 감지하는 영역 */}
      <div className='w-full touch-none h-10 mb-10' ref={ref} />
    </div>
  );
}
