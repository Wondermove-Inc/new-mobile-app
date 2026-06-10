# Mobile App Dev Team

이 폴더는 현재 `new-mobile-app` 프로젝트 기준의 관리용 팀 문서이다.

`team-doc/00-source/`는 Confluence 원본 export와 감사 기록을 보존하는 historical source이고, 이 폴더는 실제 운영자가 읽고 유지할 current SoT이다. 기존 source export 파일은 여기서 직접 수정하지 않는다.

## 문서 구조

| 파일 | 역할 |
| --- | --- |
| `00-sot-and-principles.md` | 현재 SoT, 관리 원칙, 금지 사항 |
| `01-team-composition.md` | 팀 구성과 책임 경계 |
| `02-role-souls/` | 6개 LLM 실무자별 SOUL.md 초안 |
| `03-role-capability-matrix.md` | 역할별 능력, 산출물, 금지 범위 |
| `04-skills-and-agents-matrix.md` | 현재 `.agents/skills`와 `.codex/agents` 매핑 |
| `05-work-processes.md` | 실제 작업 프로세스 |
| `06-gates-and-evidence.md` | 게이트, 검증, evidence 규칙 |
| `07-new-team-template-guide.md` | 다른 개발팀 생성 시 재사용 절차 |
| `10-github-artifact-workflow.md` | pod-isolated role agent의 GitHub PR 산출물 handoff 규칙 |
| `99-source-map.md` | 근거 파일과 active/historical crosswalk |

## 운영 원칙

- 현재 repo 기준 사실은 `AGENTS.md`, `PROJECT_ENVIRONMENT.md`, `.agents/skills`, `.codex/agents`를 우선한다.
- `team-doc/10-structured/`는 정리된 참조 자료로 사용하되, 실제 repo와 다르면 current repo 파일을 우선한다.
- OpenClaw pod-native skill source는 `09-pod-native-openclaw-skills/`에서 관리한다.
- Pod-isolated role agent 산출물은 `10-github-artifact-workflow.md`에 따라 GitHub branch/commit/PR과 `docs/plans/work-units/<work-unit-id>/`로 handoff한다.
- Gatekeeper는 non-LLM deterministic required check이다. Gatekeeper SOUL.md는 만들지 않는다.
