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
    locales: ['ko'],
    defaultLocale: 'ko',
  },
  // sassOptions: {
  //   includePaths: [path.join(__dirname, 'styles')],
  //   prependData: `@import "src/styles/header.module.scss"; @import "styles/globals.scss"; @import "src/styles/detail.module.scss @import "src/styles/feedback.module.scss @import "src/styles/map.module.scss`,
  // },
};

module.exports = nextConfig;
