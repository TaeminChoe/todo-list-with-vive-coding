## Step Execution – Edit TODO

---

## 1. Step Overview

- **Step ID**: step-04-edit-todo
- **Title**: TODO 항목 수정
- **Goal**:  
  사용자가 기존 TODO 항목의 내용을 수정할 수 있다.

---

## 2. Scope

### In Scope

- TODO 항목 수정 진입 UI 제공
- TODO 내용 수정 및 저장
- 수정 결과가 목록에 반영됨

### Out of Scope

- 수정 취소 이력 관리
- 동시 수정 처리
- 입력 검증 고도화

---

## 3. References (Explicit Only)

여기에 명시되지 않은 파일은 존재하지 않는 것으로 간주한다.

- Scenarios:
  - docs/scenarios/scenario-04-edit-todo.md (SCN-004)
- Acceptance Criteria:
  - docs/acceptance-criteria/ac-01-todo.md (AC-001-03, AC-001-04, AC-001-05)
- Decisions:
  - (없음)
- Issues:
  - (없음)

---

## 4. Acceptance Criteria (Step Final)

- **AC-001-03**: 사용자가 유효한 내용을 입력하고 수정 반영 동작을 수행하면, 해당 Todo의 내용이 변경되어 목록에 표시된다.
- **AC-001-04**: 사용자가 수정 취소 동작을 수행하면, Todo의 기존 내용이 유지되어 표시된다.
- **AC-001-05**: 사용자가 유효하지 않은 내용을 입력하고 수정 반영 동작을 수행하면, 수정 내용은 반영되지 않는다.

---

## 5. Test Strategy (Playwright)

### Phase A – Bootstrap

- TODO 항목이 목록에 존재한다.

### Phase B – Core Flow

- TODO 내용을 수정하고 저장하면 변경 내용이 반영된다.

### Phase C – Edge / Regression

- 수정 도중 입력을 변경해도 다른 항목에 영향이 없다.

---

## 6. Test Specification

- **Test Tool**: Playwright
- **Test Type**: E2E
- **Test Files**:
  - tests/e2e/step-04-edit-todo.spec.ts

---

## 7. Deliverables

- TODO 수정 UI 및 로직
- tests/e2e/step-04-edit-todo.spec.ts
- **Step 단위 커밋 1개**

---

## 8. Notes

- 수정 UI의 표현 방식(인라인/모달 등)은 본 Step에서 강제하지 않는다.
- 데이터 영속성(localStorage)은 향후 Step에서 다룬다.
