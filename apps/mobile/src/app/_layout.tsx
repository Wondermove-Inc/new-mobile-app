import '../../global.css';
import * as Sentry from '@sentry/react-native';
import { Stack } from 'expo-router';
import { Env } from '../../env';

Sentry.init({
  dsn: Env.SENTRY_DSN,
  enabled: Boolean(Env.SENTRY_DSN),
});

function RootLayout() {
  return <Stack screenOptions={{ headerShown: false }} />;
}

export default Sentry.wrap(RootLayout);
