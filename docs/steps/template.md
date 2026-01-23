# step-template.md

## Step Execution Template

---

## 1. Step Overview

- **Step ID**: step-XX-[short-title]
- **Title**: 한 줄로 표현한 작업 요약
- **Goal**: 이 Step이 완료되었을 때 달성되어야 하는 최종 상태
- **Related Roadmap**: (예: 04-roadmap.md > Phase 1 > Step 2)

---

## 2. Scope

### In Scope

- 이 Step에서 반드시 구현/검증해야 하는 항목 목록

### Out of Scope

- 이 Step에서 의도적으로 제외하는 항목 목록

---

## 3. References (Explicit Only)

이 Step에서 AI가 **참조할 수 있는 문서만** 명시한다.

- Rules:
  - 00-overview.md
  - 01-rules.md
  - steps-rule.md
- Scenarios:
  - 02-scenarios.md (Section: …)
- Acceptance Criteria:
  - 03-acceptance-criteria.md (AC-XXX ~ AC-YYY)
- Decisions:
  - docs/decisions/DEC-XXX.md
- Issues:
  - docs/issues/logs/ISS-YYYY-MM-DD-HHMM-context.md

※ 여기에 명시되지 않은 문서는 존재하지 않는 것으로 간주한다.

---

## 4. Acceptance Criteria (Final)

이 Step이 완료로 간주되기 위한 **최종 기준**만 작성한다.

- AC-XX-01: …
- AC-XX-02: …

---

## 5. Test Strategy (Playwright)

이 Step에서 테스트를 **어떤 단계로 쌓을지**를 정의한다.  
(요구사항을 나누지 말고, 테스트 관점에서 단계화한다.)

### Phase A – Contract / Bootstrap

- 페이지 또는 컴포넌트가 정상적으로 로드된다
- 필수 UI 요소가 사용자 관점에서 인식 가능하다

### Phase B – Core Flow

- 주요 사용자 시나리오 성공 케이스
- 주요 실패 케이스(입력 오류 등)

### Phase C – Edge / Regression

- 엣지 케이스
- 회귀 방지를 위한 핵심 케이스

---

## 6. Test Specification

- **Test Tool**: Playwright (fixed by 01-rules.md)
- **Test Type**: E2E
- **Test Files**:
  - tests/e2e/step-XX-[name].spec.ts

각 테스트는 AC와 1:1 또는 N:1로 매핑되어야 한다.

---

## 7. Execution Notes

- 구현 전에 테스트를 먼저 작성한다.
- 테스트를 통과하기 위한 **최소 구현**을 우선한다.
- 실패한 테스트 또는 불안정한 테스트는 리팩토링 대상으로 기록한다.
- 판단이 어려운 경우 이슈 로그를 남기고 작업은 지속한다.

---

## 8. Deliverables

- 생성/수정된 테스트 파일 목록
- 생성/수정된 구현 파일 목록
- Step 단위 커밋 1개
- Pull Request 1개

---

## 9. Completion Checklist

- [ ] 모든 Acceptance Criteria 충족
- [ ] 모든 Playwright 테스트 통과
- [ ] Step 단위 커밋 존재 (.gitmessage 규칙 준수)
- [ ] PR 생성 완료

---

## 10. Notes

- 이 Step에서 다루지 않은 내용은 다음 Step에서 다룬다.
- 본 문서는 AI가 수정하지 않는다.
