import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { useSession } from 'next-auth/react';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import axios from 'axios';

import { fetchStoreDetail } from '@/apis/stores';
import { StoreType } from '@/interface';

interface LikeProps {
  storeId: number;
}

export default function Like({ storeId }: LikeProps) {
  const { data: session, status } = useSession();

  const { data: store, refetch } = useQuery<StoreType>({
    queryKey: [`like-store-${storeId}`],
    queryFn: () => fetchStoreDetail(storeId),
    enabled: !!storeId,
    refetchOnWindowFocus: false,
  });

  const toggleLike = async () => {
    // 찜하기/찜취소 로직
    if (session?.user && store) {
      try {
        const res = await axios.post('/api/likes', {
          storeId: store.id,
        });
        if (res.status === 201) {
          toast.success('해당 맛집 좋아요 했습니다.');
        } else {
          toast.warn('해당 맛집 좋아요를 취소했습니다.');
        }
        refetch();
      } catch (error) {
        console.error(error);
        toast.error('네트워크 에러.. 잠시 후 다시 시도해주세요.');
      }
    } else if (status === 'unauthenticated') {
      toast.warn('로그인 후 이용해주세요.');
    }
  };

  return (
    <button type='button' onClick={toggleLike}>
      {/* 로그인된 사용자가 좋아요를 눌렀다면? */}
      {status === 'authenticated' && store?.likes?.length ? (
        <AiFillHeart className='hover:text-red-600 focus:text-red-600 text-red-500' />
      ) : (
        <AiOutlineHeart className='hover:text-red-600 focus:text-red-600' />
      )}
    </button>
  );
}
