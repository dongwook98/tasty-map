import { useRecoilState } from 'recoil';
import { AiOutlineSearch } from 'react-icons/ai';
import { HiOutlineAdjustmentsHorizontal } from 'react-icons/hi2';

import { searchState } from '@/atom';
import { DISTRICT_ARR } from '@/data/store';

export default function SearchFilter() {
  const [search, setSearch] = useRecoilState(searchState);

  return (
    <div className='bg-white rounded-xl shadow-sm p-4 mb-6'>
      <div className='flex flex-col md:flex-row gap-3'>
        <div className='flex items-center w-full relative'>
          <AiOutlineSearch className='w-5 h-5 text-neutral-500 absolute left-3' />
          <input
            type='search'
            onChange={(e) => setSearch({ ...search, q: e.target.value })}
            placeholder='음식점 검색'
            className='block w-full pl-10 pr-3 py-2.5 text-sm text-neutral-900 border border-neutral-300 rounded-lg bg-white outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all'
          />
        </div>
        
        <div className='relative md:w-64'>
          <HiOutlineAdjustmentsHorizontal className='w-5 h-5 text-neutral-500 absolute left-3 top-1/2 transform -translate-y-1/2' />
          <select
            onChange={(e) => setSearch({ ...search, district: e.target.value })}
            className='appearance-none bg-white border border-neutral-300 text-neutral-900 text-sm rounded-lg pl-10 pr-8 py-2.5 w-full outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all'
          >
            <option value=''>지역 선택</option>
            {DISTRICT_ARR.map((data) => (
              <option value={data} key={data}>
                {data}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-neutral-500">
            <svg className="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
