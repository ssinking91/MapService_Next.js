import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';
import DetailHeader from '@/components/home/DetailHeader';
import DetailContent from '@/components/home/DetailContent';
import useCurrentStore from '@/hooks/useCurrentStore';
import type { Store } from '@/types/store';
import styles from '../styles/detail.module.scss';

interface Props {
  store: Store;
}

const StoreDetail: NextPage<Props> = ({ store }) => {
  const expanded = true;

  const router = useRouter();

  // fallback: true일때
  // if (router.isFallback) {
  //   return <div>Loading...</div>;
  // }

  const { setCurrentStore } = useCurrentStore();

  const goToMap = () => {
    setCurrentStore(store);
    router.push(`
      /?zoom=15&lat=${store.coordinates[0]}&lng=${store.coordinates[1]}
    `);
  };

  return (
    <>
      <NextSeo
        title={store.name}
        description="Next.js 시작하기 강의를 위한 매장 상세 페이지입니다."
        canonical={`https://inflearn-nextjs.vercel.app/${store.name}`}
        openGraph={{
          url: `https://inflearn-nextjs.vercel.app/${store.name}`,
        }}
      />
      <div className={`${styles.detailSection} ${styles.expanded}`}>
        <DetailHeader
          currentStore={store}
          expanded={expanded}
          onClickArrow={goToMap}
        />
        <DetailContent currentStore={store} expanded={expanded} />
      </div>
    </>
  );
};
export default StoreDetail;

/** https://nextjs.org/docs/basic-features/data-fetching/get-static-paths */

// getStaticPaths는 getStaticProps와 함께 쓰여야 함
// getStaticPaths는 페이지의 경로를 정적으로 생성해둠 => 필요한 모든 경로에 대해서 페이지를 미리 프리렌더링해 둠
export const getStaticPaths: GetStaticPaths = async () => {
  const stores = (await import('../../public/stores.json')).default;
  const paths = stores.map((store) => ({ params: { name: store.name } }));

  // paths라는 배열에 있는 params 값에 해당하는 경로만 실제로 페이지가 만들어짐

  // 1. fallback: false => 빌드 타임에 모든 경로를 만들고 만약 찾을 수 없는 경로에 도달한다면 바로 404 페이지를 띄우게 됨

  // 2. fallback: true => 빌드 타임에 모든 경로를 만들고 존재하지 않는 경로에 접근하더라도 바로 404 페이지가 보이지 않음
  // fallback: true 사용하는 경우
  // (1) 경로의 양이 많을 경우 최소한의 경로만 미리 생성하고 fallback: true를 주어서 유저가 접근할 때 경로를 만드는 것이 더 효율적
  // (2) build가 끝난 뒤 DB에 새로 추가되는 데이터가 있을 경우

  // 3. fallback: "blocking" => getStaticProps 함수가 return 될때까지 UI를 가만히 blocking 함
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const stores = (await import('../../public/stores.json')).default;
  const store = stores.find((store) => store.name === params?.name);

  // fallback: true || fallback: "blocking" 일때
  // if (!store) {
  //   return { notFound: true }; // 404 page
  // }

  return { props: { store } };
};
