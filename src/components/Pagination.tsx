import Link from 'next/link';

interface PaginationProps {
  totalPageCount: number;
  currentPage: string;
  pathname: string;
}

export default function Pagination({
  totalPageCount,
  currentPage,
  pathname,
}: PaginationProps) {
  const current = parseInt(currentPage, 10);
  
  return (
    <div className='flex justify-center items-center gap-2 my-8'>
      {current > 1 && (
        <Link
          href={{
            pathname: pathname,
            query: { page: current - 1 },
          }}
        >
          <span className='inline-flex h-9 w-9 items-center justify-center rounded-md border border-neutral-300 bg-white text-sm font-medium text-neutral-700 hover:bg-neutral-50'>
            &lt;
          </span>
        </Link>
      )}
      
      {totalPageCount <= 7 ? (
        // 페이지가 7개 이하면 모두 표시
        [...Array(totalPageCount)].map((_, index) => (
          <Link
            href={{ pathname: pathname, query: { page: index + 1 } }}
            key={index}
          >
            <span
              className={`inline-flex h-9 w-9 items-center justify-center rounded-md text-sm font-medium ${
                index + 1 === current
                  ? 'bg-primary-600 text-white'
                  : 'border border-neutral-300 bg-white text-neutral-700 hover:bg-neutral-50'
              }`}
            >
              {index + 1}
            </span>
          </Link>
        ))
      ) : (
        // 페이지가 7개 초과면 현재 페이지 주변과 처음/끝 페이지만 표시
        <>
          {/* 첫 페이지 */}
          <Link href={{ pathname: pathname, query: { page: 1 } }}>
            <span
              className={`inline-flex h-9 w-9 items-center justify-center rounded-md text-sm font-medium ${
                current === 1
                  ? 'bg-primary-600 text-white'
                  : 'border border-neutral-300 bg-white text-neutral-700 hover:bg-neutral-50'
              }`}
            >
              1
            </span>
          </Link>
          
          {/* 현재 페이지가 4보다 크면 ... 표시 */}
          {current > 4 && (
            <span className='inline-flex h-9 items-center justify-center text-neutral-500'>
              ...
            </span>
          )}
          
          {/* 현재 페이지 주변 페이지들 */}
          {[...Array(5)].map((_, index) => {
            const pageNum = Math.max(2, current - 2) + index;
            if (pageNum > 1 && pageNum < totalPageCount) {
              return (
                <Link
                  href={{ pathname: pathname, query: { page: pageNum } }}
                  key={pageNum}
                >
                  <span
                    className={`inline-flex h-9 w-9 items-center justify-center rounded-md text-sm font-medium ${
                      pageNum === current
                        ? 'bg-primary-600 text-white'
                        : 'border border-neutral-300 bg-white text-neutral-700 hover:bg-neutral-50'
                    }`}
                  >
                    {pageNum}
                  </span>
                </Link>
              );
            }
            return null;
          })}
          
          {/* 현재 페이지가 totalPageCount-3보다 작으면 ... 표시 */}
          {current < totalPageCount - 3 && (
            <span className='inline-flex h-9 items-center justify-center text-neutral-500'>
              ...
            </span>
          )}
          
          {/* 마지막 페이지 */}
          <Link
            href={{ pathname: pathname, query: { page: totalPageCount } }}
          >
            <span
              className={`inline-flex h-9 w-9 items-center justify-center rounded-md text-sm font-medium ${
                current === totalPageCount
                  ? 'bg-primary-600 text-white'
                  : 'border border-neutral-300 bg-white text-neutral-700 hover:bg-neutral-50'
              }`}
            >
              {totalPageCount}
            </span>
          </Link>
        </>
      )}
      
      {current < totalPageCount && (
        <Link
          href={{
            pathname: pathname,
            query: { page: current + 1 },
          }}
        >
          <span className='inline-flex h-9 w-9 items-center justify-center rounded-md border border-neutral-300 bg-white text-sm font-medium text-neutral-700 hover:bg-neutral-50'>
            &gt;
          </span>
        </Link>
      )}
    </div>
  );
}
