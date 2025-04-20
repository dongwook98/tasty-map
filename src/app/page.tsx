import Map from '@/components/Map';
import Markers from '@/components/Markers';
import StoreBox from '@/components/StoreBox';
import { StoreType } from '@/interface';
import CurrentLocationButton from '@/components/CurrentLocationButton';

export default async function HomePage() {
  const stores: StoreType[] = await getAllStores();

  return (
    <div className='relative h-[calc(100vh-52px)]'>
      <Map />
      <Markers stores={stores} />
      <StoreBox />
      <CurrentLocationButton />

      <div className='absolute top-4 left-4 right-4 z-10'>
        <div className='bg-white/90 backdrop-blur-sm p-4 rounded-xl shadow-lg max-w-md mx-auto'>
          <h1 className='text-xl font-bold text-primary-700 text-center'>
            맛집 지도
          </h1>
          <p className='text-sm text-neutral-700 text-center mt-1'>
            지도에서 맛집을 찾아보세요!
          </p>
        </div>
      </div>
    </div>
  );
}

async function getAllStores() {
  /**
   * 배포 환경에서 try catch 사용하면 에러 발생
   * 이유 - ssr을 사용하려면 next 내부에서 DynamicServerError를 잡아야하는데 try catch가 막아버림
   */
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/stores`,
    {
      cache: 'no-store',
    }
  );

  return response.json();
}
