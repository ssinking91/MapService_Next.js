/** @type {import('next-sitemap').IConfig} */

// 검색엔진에게 웹사이트 크롤링을 요청하려면 sitemap.xml과 robots.txt라는 파일을 제출하여야 함
// robots.txt 파일은 크롤러로 하여금 어떻게 크롤링을 해야 하는지 알려주는 txt 파일
// sitemap.xml 파일(사이트에 대한 전체적인 설계도 제공)은 사이트에 있는 url을 명시해 두어 크롤러로 하여금 크롤링 해야하는 모든 페이지를 알려줄 수 있음(각 게시물의 url과 최종수정일이 적혀 있음)
// next-sitemap 라이브러리를 install 후 next-sitemap.config.js 생성
// build 후 public 폴더 하위에 robots.txt와 sitemap.xml가 자동 생성

module.exports = {
  siteUrl: process.env.SITE_URL || 'https://inflearn-nextjs.vercel.app',
  generateRobotsTxt: true,
};
