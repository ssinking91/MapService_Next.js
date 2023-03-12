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
    // 사이트 언어의 후보를 배열로 적어줌
    locales: ['ko'],
    defaultLocale: 'ko',
  },
};

module.exports = nextConfig;
