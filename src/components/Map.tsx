/*global kakao*/

import Script from 'next/script';
import * as stores from '@/data/store_data.json';

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    kakao: any;
  }
}

const DEFAULT_LAT = 37.497625203;
const DEFAULT_LNG = 127.03088379;

export default function Map() {
  const loadKaKaoMap = () => {
    window.kakao.maps.load(() => {
      const mapContainer = document.getElementById('map');
      const mapOption = {
        center: new window.kakao.maps.LatLng(DEFAULT_LAT, DEFAULT_LNG),
        level: 3,
      };

      const map = new window.kakao.maps.Map(mapContainer, mapOption);

      // 식당 데이터 마커 띄우기
      stores?.['DATA'].map((store) => {
        // 마커가 표시될 위치입니다
        const markerPosition = new window.kakao.maps.LatLng(
          store?.y_dnts,
          store?.x_cnts
        );

        // 마커를 생성
        const marker = new window.kakao.maps.Marker({
          position: markerPosition,
        });

        // 마커가 지도 위에 표시되도록 설정
        marker.setMap(map);
      });
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
