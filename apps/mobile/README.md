# Mobile App (Expo)

Expo Router app skeleton with NativeWind styling and EAS cloud build/submit/OTA support.

## Sentry 통합 절차 (DSN 주입 시)

기본은 비활성입니다. `SENTRY_DSN`이 주입되지 않으면 `_layout.tsx`의 `Sentry.init`이 `enabled: false`로 no-op이 되며, 아래 변경은 어느 것도 필요하지 않습니다. crash/sourcemap 추적이 필요한 프로젝트(`SENTRY_DSN`/`SENTRY_ORG`/`SENTRY_PROJECT` 주입)에서만 다음 4단계를 적용합니다.

1. `app.config.ts`의 `plugins`에 Sentry expo plugin을 추가합니다. `organization`/`project`는 `env.ts`의 검증된 `Env.SENTRY_ORG`/`Env.SENTRY_PROJECT`로 연결합니다.

```ts
plugins: [
  'expo-router',
  ['@sentry/react-native/expo', { organization: Env.SENTRY_ORG, project: Env.SENTRY_PROJECT }],
],
```

2. `metro.config.js`를 `getSentryExpoConfig` 기반으로 교체합니다. `withNativeWind` 래핑은 그대로 유지해야 하므로, `getDefaultConfig` 대신 `getSentryExpoConfig`가 반환한 config를 `withNativeWind`로 감쌉니다.

```js
const { getSentryExpoConfig } = require('@sentry/react-native/metro');
const { withNativeWind } = require('nativewind/metro');

const config = getSentryExpoConfig(__dirname);

module.exports = withNativeWind(config, { input: './global.css' });
```

3. EAS Build: `SENTRY_AUTH_TOKEN`을 EAS secret으로 주입하면 Sentry plugin이 빌드 중 sourcemap을 자동 업로드합니다. 별도 명령이 필요 없습니다.

4. EAS Update: OTA 업데이트는 sourcemap을 자동 업로드하지 않으므로, `eas update`(또는 `npx expo export`) 후 명시적으로 업로드합니다. CI 파이프라인에 다음 단계를 배선합니다.

```sh
SENTRY_AUTH_TOKEN=$SENTRY_AUTH_TOKEN npx @sentry/expo-upload-sourcemaps dist
```

`SENTRY_AUTH_TOKEN`은 EAS Build와 동일하게 Secret으로만 주입하고 repo에 커밋하지 않습니다.
