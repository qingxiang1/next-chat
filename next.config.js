import withNextIntl from 'next-intl/plugin';
import { withSentryConfig } from '@sentry/nextjs';
import withBundleAnalyzer from '@next/bundle-analyzer';

const withNextIntlConfig = withNextIntl('./src/libs/i18n.ts');

/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.js");

const bundleAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

/** @type {import("next").NextConfig} */
export default withSentryConfig(
  bundleAnalyzer(
    withNextIntlConfig({
      eslint: {
        dirs: ['.'],
      },
      poweredByHeader: false,
      reactStrictMode: true,
    }),
  ),
  {
    org: "673972d1c6a2",
    project: "next-chat-ai",

    // An auth token is required for uploading source maps.
    authToken: process.env.SENTRY_AUTH_TOKEN,

    silent: false, // Can be used to suppress logs
    hideSourceMaps: true, // 浏览器隐藏源码
    // 要上传所有文件和源映射（包括来自第三方包的文件和源映射），请将选项设置 true
    widenClientFileUpload: true,
    // 配置隧道以避免广告拦截器
    // tunnelRoute: '/monitoring',
    // Vercel cron 作业的自动检测目前仅适用于 Pages Router。App Router 路由处理程序尚不受支持。
    // automaticVercelMonitors: true,

    // 禁用 Sentry SDK 调试记录器以节省包大小
    disableLogger: true,
  },
);
