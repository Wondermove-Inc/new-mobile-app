# SETUP.md

이 문서는 템플릿 repo를 클론 또는 생성한 후 Agent가 모바일 앱 작업을 시작하기 위한 최소 준비 절차를 설명합니다.

---

## (a) 사전 준비 — 외부 서비스 등록

전체 절차는 사전 등록 가이드를 먼저 확인하세요:
https://wondermove-official.atlassian.net/wiki/spaces/mobileappd/pages/1372422154

### 필수 서비스 8종

| 서비스 | 용도 | 담당 |
|--------|------|------|
| Codex / OpenAI | Agent 런타임 LLM | Human owner |
| Google Stitch | 디자인 시스템 저작·export | Human owner (Design agent 소유) |
| Jira | 태스크·이슈 트래킹 | Human owner |
| Confluence | 지식 베이스·SoT 문서 | Human owner |
| GitHub | 소스 코드·PR·CI | Human owner |
| Expo account/org + EAS project | 클라우드 빌드·OTA·submit | Human owner (구독 필요) |
| Expo Robot user token | Agent의 EAS CLI 비대화식 인증 | Human owner → Secret 주입 |
| ClawPod k8s Secret 권한 | infra/clawpod Secret 적용 권한 | Human owner (ops) |

> 사전 등록 가이드 §2 "필수 서비스" 원문을 참조하세요. 위 표는 요약이며, 세부 등록 절차는 가이드 §5 Day 0/Day 1 체크리스트에 있습니다.

---

## (b) pnpm install 절차

```bash
# corepack 활성화 (Node 22 이상)
corepack enable

# pnpm 버전 고정 (packageManager 필드와 일치)
corepack prepare pnpm@9.15.9 --activate

# 의존성 설치 (repo root에서)
pnpm install
```

설치 후 `@template/contracts`가 `apps/mobile` 및 `apps/api`에서 해석되는지 확인합니다:

```bash
pnpm turbo run lint test
```

---

## (c) eas init 절차

`eas init`은 Expo 계정과 EAS project가 연결된 후 Human owner가 실행하는 단계입니다.

```bash
# apps/mobile 디렉터리에서 실행 (eas.json과 같은 레벨)
cd apps/mobile
npx eas-cli@latest init
```

`eas init` 완료 후 확정되는 `EAS_PROJECT_ID`(UUID)를 `infra/clawpod/secret.example.yaml`의 `EAS_PROJECT_ID` 값으로 반영하고, k8s Secret을 재적용합니다.

> **Human owner 단계**: `eas init`은 Expo 계정 인증이 필요한 대화식 명령입니다. Agent는 `EXPO_TOKEN`이 주입된 후에야 EAS CLI를 비대화식으로 실행할 수 있으며, `eas init` 자체는 Robot user로 실행하지 않습니다.

---

## (d) 로컬 검증 명령

### 기본 검증 (의존성 해석 + 유닛 테스트 + 타입 체크)

```bash
# 워크스페이스 전체 lint + test
pnpm turbo run lint test

# apps/mobile 유닛 테스트만
pnpm --filter mobile test

# apps/api 유닛 테스트만 (apps/api 포함 시)
pnpm --filter @template/api test
```

### apps/api 포함 시 — 운영자 bootstrap 4단계 (SoT §15.4)

apps/api를 포함하는 프로젝트에서 로컬 DB 검증을 수행하려면 아래 4단계를 순서대로 실행합니다.
이 단계는 Agent 작업이 아닌 운영자 단계입니다 (DB 프로비저닝은 Agent 런타임 이미지에 DB CLI가 없으므로 운영자가 수동 실행).

```bash
# 1. 로컬 PostgreSQL 16 기동
docker compose -f apps/api/compose.yaml up -d

# 2. DATABASE_URL 주입 (예시 — 실제 값으로 교체)
export DATABASE_URL="postgres://app:app@localhost:5432/app"

# 3. 앱 부팅 — migrate()가 1회 실행되어 스키마 적용
pnpm --filter @template/api dev
# (기동 확인 후 Ctrl+C)

# 4. 같은 부팅을 한 번 더 실행 — 마이그레이션 멱등 확인 (변경 0건)
pnpm --filter @template/api dev
```

### 컨테이너 이미지 빌드 검증 (apps/api 포함 시)

```bash
# repo root에서 실행 (Dockerfile이 모노레포 컨텍스트를 요구)
docker build -f apps/api/Dockerfile .
```

---

## (e) Human-gate (외부 서비스 연결)

아래 항목은 Expo 계정, EAS project, Store 계정 등 외부 서비스 연결이 완료된 후에만 검증 가능합니다.
로컬 자동화만으로는 실행할 수 없으며, **Human owner의 계정/토큰 준비 후에만 가능**합니다.

사전 등록 가이드 §5 Day 0/Day 1 체크리스트를 참조하세요.

| 항목 | 선행 조건 | 템플릿 준비 상태 |
|------|-----------|----------------|
| `eas init` → EAS_PROJECT_ID 확정 | Expo 계정 + 구독 | `eas.json`, `app.config.ts extra.eas` 설정 완료 |
| Robot user EXPO_TOKEN k8s Secret 적용 | Expo org Robot user 생성 | `infra/clawpod/secret.example.yaml` 제공 |
| Maestro E2E live 실행 | EAS build 완료 + emulator | `.maestro/home.yml`, `e2e-test-android.yml` 배선 완료 |
| EAS build (preview/production) | EXPO_TOKEN Secret 주입 | `eas.json` profiles + `.eas/workflows/` 배선 완료 |
| EAS Submit (store 제출) | Store 계정 + credentials | `build-and-submit.yml` 배선 완료 |
| Sentry 활성화 | Sentry project + DSN + AUTH_TOKEN | `docs/CREDENTIALS.md` 절차 + SoT §6 4단계 문서화 완료 |
| Android 최초 수동 업로드 | Google Play 개발자 계정 | 수동 업로드 후 이후 제출은 EAS Submit 자동화 가능 |
| App Store Connect 제출 | Apple 개발자 계정 + ASC API key | `EXPO_ASC_KEY_ID` / `EXPO_ASC_ISSUER_ID` / `.p8` Secret 주입 필요 |

> **PHASE 4에서 보강 예정**: 위 항목별 상세 절차(토큰 생성 위치, credentials 적용 방법, EAS workflow 트리거 방법)는 PHASE 4 문서 보강에서 추가됩니다.
