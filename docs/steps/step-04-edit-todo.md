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

- Acceptance Criteria:
  - docs/acceptance-criteria/AC-04-edit-todo.md
- Decisions:
  - (없음)
- Issues:
  - (없음)

---

## 4. Acceptance Criteria (Step Final)

- **AC-04-01**: 사용자는 기존 TODO 항목을 수정할 수 있는 UI에 진입할 수 있다.
- **AC-04-02**: 수정된 TODO 내용은 저장 후 목록에 반영된다.
- **AC-04-03**: 수정하지 않은 항목은 변경되지 않는다.
- **AC-04-04**: 빈 내용으로 저장할 수 없다.

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
