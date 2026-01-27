## Step Execution – Delete TODO

---

## 1. Step Overview

- **Step ID**: step-02-delete-todo
- **Title**: TODO 항목 삭제
- **Goal**:
  사용자가 기존 TODO 항목을 목록에서 제거할 수 있다.

---

## 2. Scope

### In Scope

- TODO 항목별 삭제 UI 제공
- 특정 TODO 항목 삭제 처리
- 삭제 결과가 목록에 즉시 반영됨

### Out of Scope

- 삭제 확인 모달
- 다중 선택 삭제
- 완료 상태와의 연계 처리

---

## 3. References (Explicit Only)

### Always Available (Default References)

- 00-overview.md
- 01-rules.md
- docs/steps/steps-rule.md

### Step-Specific References

- docs/domains/todo.md
- docs/scenarios/scenario-02-delete-todo.md (SCN-002)
- @docs/design/README.md

---

## 4. Acceptance Criteria (Step Final)

### AC-02-01: TODO 삭제

**Given**

- 사용자가 삭제할 Todo를 목록에서 찾은 상태

**When**

- 사용자가 삭제 동작을 수행한다

**Then**

- 해당 Todo는 목록에서 제거된다

---

## 5. Test Strategy (Playwright)

### Phase A – Bootstrap

- TODO 목록에 하나 이상의 항목이 존재한다.

### Phase B – Core Flow

- 특정 TODO 항목을 삭제하면 목록에서 사라진다.

### Phase C – Edge / Regression

- 삭제 후 남은 TODO 항목의 순서와 내용이 유지된다.

---

## 6. Test Specification

- **Test Tool**: Playwright
- **Test Type**: E2E
- **Test Files**:
  - tests/e2e/step-02-delete-todo.spec.ts

---

## 7. Deliverables

- TODO 삭제 UI 및 로직
- tests/e2e/step-02-delete-todo.spec.ts
- **Step 단위 커밋 1개**

---

## 8. Notes

- 삭제 동작은 즉시 반영되며 되돌리기 기능은 제공하지 않는다.
- 삭제 확인 모달은 향후 Step에서 고려할 수 있다.
