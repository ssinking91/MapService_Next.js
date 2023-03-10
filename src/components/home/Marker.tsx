import { useEffect } from 'react';
import type { Marker } from '@/types/map';

const Marker = ({ map, coordinates, icon, onClick }: Marker): null => {
  useEffect(() => {
    let marker: naver.maps.Marker | null = null;
    // mount 됐을 때 map이 있다면
    if (map) {
      /** https://navermaps.github.io/maps.js.ncp/docs/tutorial-2-Marker.html */

      // 네이버 Marker class를 이용
      marker = new naver.maps.Marker({
        // 대상 지도
        map: map,
        // 마커를 표시할 위치
        position: new naver.maps.LatLng(...coordinates),
        icon,
      });
    }

    if (onClick) {
      naver.maps.Event.addListener(marker, 'click', onClick);
    }

    return () => {
      marker?.setMap(null);
    };
  }, [map]); // eslint-disable-line react-hooks/exhaustive-deps

  return null;
};

export default Marker;
