import { useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import copy from 'copy-to-clipboard';
import Header from '@/components/common/Header';
import useMap from '@/hooks/useMap';
import styles from '../../styles/header.module.scss';
import { AiOutlineShareAlt } from 'react-icons/ai';
import { VscFeedback } from 'react-icons/vsc';

const HomeHeader = () => {
  const router = useRouter();

  const { resetMapOptions, getMapOptions } = useMap();

  // 공유하기 버튼을 눌렀을 때 url 주소를 변경하고 그 url을 복사하는 함수를 구현
  const replaceAndCopyUrl = useCallback(() => {
    const mapOptions = getMapOptions();
    const query = `/?zoom=${mapOptions.zoom}&lat=${mapOptions.center[0]}&lng=${mapOptions.center[1]}`;

    // url의 query를 해당 query로 대체함
    router.replace(query);
    // clipboard에 저장
    // location.origin = 프로토콜(http://) + 도메인(localhost) + 포트(:3000)
    copy(location.origin + query);
  }, [router, getMapOptions]);

  return (
    <Header
      onClickLogo={resetMapOptions}
      rightElements={[
        <button
          onClick={replaceAndCopyUrl}
          className={styles.box}
          style={{ marginRight: 8 }}
          // accessible한 name을 주는 방법 : aria-* 속성을 사용(웹 접근성)
          // aria-label : 버튼이나 링크에 단순하게 이름을 추가할 때
          aria-label="현재 위치 클립보드 복사"
          key="button"
        >
          <AiOutlineShareAlt size={20} color="#444444" />
        </button>,
        <Link
          href="/feedback"
          className={styles.box}
          // accessible한 name을 주는 방법 : aria-* 속성을 사용(웹 접근성)
          // aria-label : 버튼이나 링크에 단순하게 이름을 추가할 때
          aria-label="피드백 페이지로 이동"
          key="link"
        >
          <VscFeedback size={20} color="#444444" />
        </Link>,
      ]}
    />
  );
};
export default HomeHeader;
