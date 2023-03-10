import React, { useEffect, useRef } from 'react';
import Script from 'next/script';
import { INITIAL_CENTER, INITIAL_ZOOM } from '@/hooks/useMap';
import { Coordinates } from '@/types/store';
import { NaverMap } from '@/types/map';
import styles from '../../styles/map.module.scss';

type Props = {
  mapId?: string;
  initialCenter?: Coordinates;
  initialZoom?: number;
  onLoad?: (map: NaverMap) => void;
};

const Map = ({
  mapId = 'map',
  initialCenter = INITIAL_CENTER,
  initialZoom = INITIAL_ZOOM,
  onLoad,
}: Props) => {
  const mapRef = useRef<NaverMap | null>(null);

  const initializeMap = () => {
    const mapOptions = {
      center: new window.naver.maps.LatLng(...initialCenter),
      zoom: initialZoom,
      minZoom: 9,
      scaleControl: false,
      mapDataControl: false,
      logoControlOptions: {
        position: naver.maps.Position.BOTTOM_LEFT,
      },
    };

    /** https://navermaps.github.io/maps.js.ncp/docs/tutorial-2-Getting-Started.html */
    const map = new window.naver.maps.Map(mapId, mapOptions);
    mapRef.current = map;

    // prop으로 onLoad함수가 주어졌을 때 load가 완료됐다고 부모 컴포넌트에 알리는 부분
    if (onLoad) {
      onLoad(map);
    }
  };

  useEffect(() => {
    // Map 컴포넌트가 unmount됐을 때 해당 map instance를 모두 파괴하도록 했음
    return () => {
      mapRef.current?.destroy();
    };
  }, []);

  return (
    <>
      <Script
        // default 값은 afterInteractive이며,
        // 조금 느려도 되는 스크립트라면 lazyOnload로 lazy loading 하는 것도 좋고,
        // 훨씬 더 빠르게 스크립트를 가져와야 하는 경우 그럴 경우에는 beforeInteractive를 사용 => 페이지 전체에서 사용할 스크립트에만 적용해야 함, Next의 권장은 pages 하위의 document파일임
        strategy="afterInteractive"
        type="text/javascript"
        src={`https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.NEXT_PUBLIC_NCP_CLIENT_ID}`}
        // onLoad는 스크립트가 로딩 되었을 때 한 번 실행
        // onLoad={initializeMap}

        // onReady는 스크립트가 로딩 되었을 때 뿐만 아니라 next/script가 있는 컴포넌트가 mount 될 때마다 실행
        // 이 동작을 확인하기 위해서는 production 환경에서 실행하거나 next.config.js에 reactStrictMode를 false로 바꿔주어야 함
        onReady={initializeMap}
      />
      <div id={mapId} className={styles.map} />
    </>
  );
};

export default Map;
