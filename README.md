# 페이지 라우팅/렌더링 방식

- TTFB, FCP 등을 비교할 수도 있지만, 상황과 설계에 따라 달라질 수 있어 딱 잘라 비교하기엔 의미가 크지 않다.

## ⚙️ SSR(Server Side Rendering)

![SSR](https://miro.medium.com/max/1400/1*jJkEQpgZ8waQ5P-W5lhxuQ.webp)

- 일부 블로그, 홈페이지 웹사이트, PHP/JAVA 서버 사이드 템플릿 엔진
- `완성된 HTML`(서버에서 만들어진 뒤 브라우저에 전송)
- 초기 용량 작음
- 보안 유리
- 화면 깜빡임 있음(페이지마다 새로운 HTML를 그려줘야 되기 때문에 페이지가 라우팅될 때)
- 서버 부하 위험(사용자가 많을 때)
- SEO에 좋음(완성된 HTML로 인해 크롤링을 하기 좋은 환경이기 때문에)
- 항상 최신 상태를 유지해야 하는 경우 (요청에 따라 응답해야 할 내용이 시시각각 변함)
  - 제품의 상세 페이지 / 분석 차트 등 요청 마다 다른 내용 또는 형식의 HTML 문서가 반환되는 경우

## ⚙️ CSR(Client Side Rendering)

![CSR](https://miro.medium.com/max/1400/1*CRiH0hUGoS3aoZaIY4H2yg.webp)

- CRA(create-react-app)
- 예시 설명
- `<div id="root" />`
- 화면 깜빡임 없음(작은 HTML만 받고 나머지는 자바스크립트로 동적으로 그리기 때문에 SSR과 다르게)
- 초기 용량 큼
- js(자바스크립트) 파일을 캐시 가능(서버에서 렌더링되는 것이 아니라 자바스크립트로 돔을 그리는 것이기 때문에)
- 보안에 취약(서버 데이터가 필요할 경우 계속해서 서버와 통신해야 되기 때문에 상대적으로)
- SEO에 제약(SSR에 비해 상대적으로)

## ⚙️ SSG(Static Site Generation)

- 정적인 사이트에 사용
- pre-rendering: Static한 HTML을 **build time**에 미리 만들어 둠 (SSR은 **request time**에 => 사이트에 접속할 때마다 HTML을 만듬)
- 서버 부하 없음, HTML 캐시 가능 (미리 정적인 HTML을 만들어 두기 때문에)
- SEO에 좋음(완성된 HTML로 인해 크롤링을 하기 좋은 환경이기 때문에)
- 퍼포먼스에 집중 (CDN을 통해 더 빠른 응답 가능)
  - 마케팅 페이지 / 블로그 게시물 / 제품의 목록 등과 같이 정적 생성하여 각 요청에 동일한 문서를 반환할 수 있는 경우

## ⚙️ Next.js

- SSR, CSR, SSG의 장점만 고려하여 페이지를 자유롭게 routing/rendering 할 수 있도록 API를 제공함

  - SSR/SSG의 용량과 보안
  - CSR의 페이지 이동 속도, 깜빡임 없음
  - Next.js의 방향성

- pre-rendering -> JS disable: CRA vs Next.js

- Section 1: SSR/CSR/SSG, ISR(revalidate), next/link

  - getStaticProps(SSG)
  - getServerSideProps(SSR)
  - revalidate: Incremental Static Regeneration(ISR)
  - CSR

- `app` directory

- `next/link` Link

  - 페이지를 라우팅할 때는 CSR방식으로 빠르게 이동 => 이동할 페이지에 해당하는 자바스크립트 파일만 가져옴(해당 페이지에 대한 정보를 자바스크립트 파일로 가지고 있음)
  - 최초에 한 번만 HTML파일을 가져오고 next/link가 있는 곳은 자바스크립트와 json 파일로 이동할 페이지에 대한 정보를 미리 가져와서 빠르게 CSR 방식으로 라우팅할 수 있음
  - lazy한 방식으로 파일을 가지고 옴
  - Next.js는 모든 페이지에 대한 pre-rendering을 진행해서 SEO를 보장함과 동시에 next/link를 통해 CSR 방식으로 라우팅을 함으로써 빠른 라우팅과 적은 네트워크 요청도 가능

- `next/router` useRouter

  - 해당 페이지에 이동한 후 자바스크립트와 json 파일을 다운로드 받아지면서 CSR 방식으로 라우팅할 수 있음
  - `next/link`처럼 자동으로 prefetch 하기 위해서는 아래처럼 해야 함

    ```typescript
    import {useRouter} from 'next/router'

    ...

    const router = useRouter();

    useEffect(()=>{
        // url : 이동하고자 하는 url
        router.preFetch(url)
    },[router]);
    ```

- `next/image` Image

  - 서버에서 자동으로 이미지 용량 최적화(webp type)
  - `layout shift` 현상이 일어나지 않음
  - `quality` 속성을 사용하여 얼마나 최적화 할지도 설정할 수 있음
  - `loading="lazy"` 속성이 자동으로 들어가 있음
  - `placeholder="blur` 속성을 사용하면 사진이 다운로드 되는 동안 blur 이미지가 자동으로 적용됨
  - 외부링크(string 경로) 이미지의 높이와 너비를 미리 알 방법이 없어 빌드타임에 미리 최적화할 수 없음 => 외부링크(string 경로)를 소스에 두었을 때는 반드시 그 크기를 명시해 주어야 함
  - 외부링크(string 경로)의 이미지의 사이즈(width와 height)를 모를때 => `fill` 속성 사용 => 이 경우 이미지의 사이즈는 부모에 의해 결정 => 부모의 position을 relative/absolute/fixed 등으로 설정한후 부모의 width, height를 설정 => Image태그에 objectFit 속성을 추가하여 크기가 이미지에 딱 맞게 설정
  - 외부링크를 소스로 넣을 때 외부링크를 사용할 수 없다는 메시지가 보임 => `next.config.js`의 `images.domains`에 외부링크 추가할 것 => pathname까지 좀 더 정확하게 명시하고 싶다면 `remotePatterns`를 사용할 것

  ```typescript
  /** @type {import('next').NextConfig} */
  const nextConfig = {
    reactStrictMode: true,
    images: {
      domains: ['inflearn-nextjs.vercel.app'],
    },
  };

  module.exports = nextConfig;
  ```

  ```typescript
  import Image from 'next/image';
  import example from '/public/example.jpg';

  ...
  // src : static
  <figure>
    <Image
      src={example}
      alt="v13 image"
      width={500}
      height={100}
      quality={100}
      placeholder="blur"
    //
     />
    <figcaption>v13 image</figcaption>
  </figure>;

  // src : 외부링크
  <figure>
    <Image
      src="https://inflearn-nextjs.vercel.app/example.jpg"
      alt="v13 image"
      width={500}
      height={100}
      quality={100}
      placeholder="blur"
    //
     />
    <figcaption>v13 image</figcaption>
  </figure>;

  // src : 외부링크(string 경로)의 이미지의 사이즈(width와 height)를 모를때 => fill속성 사용
  <figure style={{ position: 'relative', width: '500px', height: '100px' }}>
    <Image
      src="https://inflearn-nextjs.vercel.app/example.jpg"
      alt="v13 fill"
      fill
      style={{ objectFit: 'cover' }}
    />
     <figcaption>v13 image</figcaption>
  </figure>
  ...
  ```

## ⚙️ getStaticProps

- ISR : `revalidate: 5`라는 것은 5초마다(서버가 request를 받은지 5초가 지난 후, 다시 request가 왔을 때마다) getStaticProps함수를 다시 실행해서 만약 데이터가 바뀌었으면 새로운 값으로 다시 pre-rendering하라는 뜻, data가 변하지 않으면 pre-rendering을 다시 수행하지 않음

```typescript
import type { NextPage } from 'next';

interface Props {
  data: number;
}

const Example: NextPage<Props> = ({ data }) => {
  return (
    <main>
      <h1>getStaticProps Page</h1>
      <p>값: {data}</p>
    </main>
  );
};

export default Example;

export async function getStaticProps() {
  const delayInSeconds = 2;
  const data = await new Promise((resolve) => setTimeout(() => resolve(Math.random()), delayInSeconds * 1000));

  return {
    props: { data },
    revalidate: 5 /** https://nextjs.org/docs/basic-features/data-fetching/incremental-static-regeneration */,
  };
}
```

## ⚙️ getServerSideProps

- SSR은 build time에 프리렌더링 되는 것이 아니라, 페이지에 들어올 때마다(request time) 프리렌더링 됨
- SSG에 비해 사용자 경험이 좋지 않으며, 반드시 request time마다 서버사이드에서 렌더링 해야되는 페이지에만 적용
- 예)
  - 사용자의 인증정보에 따라 변하는 페이지
  - 페이지가 동적으로 변해야 하지만 보안은 중요한 페이지
- revaildate

  ```typescript
  res.setHeader(
    'Cache-Control',
    'public, s-maxage=5, stale-while-revalidate=10',
    //
  );
  ```

```typescript
import type { GetServerSideProps, NextPage } from 'next';

interface Props {
  data: number;
}

const Example: NextPage<Props> = ({ data }) => {
  return (
    <main>
      <h1>getServerSideProps Page</h1>
      <p>값: {data}</p>
    </main>
  );
};

export default Example;

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  /** https://web.dev/i18n/ko/stale-while-revalidate/ */
  // This value is considered fresh for five seconds (s-maxage=5).
  // If a request is repeated within the next 5 seconds, the previously
  // cached value will still be fresh.
  //
  // If the request is repeated before 5~15 seconds,
  // the cached value will be stale but still render (stale-while-revalidate=10).
  //
  // In the background, a revalidation request will be made to populate the cache
  // with a fresh value. If you refresh the page, you will see the new value.
  // res.setHeader(
  //   'Cache-Control',
  //   'public, s-maxage=5, stale-while-revalidate=10'
  // );

  const delayInSeconds = 2;
  const data = await new Promise((resolve) => setTimeout(() => resolve(Math.random()), delayInSeconds * 1000));

  return {
    props: { data },
  };`
};
```

## ⚙️ clientSideRendering

- 처음에는 HTML을 프리렌더링 함
- 서버에서는 window, document와 같은 속성의 객체를 알수없음
- SSR로 렌더링 하고 싶지 않은 컴포넌트가 있을 경우 일반적인 import문이 아니라 `next/dynamic`을 이용

```typescript
import dynamic from 'next/dynamic';

...

const NoSSR = dynamic(() => import('../../components/section1/NoSSR'), {
  ssr: false,
});

...
```

```typescript
import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

/** https://nextjs.org/docs/advanced-features/dynamic-import#with-no-ssr */
const NoSSR = dynamic(() => import('../../components/section1/NoSSR'), {
  ssr: false,
});

const Example: NextPage = () => {
  const [data, setData] = useState(0);

  useEffect(() => {
    const delayInSeconds = 2;
    new Promise<number>((resolve) => setTimeout(() => resolve(Math.random()), delayInSeconds * 1000)).then((result) =>
      setData(result),
    );
  }, []);

  return (
    <main>
      <h1>Client-side data fetching</h1>
      <p>값: {data}</p>

      <h1>no SSR</h1>
      <NoSSR />
    </main>
  );
};

export default Example;
```
