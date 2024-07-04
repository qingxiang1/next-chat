import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "https://af02317d26ec3c1e54d00649580e2d19@o4507416576262144.ingest.de.sentry.io/4507416583995472",

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for tracing.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,

  // ...

  // Note: if you want to override the automatic release value, do not set a
  // `release` value here - use the environment variable `SENTRY_RELEASE`, so
  // that it will also get attached to your source maps
});
