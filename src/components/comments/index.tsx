import { useSession } from 'next-auth/react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

import CommentForm from './CommentForm';
import { CommentApiResponse } from '@/interface';
import CommentList from './CommentList';
import Pagination from '../Pagination';

interface CommentProps {
  storeId: number;
  page: string;
}

export default function Comments({ storeId, page = '1' }: CommentProps) {
  const { status } = useSession();

  const fetchComments = async () => {
    const result = await axios(
      `/api/comments?storeId=${storeId}&limit=5&page=${page}`
    );

    return result.data as CommentApiResponse;
  };

  const { data: comments, refetch } = useQuery({
    queryKey: [`comments-${storeId}-${page}`],
    queryFn: fetchComments,
    enabled: !!storeId,
    refetchOnWindowFocus: false,
  });

  return (
    <div className='md:max-w-2xl py-8 px-2 mb-20 mx-auto'>
      {status === 'authenticated' && (
        <CommentForm storeId={storeId} refetch={refetch} />
      )}
      <CommentList comments={comments} />
      <Pagination
        currentPage={page as string}
        totalPageCount={comments?.totalPage as number}
        pathname={`/stores/${storeId}`}
      />
    </div>
  );
}
