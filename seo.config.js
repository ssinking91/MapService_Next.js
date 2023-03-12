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
      rel: 'shortcut icon',
      href: '/favicon.ico',
    },
  ],
  additionalMetaTags: [
    {
      name: 'naver-site-verification',
      content: '7bd885b384be0f905aad30d00607e0481d4be908',
    },
    {
      name: 'google-site-verification',
      content: 'O0r_20aU1JVk1sbI7E50r6RXiTRFrN8jG_a3uSeG4A0',
    },
  ],
};
