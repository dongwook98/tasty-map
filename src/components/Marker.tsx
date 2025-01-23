import { useEffect } from 'react';

import { StoreType } from '@/interface';

interface MarkerProps {
  map: any;
  store: StoreType;
}
/**
 * 카카오 지도 상태와 가게 데이터를 받아서 마커 한개를 표시하는 컴포넌트
 */
export default function Marker({ map, store }: MarkerProps) {
  const loadKakaoMarker = () => {
    if (map && store) {
      // 식당 데이터 마커 하나 띄우기

      // 커스텀 마커 이미지 주소 설정
      const imageSrc = store?.category
        ? `/images/markers/${store?.category}.png`
        : '/images/markers/default.png';

      // 커스텀 마커 이미지 크기 설정
      const imageSize = new window.kakao.maps.Size(40, 40);

      // 마커이미지의 옵션, 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정
      const imageOption = { offset: new window.kakao.maps.Point(27, 69) };

      // 마커의 이미지정보를 가지고 있는 마커이미지를 생성
      const markerImage = new window.kakao.maps.MarkerImage(
        imageSrc,
        imageSize,
        imageOption
      );

      // 마커가 표시될 위치 설정
      const markerPosition = new window.kakao.maps.LatLng(
        store?.lat,
        store?.lng
      );

      // 마커를 생성
      const marker = new window.kakao.maps.Marker({
        position: markerPosition,
        image: markerImage, // 마커이미지 설정
      });

      // 마커가 지도 위에 표시되도록 설정
      marker.setMap(map);

      // 마커 커서가 오버되었을 때 마커 위에 표시할 인포윈도우 생성
      const content = `<div class='infowindow'>${store?.name}</div>`; // 인포윈도우에 표시될 내용

      // 커스텀 오버레이를 생성
      const customOverlay = new window.kakao.maps.CustomOverlay({
        position: markerPosition,
        content: content,
        xAnchor: 0.6,
        yAnchor: 0.91,
      });

      // 마커에 마우스오버 이벤트를 등록
      window.kakao.maps.event.addListener(marker, 'mouseover', function () {
        // 마커에 마우스오버 이벤트가 발생하면 커스텀 오버레이를 마커위에 표시
        customOverlay.setMap(map, marker);
      });

      // 마커에 마우스아웃 이벤트를 등록
      window.kakao.maps.event.addListener(marker, 'mouseout', function () {
        // 마커에 마우스아웃 이벤트가 발생하면 커스텀 오버레이를 제거
        customOverlay.setMap(null);
      });
    }
  };

  useEffect(() => {
    loadKakaoMarker();
  }, [map]);

  return null;
}
