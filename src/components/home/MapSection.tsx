import { useMemo } from 'react';
import { useRouter } from 'next/router';
import Map from './Map';
import Markers from './Markers';
import useMap, { INITIAL_CENTER, INITIAL_ZOOM } from '@/hooks/useMap';
import useCurrentStore from '@/hooks/useCurrentStore';
import type { NaverMap } from '@/types/map';
import type { Coordinates } from '@/types/store';

const MapSection = () => {
  /** url query 로부터 initial zoom, center 값 설정 */
  const router = useRouter();
  /**
   * router.asPath === '/?zoom={}&lat={}&lng={}'
   * https://developer.mozilla.org/ko/docs/Web/API/URLSearchParams
   */

  // url을 공유 받았을 때 바로 해당 좌표로 이동하는 기능 구현(지도 서비스 공유하기 기능)
  // URLSearchParams class를 사용하여 새로운 URLSearchParams 객체 생성
  const query = useMemo(() => new URLSearchParams(router.asPath.slice(1)), []); // eslint-disable-line react-hooks/exhaustive-deps

  // url query parameter에 'zoom'이 있다면 그 zoom 값을 initialZoom으로 사용하고 url parameter에 없다면 기존의 INITIAL_ZOOM 값을 그대로 사용함
  const initialZoom = useMemo(
    () => (query.get('zoom') ? Number(query.get('zoom')) : INITIAL_ZOOM),
    [query]
  );

  // url query parameter에  위경도('lat'과 'lng') 값이 있다면 그 위경도 값을 initialCenter로 사용하고 url parameter에 없다면 기존의 INITIAL_CENTER 값을 그대로 사용함
  const initialCenter = useMemo<Coordinates>(
    () =>
      query.get('lat') && query.get('lng')
        ? [Number(query.get('lat')), Number(query.get('lng'))]
        : INITIAL_CENTER,
    [query]
  );

  /** onLoadMap */
  const { initializeMap } = useMap();
  const { clearCurrentStore } = useCurrentStore();

  const onLoadMap = (map: NaverMap) => {
    initializeMap(map);
    naver.maps.Event.addListener(map, 'click', clearCurrentStore);
  };

  return (
    <>
      <Map
        onLoad={onLoadMap}
        initialCenter={initialCenter}
        initialZoom={initialZoom}
      />
      <Markers />
    </>
  );
};
export default MapSection;
