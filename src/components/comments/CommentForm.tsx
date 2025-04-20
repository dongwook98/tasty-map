import axios from 'axios';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

interface CommentFormProps {
  storeId: number;
  refetch: () => void;
}

export default function CommentForm({ storeId, refetch }: CommentFormProps) {
  const {
    register,
    handleSubmit,
    resetField,
    formState: { errors },
  } = useForm();

  return (
    <form
      onSubmit={handleSubmit(async (data) => {
        try {
          const result = await axios.post('/api/comments', {
            storeId,
            body: data.body,
          });

          if (result.status === 200) {
            toast.success('댓글이 등록되었습니다.');
            resetField('body');
            refetch();
          } else {
            toast.error('다시 시도해주세요.');
          }
        } catch (error) {
          console.error(error);
        }
      })}
      className='mt-8'
    >
      <div className='flex flex-col space-y-2'>
        <label htmlFor='body' className='text-sm font-medium text-neutral-700'>
          리뷰 작성
        </label>
        <textarea
          id='body'
          rows={3}
          {...register('body', { required: true })}
          className='block w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 text-neutral-900 shadow-sm outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500 resize-none'
          placeholder='이 맛집에 대한 리뷰를 남겨주세요'
        />
        {errors.body && (
          <p className='text-red-500 text-xs'>리뷰 내용을 입력해주세요.</p>
        )}
      </div>
      <div className='mt-4 flex justify-end'>
        <button
          type='submit'
          className='btn btn-primary px-4 py-2 text-sm'
        >
          등록하기
        </button>
      </div>
    </form>
  );
}
