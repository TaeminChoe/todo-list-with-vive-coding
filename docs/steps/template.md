## Step Execution Template

---

## 1. Step Overview

- **Step ID**: step-XX-[short-title]
- **Title**: 한 줄로 표현한 작업 요약
- **Goal**: 이 Step이 완료되었을 때 시스템이 도달해야 하는 상태

---

## 2. Scope

### In Scope

- 이 Step에서 반드시 구현 및 검증되어야 하는 항목

### Out of Scope

- 이 Step에서 의도적으로 제외하는 항목
- 다음 Step으로 이월되는 항목

---

## 3. References (Explicit Only)

### Always Available (Default References)
- 00-overview.md
- 01-rules.md
- docs/steps/steps-rule.md

### Step-Specific References
- docs/domains/[domain-name].md (필요 시)
- docs/scenarios/scenario-XX-xxx.md (SCN-XXX) (필요 시)
- docs/issues/logs/ISS-YYYY-MM-DD-HHMM-context.md (필요 시)

---

## 4. Acceptance Criteria (Step Final)

본 Step이 완료되었다고 판단하기 위한 **구체적이고 검증 가능한 기준**을 작성한다.  
참조한 AC 문서를 기반으로 하되, **이 Step의 결과 기준으로 재정의**한다.

- AC-XX-01: …
- AC-XX-02: …

---

## 5. Test Strategy (Playwright)

이 Step에서 테스트를 **어떤 흐름으로 구성할지**를 정의한다.

### Phase A – Bootstrap

- 페이지/기능이 정상적으로 접근 가능함
- 필수 UI 또는 진입 조건이 충족됨

### Phase B – Core Flow

- 주요 성공 시나리오
- 주요 실패 시나리오

### Phase C – Edge / Regression

- 엣지 케이스
- 회귀 방지를 위한 핵심 테스트

---

## 6. Test Specification

- **Test Tool**: Playwright
- **Test Type**: E2E
- **Test Files**:
  - tests/e2e/step-XX-[name].spec.ts

각 테스트는 Acceptance Criteria와 명시적으로 매핑되어야 한다.

---

## 7. Deliverables

- 생성/수정된 테스트 파일
- 생성/수정된 구현 파일
- **Step 단위 커밋 1개**

---

## 8. Notes

- 이 Step에서 다루지 않은 내용은 다음 Step에서 다룬다.
- 본 문서는 사용자 책임 하에 관리되며, AI는 수정하지 않는다.
