/** @type {import('next').NextConfig} */

// const path = require('path');

const nextConfig = {
  // reactStrictMode: true,
  reactStrictMode: false,
  images: {
    domains: ['inflearn-nextjs.vercel.app', 'search.pstatic.net'],
  },
  i18n: {
    /** https://nextjs.org/docs/advanced-features/i18n-routing#getting-started */
    // 국제화 관련 속성 : 사이트 언어의 후보를 배열로 적어주고 defaultLocale을 한국어로 설정
    locales: ['ko'],
    defaultLocale: 'ko',
  },
};

module.exports = nextConfig;
