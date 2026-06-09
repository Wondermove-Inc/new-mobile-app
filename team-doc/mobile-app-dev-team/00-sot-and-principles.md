# SoT And Principles

## Source Of Truth 우선순위

1. `AGENTS.md`
   - repo 규칙, runtime path, PR gate, 금지 사항, Definition of Done.
2. `PROJECT_ENVIRONMENT.md`
   - Expo/RN/API/Codex runtime의 현재 버전과 실제 운영 상태.
3. `.agents/skills/<skill-name>/SKILL.md`
   - 현재 repo-local skill의 실제 contract.
4. `.codex/agents/<agent-name>.toml`
   - 현재 custom agent의 read-only/reviewer/researcher contract.
5. `team-doc/10-structured/`
   - 기존 Confluence source를 정리한 참조 문서.
6. `team-doc/00-source/`
   - 원본 export, page id, fetchedAt, historical source 보존.

## 기본 원칙

- 현재 팀은 mobile app template runtime을 운영하는 실무팀이다.
- 모든 구현은 TDD 기준으로 진행한다. 구현 변경 전 테스트, eval, validator, fixture 중 가장 좁은 검증을 먼저 둔다.
- customer app name, bundle ID, API URL, token, credential은 hardcode하지 않는다.
- 외부 platform/runtime repository는 이 repo에서 수정하지 않는다.
- React Native UI는 NativeWind, React Native primitives, semantic design token을 사용한다.
- API request/response/domain schema는 `packages/contracts`가 단일 SoT이다.
- 변경은 branch + PR + required checks를 전제로 한다.

## 문서 관리 원칙

- `team-doc/mobile-app-dev-team/`는 current managed docs이다.
- `team-doc/00-source/`는 수정 대상이 아니라 source evidence이다.
- historical skill 이름은 `99-source-map.md`에서만 crosswalk로 다룬다.
- active repo skill은 실제 `.agents/skills/<slug>/SKILL.md`가 있는 것만 인정한다.
- `.clode/agents`는 현재 repo runtime path가 아니다. 실제 custom agent path는 `.codex/agents`이다.

