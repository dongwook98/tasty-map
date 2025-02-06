'use client';

import { Fragment, useCallback, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useRecoilValue } from 'recoil';

import { searchState } from '@/atom';
import { StoreType } from '@/interface';
import ListLoading from '@/components/ListLoading';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';
import Loader from '@/components/Loader';
import { fetchStores } from '@/apis/stores';
import StoreItem from '@/components/StoreItem';
import SearchFilter from '@/components/SearchFilter';

export default function StoreListPage() {
  const search = useRecoilValue(searchState);
  const ref = useRef<HTMLDivElement>(null);
  const pageRef = useIntersectionObserver(ref, {});
  const isPageEnd = pageRef?.isIntersecting;

  const searchParams = {
    q: search?.q,
    district: search?.district,
  };

  const {
    data: stores,
    isFetching,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    isError,
    isLoading,
  } = useInfiniteQuery({
    queryKey: ['stores', searchParams],
    queryFn: ({ pageParam }) => fetchStores(pageParam, searchParams),
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
      <SearchFilter />
      <ul role='list' className='divide-y divide-gray-300'>
        {isLoading ? (
          <ListLoading />
        ) : (
          stores?.pages.map((page, index) => (
            <Fragment key={index}>
              {page.data.map((store: StoreType) => (
                <Link href={`/stores/${store.id}`} key={store.id}>
                  <StoreItem store={store} />
                </Link>
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
