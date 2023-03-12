import copy from 'copy-to-clipboard';
import type { Store } from '@/types/store';
import headerStyles from '../../styles/header.module.scss';
import styles from '../../styles/detail.module.scss';
import { IoIosArrowUp } from 'react-icons/io';
import { AiOutlineShareAlt } from 'react-icons/ai';

interface Props {
  currentStore?: Store;
  expanded: boolean;
  onClickArrow: () => void;
}

const DetailHeader = ({ currentStore, expanded, onClickArrow }: Props) => {
  return (
    <div className={styles.header}>
      <button
        className={`${styles.arrowButton} ${expanded ? styles.expanded : ''}`}
        onClick={onClickArrow}
        disabled={!currentStore}
        // accessible한 name을 주는 방법 : aria-* 속성을 사용(웹 접근성)
        // aria-label : 버튼이나 링크에 단순하게 이름을 추가할 때
        aria-label={expanded ? '매장 정보 접기' : '매장 정보 펼치기'}
      >
        <IoIosArrowUp size={20} color="#666666" />
      </button>
      {!currentStore && <p className={styles.title}>매장을 선택해주세요</p>}
      {currentStore && (
        <div className={styles.flexRow}>
          <h1 className={styles.title}>{currentStore.name}</h1>
          <button
            className={headerStyles.box}
            onClick={() => {
              // clipboard에 저장
              // location.origin = 프로토콜(http://) + 도메인(localhost) + 포트(:3000)
              copy(location.origin + '/' + currentStore.name);
            }}
            // accessible한 name을 주는 방법 : aria-* 속성을 사용(웹 접근성)
            // aria-label : 버튼이나 링크에 단순하게 이름을 추가할 때
            aria-label="매장 페이지 주소 클립보드 복사"
          >
            <AiOutlineShareAlt size={20} color="#444444" />
          </button>
        </div>
      )}
    </div>
  );
};
export default DetailHeader;
