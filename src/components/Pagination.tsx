import Link from 'next/link';

interface PaginationProps {
  totalPageCount?: number;
  currentPage: string;
  pathname: string;
}

export default function Pagination({
  totalPageCount = 0,
  currentPage,
  pathname,
}: PaginationProps) {
  return (
    <div className='py-6 w-full px-10 flex justify-center gap-3 bg-white my-10 flex-wrap text-black'>
      {totalPageCount <= 10 ? (
        [...Array(totalPageCount)].map((_, index) => (
          <Link
            href={{ pathname: pathname, query: { page: index + 1 } }}
            key={index}
          >
            <span
              className={`px-3 py-2 rounded border shadow-md bg-white ${
                index + 1 === parseInt(currentPage, 10)
                  ? 'text-blue-600 font-bold'
                  : 'text-gray-300'
              }`}
            >
              {index + 1}
            </span>
          </Link>
        ))
      ) : (
        <>
          {parseInt(currentPage) > 1 && (
            <Link
              href={{
                pathname: pathname,
                query: { page: parseInt(currentPage) - 1 },
              }}
            >
              <span className='px-3 py-2 rounded border shadow-sm bg-white'>
                이전
              </span>
            </Link>
          )}
          <Link
            href={{
              pathname: pathname,
              query: { page: parseInt(currentPage) },
            }}
          >
            <span
              className={`px-3 py-2 rounded border shadow-md bg-white text-blue-600`}
            >
              {currentPage}
            </span>
          </Link>
          {totalPageCount > parseInt(currentPage) && (
            <Link
              href={{
                pathname: pathname,
                query: { page: parseInt(currentPage) + 1 },
              }}
            >
              <span className='px-3 py-2 rounded border shadow-sm bg-white'>
                다음
              </span>
            </Link>
          )}
        </>
      )}
    </div>
  );
}
