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
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/stores`,
    {
      cache: 'no-store',
    }
  );

  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }

  return response.json();
}
