'use client';

import { useCallback, useEffect } from 'react';
import { useRecoilValue, useSetRecoilState, useRecoilState } from 'recoil';

import { currentStoreState, mapState, locationState } from '@/atom';
import { StoreType } from '@/interface';

interface MarkersProps {
  stores: StoreType[];
}

/**
 * 카카오 지도 상태와 가게 데이터를 받아서 마커를 표시하는 컴포넌트
 */
export default function Markers({ stores }: MarkersProps) {
  const map = useRecoilValue(mapState);
  const setCurrentStore = useSetRecoilState(currentStoreState);
  const [location, setLocation] = useRecoilState(locationState);

  const loadKakaoMarkers = useCallback(() => {
    if (map) {
      const markers: string[] = [];

      // 식당 데이터 마커들 띄우기
      stores?.map((store) => {
        // 커스텀 마커 이미지 주소 설정
        const imageSrc = store?.category
          ? `/images/markers/${store?.category}.png`
          : '/images/markers/default.png';

        // 마커 이미지 설정
        const imageSize = new window.kakao.maps.Size(40, 40);
        const imageOption = { offset: new window.kakao.maps.Point(27, 69) };
        const markerImage = new window.kakao.maps.MarkerImage(
          imageSrc,
          imageSize,
          imageOption
        );

        // 마커 위치 설정
        const markerPosition = new window.kakao.maps.LatLng(
          store?.lat,
          store?.lng
        );

        // 마커 생성
        const marker = new window.kakao.maps.Marker({
          position: markerPosition,
          image: markerImage, // 마커이미지 설정
        });

        markers.push(marker);

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

        // 사용자가 선택한 가게 저장
        window.kakao.maps.event.addListener(marker, 'click', () => {
          setCurrentStore(store);
          setLocation({ ...location, lat: store.lat, lng: store.lng });
        });
      });

      // 클러스터러 생성
      const clusterer = new window.kakao.maps.MarkerClusterer({
        map: map, // 클러스터를 적용할 지도
        averageCenter: true, // 클러스터의 중심을 평균값으로 설정
        minLevel: 7, // 줌 레벨 7 이하에서 클러스터링 적용
      });

      // 클러스터러에 마커 추가
      clusterer.addMarkers(markers);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [map, stores]);

  useEffect(() => {
    loadKakaoMarkers();
  }, [loadKakaoMarkers, map]);

  return null;
}
