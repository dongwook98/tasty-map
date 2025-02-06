'use client';

import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { toast } from 'react-toastify';
import { MdOutlineMyLocation } from 'react-icons/md';

import FullPageLoader from './FullPageLoader';
import { mapState } from '@/atom';

export default function CurrentLocationButton() {
  const map = useRecoilValue(mapState);
  const [loading, setLoading] = useState(false);
  const handleCurrentPosition = () => {
    setLoading(true);

    const options = {
      enableHighAccuracy: false,
      timeout: 5000,
      maximumAge: Infinity,
    };

    if (navigator.geolocation && map) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const currentPosition = new window.kakao.maps.LatLng(
            position.coords.latitude,
            position.coords.longitude
          );

          if (currentPosition) {
            setLoading(false);
            map.panTo(currentPosition);
            toast.success('현재 위치로 이동되었습니다.');
          }

          return currentPosition;
        },
        () => {
          toast.error('현재 위치를 가져올 수 없습니다.');
          setLoading(false);
        },
        options
      );
    }
  };
  return (
    <>
      {loading && <FullPageLoader />}
      <button
        type='button'
        onClick={handleCurrentPosition}
        className='fixed z-10 p-3 shadow right-10 bottom-20 bg-blue-100 rounded-md hover:shadow-lg focus:shadow-lg hover:bg-blue-200'
      >
        <MdOutlineMyLocation className='w-5 h-5' />
      </button>
    </>
  );
}
