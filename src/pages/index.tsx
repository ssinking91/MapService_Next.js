import { Fragment, useEffect } from 'react';
import { NextPage } from 'next';
import { NextSeo } from 'next-seo';
import Header from '@/components/home/Header';
import MapSection from '@/components/home/MapSection';
import DetailSection from '@/components/home/DetailSection';
import useStores from '@/hooks/useStores';
import { Store } from '@/types/store';

interface Props {
  stores: Store[];
}

const Home: NextPage<Props> = ({ stores }) => {
  const { initializeStores } = useStores();

  useEffect(() => {
    initializeStores(stores);
  }, [initializeStores, stores]);

  return (
    <Fragment>
      <NextSeo
        title="매장 지도"
        description="Next.js 시작하기 강의를 위한 매장 지도 서비스입니다."
        openGraph={{
          url: 'https://inflearn-nextjs.vercel.app',
        }}
        // 선호 URL(canonical link) : 각 페이지 별로 그 URL을 가장 잘 표현하는 대표 URL을 지정하면 됨
        canonical="https://inflearn-nextjs.vercel.app"
      />
      <Header />
      <main
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          overflow: 'hidden',
        }}
      >
        <MapSection />
        <DetailSection />
      </main>
    </Fragment>
  );
};
export default Home;

export async function getStaticProps() {
  const stores = (await import('../../public/stores.json')).default;

  // const stores = await fetch(
  //   `${process.env.NEXT_PUBLIC_API_URL}/api/stores`
  // ).then((response) => response.json());

  return {
    props: { stores },
    revalidate: 60 * 60,
  };
}
