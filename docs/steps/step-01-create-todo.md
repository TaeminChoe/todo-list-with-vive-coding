## Step Execution – Create TODO

---

## 1. Step Overview

- **Step ID**: step-01-create-todo
- **Title**: TODO 항목 생성
- **Goal**:  
  사용자가 입력한 TODO 항목을 목록에 추가할 수 있는 기본 생성 기능을 제공한다.

---

## 2. Scope

### In Scope

- TODO 입력 UI 제공
- 사용자 입력을 통한 TODO 항목 생성
- 생성된 TODO가 목록에 즉시 반영됨

### Out of Scope

- TODO 삭제
- TODO 완료 상태 처리
- TODO 수정
- 데이터 영속성 (새로고침 유지)

---

## 3. References (Explicit Only)

여기에 명시되지 않은 파일은 존재하지 않는 것으로 간주한다.

- Acceptance Criteria:
  - docs/acceptance-criteria/AC-01-create-todo.md
- Decisions:
  - (없음)
- Issues:
  - (없음)

---

## 4. Acceptance Criteria (Step Final)

- **AC-01-01**: 사용자는 TODO 내용을 입력할 수 있는 입력 UI를 확인할 수 있다.
- **AC-01-02**: 사용자가 TODO를 입력하고 생성 동작을 수행하면 새로운 TODO가 목록에 추가된다.
- **AC-01-03**: 생성된 TODO 항목은 입력한 텍스트를 그대로 표시한다.
- **AC-01-04**: TODO 생성 후 입력 필드는 비워진다.

---

## 5. Test Strategy (Playwright)

### Phase A – Bootstrap

- TODO 목록 화면에 접근 가능하다.
- TODO 입력 UI가 화면에 표시된다.

### Phase B – Core Flow

- TODO를 입력하고 생성하면 목록에 항목이 추가된다.

### Phase C – Edge / Regression

- 빈 입력값으로 생성 시 TODO가 추가되지 않는다.

---

## 6. Test Specification

- **Test Tool**: Playwright
- **Test Type**: E2E
- **Test Files**:
  - tests/e2e/step-01-create-todo.spec.ts

각 테스트는 Acceptance Criteria와 명시적으로 매핑되어야 한다.

---

## 7. Deliverables

- TODO 생성 UI 및 로직
- tests/e2e/step-01-create-todo.spec.ts
- **Step 단위 커밋 1개**

---

## 8. Notes

- 본 Step에서는 TODO 항목의 구조를 단순 텍스트 기준으로 취급한다.
