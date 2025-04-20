import Link from 'next/link';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useSession } from 'next-auth/react';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { HiOutlineTrash } from 'react-icons/hi2';

import { CommentApiResponse } from '@/interface';

interface CommentListProps {
  comments?: CommentApiResponse;
  displayStore?: boolean;
}

export default function CommentList({
  comments,
  displayStore,
}: CommentListProps) {
  const { data: session } = useSession();

  const handleDeleteComment = async (id: number) => {
    const confirm = window.confirm('해당 댓글을 삭제하시겠습니까?');

    if (confirm) {
      try {
        const result = await axios.delete(`/api/comments?id=${id}`);
        if (result.status === 200) {
          toast.success('해당 댓글을 삭제했습니다.');
        } else {
          toast.error('다시 시도해주세요.');
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className='mt-8'>
      <h2 className='text-xl font-bold text-neutral-900 mb-4'>리뷰</h2>
      {comments?.data && comments?.data.length > 0 ? (
        <ul className='space-y-6'>
          {comments?.data.map((comment) => (
            <li key={comment.id} className='border-b border-neutral-200 pb-6'>
              <div className='flex justify-between items-start'>
                <div>
                  <div className='flex items-center gap-2'>
                    <p className='font-medium text-neutral-900'>
                      {comment.user?.name || '사용자'}
                    </p>
                    <p className='text-xs text-neutral-500'>
                      {format(new Date(comment.createdAt), 'PPP', { locale: ko })}
                    </p>
                  </div>
                  {displayStore && comment.store && (
                    <Link
                      href={`/stores/${comment.store.id}`}
                      className='text-sm text-primary-600 hover:underline mt-1 inline-block'
                    >
                      {comment.store.name}
                    </Link>
                  )}
                  <p className='mt-2 text-neutral-700 whitespace-pre-line'>
                    {comment.body}
                  </p>
                </div>
                
                {session?.user?.id === comment.userId && (
                  <button
                    type='button'
                    onClick={() => handleDeleteComment(comment.id)}
                    className='text-neutral-500 hover:text-red-500 p-1 rounded-full hover:bg-neutral-100 transition-colors'
                  >
                    <HiOutlineTrash className='w-5 h-5' />
                  </button>
                )}
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className='text-center py-10 text-neutral-500'>
          아직 리뷰가 없습니다. 첫 리뷰를 작성해보세요!
        </p>
      )}
    </div>
  );
}
