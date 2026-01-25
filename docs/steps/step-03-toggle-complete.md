## Step Execution – Toggle TODO Completion

---

## 1. Step Overview

- **Step ID**: step-03-toggle-complete
- **Title**: TODO 완료 상태 토글
- **Goal**:
  사용자가 TODO 항목의 완료 여부를 전환할 수 있다.

---

## 2. Scope

### In Scope

- TODO 항목 완료 상태 표시
- 완료/미완료 상태 토글 기능
- 상태 변화가 UI에 반영됨

### Out of Scope

- 완료 항목 필터링
- 완료 항목 일괄 처리
- 스타일 고도화 (애니메이션 등)

---

## 3. References (Explicit Only)

여기에 명시되지 않은 파일은 존재하지 않는 것으로 간주한다.

- Scenarios:
  - docs/scenarios/scenario-03-toggle-complete.md (SCN-003)
- Decisions:
  - (없음)
- Issues:
  - (없음)

---

## 4. Acceptance Criteria (Step Final)

### AC-001-06: TODO 완료 상태 토글

**Given**
- 사용자가 상태를 변경할 Todo를 목록에서 찾은 상태

**When**
- 사용자가 완료 상태 토글 동작을 수행한다

**Then**
- 해당 Todo의 완료 상태가 변경되어 목록에 표시된다

---

## 5. Test Strategy (Playwright)

### Phase A – Bootstrap

- TODO 항목이 목록에 표시된다.

### Phase B – Core Flow

- 완료 토글 동작으로 상태가 변경된다.

### Phase C – Edge / Regression

- 토글을 반복 수행해도 상태가 정상적으로 유지된다.

---

## 6. Test Specification

- **Test Tool**: Playwright
- **Test Type**: E2E
- **Test Files**:
  - tests/e2e/step-03-toggle-complete.spec.ts

---

## 7. Deliverables

- TODO 완료 토글 UI 및 로직
- tests/e2e/step-03-toggle-complete.spec.ts
- **Step 단위 커밋 1개**

---

## 8. Notes

- 완료 상태의 표현 방식은 단순 시각적 구분만을 목표로 한다.
- 필터링(완료/미완료만 보기)은 향후 Step에서 다룬다.
