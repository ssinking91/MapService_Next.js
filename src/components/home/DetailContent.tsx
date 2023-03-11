import Image from 'next/image';
import type { Store } from '@/types/store';
import Naver from 'public/images/naver.png';
import styles from '../../styles/detail.module.scss';
import { IoCallOutline, IoLocationOutline } from 'react-icons/io5';

type Props = {
  currentStore?: Store;
  expanded: boolean;
};

const DetailContent = ({ currentStore, expanded }: Props) => {
  if (!currentStore) return null;
  return (
    <div
      className={`${styles.detailContent} ${expanded ? styles.expanded : ''}`}
    >
      {/* 이미지 영역 */}
      <div className={styles.images}>
        {currentStore.images.slice(0, 3).map((image) => (
          <div
            style={{ position: 'relative', maxWidth: 120, height: 80 }}
            key={image}
          >
            <Image
              // src는 네이버 외부링크이므로 직접 data:image로 주었음
              src={image}
              alt=""
              fill
              style={{ objectFit: 'cover' }}
              sizes="120px"
              // 정적 import라면 placeholder="blur"만 추가
              placeholder="blur"
              // 동적 import(외부 경로에서 이미지를 받아와야되는 상황)라면 blurDataURL = 'data:image/gif;base64, + base64로 인코딩된 이미지 픽셀'까지 추가
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mO0WhFsDwADzwF2mLYSJgAAAABJRU5ErkJggg=="
              priority
            />
          </div>
        ))}
      </div>
      {expanded && (
        <>
          {/* 설명 영역 */}
          <div className={styles.description}>
            <h2>설명</h2>
            <p>{currentStore.description}</p>
          </div>
          <hr />
          {/* 기본 정보 영역 */}
          <div className={styles.basicInfo}>
            <h2>기본 정보</h2>
            <div className="address">
              <IoLocationOutline size={20} />
              <span>{currentStore.address || '정보가 없습니다.'}</span>
            </div>
            <div className="phone">
              <IoCallOutline size={20} />
              <span>{currentStore.phone || '정보가 없습니다.'}</span>
            </div>
            <div className="naverUrl">
              {/* static하게 import한 파일이어서 width와 height를 바로 지정함 */}
              <Image src={Naver} width={20} height={20} alt="" />
              <a
                href={`https://pcmap.place.naver.com/restaurant/${currentStore.nid}/home`}
                target="_blank"
                rel="noreferrer noopener"
              >
                <span>네이버 상세 정보</span>
              </a>
            </div>
          </div>
          <hr />
          {/* 메뉴 영역 */}
          <div className={styles.menus}>
            <h2>메뉴</h2>
            <ul>
              {currentStore.menus?.map((menu) => (
                <li className={styles.menu} key={menu.name}>
                  <span className={styles.name}>{menu.name}</span>
                  <span className={styles.price}>{menu.price}</span>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
};
export default DetailContent;
