// eslint-disable-next-line @typescript-eslint/no-unused-vars
/*global kakao*/

import Script from 'next/script';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { locationState, mapState } from '@/atom';

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    kakao: any;
  }
}

interface MapProps {
  lat?: string | null;
  lng?: string | null;
  zoom?: number;
}

/**
 * 카카오 지도 API를 사용해 카카오 지도를 표시하는 컴포넌트
 * @returns 카카오 지도 Script, 지도 영역
 */
export default function Map({ lat, lng, zoom }: MapProps) {
  const setMap = useSetRecoilState(mapState);
  const location = useRecoilValue(locationState);

  const loadKaKaoMap = () => {
    window.kakao.maps.load(() => {
      const mapContainer = document.getElementById('map');
      const mapOption = {
        center: new window.kakao.maps.LatLng(
          lat ?? location.lat,
          lng ?? location.lng
        ),
        level: zoom ?? location.zoom,
      };

      const map = new window.kakao.maps.Map(mapContainer, mapOption);

      setMap(map);
    });
  };

  return (
    <>
      <Script
        strategy='afterInteractive'
        type='text/javascript'
        src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_CLIENT}&autoload=false`}
        onReady={loadKaKaoMap}
      />
      <div id='map' className='w-full h-screen'></div>
    </>
  );
}
