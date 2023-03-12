import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from '../../styles/header.module.scss';

interface Props {
  onClickLogo?: () => void;
  rightElements?: React.ReactElement[];
}

const HeaderComponent = ({ onClickLogo, rightElements }: Props) => {
  return (
    <header className={styles.header}>
      <div className={styles.flexItem}>
        <Link
          href="/"
          onClick={onClickLogo}
          className={styles.box}
          // accessible한 name을 주는 방법 : aria-* 속성을 사용(웹 접근성)
          // aria-label : 버튼이나 링크에 단순하게 이름을 추가할 때
          aria-label="홈으로 이동"
        >
          <Image
            src="/inflearn.png"
            width={110}
            height={20}
            alt="인프런 로고"
            // priority = true 일 경우 이 이미지가 높은 우선순위를 가지고 있다고 판단
            // LCP(largest contentful paint)에 영향을 미치는 요소의 경우 priority를 설정하는 것이 좋음
            // priority
          />
        </Link>
      </div>
      {rightElements && <div className={styles.flexItem}>{rightElements}</div>}
    </header>
  );
};

export default HeaderComponent;
