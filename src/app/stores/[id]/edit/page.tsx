'use client';

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { CATEGORY_ARR, FOOD_CERTIFY_ARR, STORE_TYPE_ARR } from '@/data/store';
import AddressSearch from '@/components/AddressSearch';
import { StoreType } from '@/interface';
import { useQuery } from '@tanstack/react-query';
import { fetchStoreDetail, updateStore } from '@/apis/stores';
import Loader from '@/components/Loader';

export default function StoreEditPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const id = params.id;

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<StoreType>();

  const { isError, isFetching } = useQuery<StoreType>({
    queryKey: [`store-${id}`],
    queryFn: async () => {
      const result = await fetchStoreDetail(parseInt(id));
      setValue('id', result.id);
      setValue('name', result.name);
      setValue('category', result.category);
      setValue('phone', result.phone);
      setValue('address', result.address);
      setValue('lat', result.lat);
      setValue('lng', result.lng);
      setValue('storeType', result.storeType);
      setValue('foodCertifyName', result.foodCertifyName);
      return result;
    },
    enabled: !!id,
    refetchOnWindowFocus: false,
  });

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
    <form
      className='px-4 md:max-w-4xl mx-auto py-8'
      onSubmit={handleSubmit(async (data) => {
        try {
          const result = await updateStore(data);

          if (result.status === 200) {
            toast.success('맛집을 등록했습니다.');
            router.replace(`/stores/${result.data.id}`);
          } else {
            toast.error('서버 에러.. 잠시 후 다시 시도해주세요.');
          }
        } catch (error) {
          console.error(error);
          toast.error('네트워크 에러.. 잠시 후 다시 시도해주세요.');
        }
      })}
    >
      <div className='space-y-12'>
        <div className='border-b border-gray-900/10 pb-12'>
          <h2 className='text-base/7 font-semibold text-gray-900'>맛집 등록</h2>
          <p className='mt-1 text-sm/6 text-gray-600'>
            아래 내용을 입력해서 맛집을 등록해주세요.
          </p>

          <div className='mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6'>
            <div className='sm:col-span-3'>
              <label
                htmlFor='name'
                className='block text-sm font-medium leading-6 text-gray-900'
              >
                가게명
              </label>
              <div className='mt-2'>
                <input
                  type='text'
                  id='name'
                  {...register('name', { required: true })}
                  placeholder='가게명 입력'
                  className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 outline-none px-2 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                />
                {errors.name?.type === 'required' && (
                  <p className='pt-2 text-xs text-red-600'>
                    해당 항목은 필수 입력 값입니다.
                  </p>
                )}
              </div>
            </div>

            <div className='sm:col-span-3'>
              <label
                htmlFor='category'
                className='block text-sm font-medium leading-6 text-gray-900'
              >
                카테고리
              </label>
              <div className='mt-2'>
                <select
                  id='category'
                  {...register('category', { required: true })}
                  className='block w-full rounded-md border-0 px-2 outline-none py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                >
                  <option value=''>카테고리 선택</option>
                  {CATEGORY_ARR.map((category) => (
                    <option value={category} key={category}>
                      {category}
                    </option>
                  ))}
                </select>
                {errors.category?.type === 'required' && (
                  <p className='pt-2 text-xs text-red-600'>
                    필수 입력사항입니다.
                  </p>
                )}
              </div>
            </div>

            <div className='sm:col-span-3'>
              <label
                htmlFor='phone'
                className='block text-sm font-medium leading-6 text-gray-900'
              >
                연락처
              </label>
              <div className='mt-2'>
                <input
                  id='phone'
                  {...register('phone', { required: true })}
                  className='block w-full rounded-md border-0 outline-none px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                />
                {errors.phone?.type === 'required' && (
                  <p className='pt-2 text-xs text-red-600'>
                    필수 입력사항입니다.
                  </p>
                )}
              </div>
            </div>
            <AddressSearch
              register={register}
              errors={errors}
              setValue={setValue}
            />
            <div className='sm:col-span-3 sm:col-start-1'>
              <label
                htmlFor='foodCertifyName'
                className='block text-sm font-medium leading-6 text-gray-900'
              >
                식품인증구분
              </label>
              <div className='mt-2'>
                <select
                  id='foodCertifyName'
                  {...register('foodCertifyName', { required: true })}
                  className='block w-full rounded-md border-0 py-2 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                >
                  <option value=''>식품인증구분 선택</option>
                  {FOOD_CERTIFY_ARR.map((data) => (
                    <option value={data} key={data}>
                      {data}
                    </option>
                  ))}
                </select>
                {errors.foodCertifyName?.type === 'required' && (
                  <p className='pt-2 text-xs text-red-600'>
                    필수 입력항목입니다.
                  </p>
                )}
              </div>
            </div>

            <div className='sm:col-span-3'>
              <label
                htmlFor='storeType'
                className='block text-sm font-medium leading-6 text-gray-900'
              >
                업종구분
              </label>
              <div className='mt-2'>
                <select
                  id='storeType'
                  {...register('storeType', { required: true })}
                  className='block w-full rounded-md border-0 py-2 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                >
                  <option value=''>업종구분 선택</option>
                  {STORE_TYPE_ARR.map((data) => (
                    <option value={data} key={data}>
                      {data}
                    </option>
                  ))}
                </select>
                {errors.storeType?.type === 'required' && (
                  <p className='pt-2 text-xs text-red-600'>
                    필수 입력사항입니다.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='mt-6 flex items-center justify-end gap-x-6'>
        <button
          type='button'
          className='block text-sm font-medium leading-6 text-gray-900'
          onClick={() => router.back()}
        >
          뒤로가기
        </button>
        <button
          type='submit'
          className='rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
        >
          제출하기
        </button>
      </div>
    </form>
  );
}
