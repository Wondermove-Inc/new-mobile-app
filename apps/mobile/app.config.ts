import { ExpoConfig, ConfigContext } from 'expo/config';

// Read process.env directly here — @expo/config's evalConfig uses sucrase + require-from-string
// which cannot resolve TypeScript files via require('./env') in a monorepo with "type":"module"
// at the workspace root. Runtime code (src/) should continue to import from ./env.ts.
export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: process.env.EXPO_PUBLIC_APP_DISPLAY_NAME ?? 'Mobile App Template',
  slug: process.env.EXPO_PUBLIC_APP_SLUG ?? 'mobile-app-template',
  scheme: process.env.EXPO_PUBLIC_APP_SCHEME ?? 'mobileapptemplate',
  ios: { bundleIdentifier: process.env.EXPO_PUBLIC_IOS_BUNDLE_IDENTIFIER ?? 'com.template.mobile' },
  android: { package: process.env.EXPO_PUBLIC_ANDROID_PACKAGE ?? 'com.template.mobile' },
  plugins: ['expo-router'],
  extra: {
    eas: { projectId: process.env.EAS_PROJECT_ID },
  },
});
