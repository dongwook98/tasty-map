'use client';

import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import ListLoading from '@/components/ListLoading';
import StoreItem from '@/components/StoreItem';
import { LikeApiResponse, LikeInterface, StoreType } from '@/interface';
import Pagination from '@/components/Pagination';

export default function LikesPage({
  searchParams,
}: {
  searchParams: { page: string };
}) {
  const page = searchParams.page || '1';

  const fetchLikes = async () => {
    const { data } = await axios(`/api/likes?limit=10&page=${page}`);
    return data as LikeApiResponse;
  };

  const {
    data: likes,
    isLoading,
    isError,
    isSuccess,
  } = useQuery<LikeApiResponse>({
    queryKey: [`likes-${page}`],
    queryFn: fetchLikes,
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
      <h3 className='text-lg font-semibold'>찜한 맛집</h3>
      <div className='mt-1 text-gray-500 text-sm'>찜한 가게 리스트입니다.</div>
      <ul role='list' className='divide-y divide-gray-300 mt-10'>
        {isLoading ? (
          <ListLoading />
        ) : (
          likes?.data.map((like: LikeInterface, index) => (
            <Link href={`/stores/${like.storeId}`} key={index}>
              <StoreItem store={like.store as StoreType} />
            </Link>
          ))
        )}
        {isSuccess && !!!likes.data.length && (
          <div className='p-4 border border-gray-200 rounded-md text-sm text-gray-400'>
            찜한 가게가 없습니다.
          </div>
        )}
      </ul>
      <Pagination
        totalPageCount={likes?.totalPage as number}
        currentPage={page as string}
        pathname='/users/likes'
      />
    </div>
  );
}
