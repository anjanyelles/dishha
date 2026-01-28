import * as Sentry from '@sentry/sveltekit';
import { handleErrorWithSentry } from '@sentry/sveltekit';

import { dev } from '$app/environment';

import { PUBLIC_SENTRY_DSN, PUBLIC_SENTRY_ENVIRONMENT } from '$env/static/public';

if (!dev) {
  Sentry.init({
    environment: PUBLIC_SENTRY_ENVIRONMENT || 'unknown-environment',
    dsn: PUBLIC_SENTRY_DSN,

    // This sets the sample rate to be 10%. You may want this to be 100% while
    // in development and sample at a lower rate in production
    replaysSessionSampleRate: 0.1,

    // If the entire session is not sampled, use the below sample rate to sample
    // sessions when an error occurs.
    replaysOnErrorSampleRate: 1.0
  });
}

// if you have a custom error handler, pass it to `handleerrorwithsentry`
export const handleError = handleErrorWithSentry();
