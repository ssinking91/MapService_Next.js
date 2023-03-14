export default {
  // 페이지 전역적으로 공통의 문자열이 들어가야 될 때
  titleTemplate: '%s - Next.js 시작하기',
  // og:type, og:sitename, og:image 등 openGraph와 관련된 meta tag
  openGraph: {
    // og:type
    type: 'website',
    // og:sitename
    site_name: 'Next.js 시작하기',
    // og:image
    images: [
      { url: 'https://nextjs.org/static/blog/next-13/twitter-card.png' },
    ],
  },
  // 추가로 필요한 link tag에 대한 정보
  additionalLinkTags: [
    {
      // 탭옆에 있는 이미지아이콘을 표현하기 위해 shortcut icon을 사용
      rel: 'shortcut icon',
      href: '/favicon.ico',
    },
  ],
  // 검색엔진에게 웹사이트 크롤링을 요청하려면 sitemap.xml과 robots.txt라는 파일을 제출하여야 함
  // robots.txt 파일은 크롤러로 하여금 어떻게 크롤링을 해야 하는지 알려주는 txt 파일
  // sitemap.xml 파일(사이트에 대한 전체적인 설계도 제공)은 사이트에 있는 url을 명시해 두어 크롤러로 하여금 크롤링 해야하는 모든 페이지를 알려줄 수 있음(각 게시물의 url과 최종수정일이 적혀 있음)
  // next-sitemap 라이브러리를 install 후 next-sitemap.config.js 생성
  additionalMetaTags: [
    // 네이버 서치어드바이저에 사이트 등록(HTML 태그) => 사이트 소유 확인
    {
      name: 'naver-site-verification',
      content: '7bd885b384be0f905aad30d00607e0481d4be908',
    },
    // Google Search Console(HTML 태그) : URL 접두어 => 사이트 소유 확인
    {
      name: 'google-site-verification',
      content: 'O0r_20aU1JVk1sbI7E50r6RXiTRFrN8jG_a3uSeG4A0',
    },
  ],
};
