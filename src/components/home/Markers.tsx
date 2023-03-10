import React from 'react';
import useSWR from 'swr';
import Marker from './Marker';
import { MAP_KEY } from '@/hooks/useMap';
import { STORE_KEY } from '@/hooks/useStores';
import useCurrentStore, { CURRENT_STORE_KEY } from '@/hooks/useCurrentStore';
import type { ImageIcon, NaverMap } from '@/types/map';
import type { Store } from '@/types/store';

const Markers = () => {
  // 키에 대한 전역 상태로 관리되고 있는 데이터를 얻을 수 있음
  const { data: map } = useSWR<NaverMap>(MAP_KEY);
  const { data: stores } = useSWR<Store[]>(STORE_KEY);

  const { data: currentStore } = useSWR<Store>(CURRENT_STORE_KEY);
  const { setCurrentStore, clearCurrentStore } = useCurrentStore();

  if (!map || !stores) return null;
  return (
    <>
      {/* 기존의 마커 */}
      {stores.map((store) => {
        return (
          <Marker
            // Marker를 그릴 대상 map
            map={map}
            // Marker를 그릴 위치(위경도)
            coordinates={store.coordinates}
            icon={generateStoreMarkerIcon(store.season, false)}
            onClick={() => {
              setCurrentStore(store);
            }}
            key={store.nid}
          />
        );
      })}
      {/* 기존의 마커는 모두 그대로 남겨주도 currentStore가 새로 생겼을 때 이 마커에 대해서만 하나의 마커를 추가로 그려주는 것*/}
      {/* 네이버 Marker는 아래에서부터 순서대로 쌓이기 때문에 나중에 생성된 Marker가 화면의 가장 위에 그려지게 됨  */}
      {currentStore && (
        <Marker
          map={map}
          coordinates={currentStore.coordinates}
          icon={generateStoreMarkerIcon(currentStore.season, true)}
          onClick={clearCurrentStore}
          key={currentStore.nid}
        />
      )}
    </>
  );
};
export default Markers;

const MARKER_HEIGHT = 64;
const MARKER_WIDTH = 54;
const NUMBER_OF_MARKER = 13;
const SCALE = 2 / 3;

// SCALE size
const SCALED_MARKER_WIDTH = MARKER_WIDTH * SCALE;
const SCALED_MARKER_HEIGHT = MARKER_HEIGHT * SCALE;

export function generateStoreMarkerIcon(
  markerIndex: number,
  isSelected: boolean
): ImageIcon {
  /** https://navermaps.github.io/maps.js.ncp/docs/tutorial-8-marker-retina-sprite.example.html */

  // 네이버 지도의 마커를 스프라이트 이미지를 이용해 생성할 때는 아래와 같은 인자들을 필요로 함
  return {
    // url : 스프라이트 이미지에 대한 경로
    // size : 하나의 아이콘에 대한 사이즈
    // origin : 스프라이트 이미지에서 몇 번째 아이콘을 사용할 것인지에 대한 옵션
    // scaledSize : 원본 이미지를 scale 할 때 사용 => 스프라이트 이미지의 전체 크기를 resizing 함
    url: isSelected ? 'images/markers-selected.png' : 'images/markers.png',
    size: new naver.maps.Size(SCALED_MARKER_WIDTH, SCALED_MARKER_HEIGHT),
    origin: new naver.maps.Point(SCALED_MARKER_WIDTH * markerIndex, 0),
    scaledSize: new naver.maps.Size(
      SCALED_MARKER_WIDTH * NUMBER_OF_MARKER,
      SCALED_MARKER_HEIGHT
    ),
  };
}
