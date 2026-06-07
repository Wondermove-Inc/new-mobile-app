import { ExpoConfig, ConfigContext } from 'expo/config';
import { Env } from './env';

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: Env.APP_DISPLAY_NAME,
  slug: Env.APP_SLUG,
  scheme: Env.APP_SCHEME,
  ios: { bundleIdentifier: Env.IOS_BUNDLE_IDENTIFIER },
  android: { package: Env.ANDROID_PACKAGE },
  plugins: ['expo-router'],
  extra: {
    eas: { projectId: Env.EAS_PROJECT_ID },
  },
});
