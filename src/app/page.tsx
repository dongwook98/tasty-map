import Map from '@/components/Map';
import Markers from '@/components/Markers';
import StoreBox from '@/components/StoreBox';
import { StoreType } from '@/interface';
import CurrentLocationButton from '@/components/CurrentLocationButton';

export default async function HomePage() {
  const stores: StoreType[] = await getAllStores();

  return (
    <>
      <Map />
      <Markers stores={stores} />
      <StoreBox />
      <CurrentLocationButton />
    </>
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
