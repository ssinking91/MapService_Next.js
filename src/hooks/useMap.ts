import { useCallback } from 'react';
import useSWR, { mutate } from 'swr';
import type { Coordinates } from '@/types/store';
import type { NaverMap } from '@/types/map';

export const INITIAL_CENTER: Coordinates = [37.5262411, 126.99289439];
export const INITIAL_ZOOM = 10;

export const MAP_KEY = '/map';

const useMap = () => {
  const { data: map } = useSWR(MAP_KEY);

  // 새로운 map데이터를 인자로 받아 그 데이터를 전역 상태로 저장
  const initializeMap = useCallback((map: NaverMap) => {
    mutate(MAP_KEY, map);
  }, []);

  // INITIAL_CENTER와 INITIAL_ZOOM으로 map의 좌표와 zoom 레벨을 변경
  // morph를 사용하여 부드러운 UX로 화면이 전환
  const resetMapOptions = useCallback(() => {
    /** https://navermaps.github.io/maps.js.ncp/docs/naver.maps.Map.html#morph__anchor */
    map.morph(new naver.maps.LatLng(...INITIAL_CENTER), INITIAL_ZOOM);
  }, [map]);

  // 네이버 지도 객체의 getCenter method와 getZoom method를 이용하여 현재 map의 중심 좌표와 zoom 레벨을 return함
  const getMapOptions = useCallback(() => {
    const mapCenter = map.getCenter();
    const center: Coordinates = [mapCenter.lat(), mapCenter.lng()];
    const zoom = map.getZoom();

    return { center, zoom };
  }, [map]);

  return {
    initializeMap,
    resetMapOptions,
    getMapOptions,
  };
};
export default useMap;
