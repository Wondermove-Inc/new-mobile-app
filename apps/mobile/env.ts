import { z } from 'zod';

const schema = z.object({
  APP_ENV: z.enum(['development', 'preview', 'production']).default('development'),
  APP_DISPLAY_NAME: z.string().min(1).default('Mobile App Template'),
  APP_SLUG: z.string().min(1).default('mobile-app-template'),
  APP_SCHEME: z.string().min(1).default('mobileapptemplate'),
  API_URL: z.url(),
  IOS_BUNDLE_IDENTIFIER: z.string().min(1),
  ANDROID_PACKAGE: z.string().min(1),
  EAS_PROJECT_ID: z.uuid().optional(),
  SENTRY_DSN: z.string().optional(),
  SENTRY_ORG: z.string().optional(),
  SENTRY_PROJECT: z.string().optional(),
});

export const Env = schema.parse({
  APP_ENV: process.env.EXPO_PUBLIC_APP_ENV,
  APP_DISPLAY_NAME: process.env.EXPO_PUBLIC_APP_DISPLAY_NAME,
  APP_SLUG: process.env.EXPO_PUBLIC_APP_SLUG,
  APP_SCHEME: process.env.EXPO_PUBLIC_APP_SCHEME,
  API_URL: process.env.EXPO_PUBLIC_API_URL,
  IOS_BUNDLE_IDENTIFIER: process.env.EXPO_PUBLIC_IOS_BUNDLE_IDENTIFIER,
  ANDROID_PACKAGE: process.env.EXPO_PUBLIC_ANDROID_PACKAGE,
  EAS_PROJECT_ID: process.env.EAS_PROJECT_ID,
  SENTRY_DSN: process.env.EXPO_PUBLIC_SENTRY_DSN,
  SENTRY_ORG: process.env.SENTRY_ORG,
  SENTRY_PROJECT: process.env.SENTRY_PROJECT,
});
