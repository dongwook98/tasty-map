import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

import CommentForm from './CommentForm';
import { CommentApiResponse } from '@/interface';
import CommentList from './CommentList';

interface CommentProps {
  storeId: number;
}

export default function Comments({ storeId }: CommentProps) {
  const { page = '1' } = useRouter().query;
  const { status } = useSession();

  const fetchComments = async () => {
    const result = await axios(
      `/api/comments?storeId=${storeId}limit=10&page=${page}`
    );

    return result.data as CommentApiResponse;
  };

  const { data: comments, refetch } = useQuery({
    queryKey: [`comments-${storeId}`],
    queryFn: fetchComments,
    enabled: !!storeId,
    refetchOnWindowFocus: false,
  });

  console.log('🚀 ~ Comments ~ comments:', comments);

  return (
    <div className='md:max-w-2xl py-8 px-2 mb-20 mx-auto'>
      {/* comment form */}
      {status === 'authenticated' && (
        <CommentForm storeId={storeId} refetch={refetch} />
      )}
      {/* comment list */}
      <CommentList comments={comments} />
    </div>
  );
}
