# ac-01-todo.md

## Acceptance Criteria – Todo Domain

---

## 1. Acceptance Criteria Overview

- **AC Document ID**: AC-001
- **Title**: Todo 도메인에 대한 통합 판정 기준
- **Derived From Scenarios**:
  - SCN-001 (scenario-01-create-todo.md)
  - SCN-002 (scenario-02-delete-todo.md)
  - SCN-003 (scenario-03-toggle-complete.md)
  - SCN-004 (scenario-04-edit-todo.md)
- **Description**:
  - 사용자가 Todo를 생성, 수정, 삭제하고
    완료 상태를 변경하는 전 과정에서
    기능이 성공적으로 동작했는지를 판단하기 위한 기준을 정의한다.

---

## 2. Acceptance Criteria List

### Creation

### AC-001-01: 유효한 입력으로 Todo 생성

**Related Scenarios**
- SCN-001

**Given**
- 사용자가 TODO 서비스에 접근한 상태

**When**
- 사용자가 유효한 내용을 입력하고 추가 동작을 수행한다

**Then**
- 새로운 Todo가 목록에 표시된다

---

### AC-001-02: 빈/유효하지 않은 입력으로 Todo 생성 시도

**Related Scenarios**
- SCN-001

**Given**
- 사용자가 TODO 서비스에 접근한 상태

**When**
- 사용자가 빈 입력 또는 유효하지 않은 입력으로 추가 동작을 수행한다

**Then**
- Todo는 생성되지 않는다

---

### Update (Content)

### AC-001-03: 유효한 입력으로 Todo 내용 수정

**Related Scenarios**
- SCN-004

**Given**
- 사용자가 수정할 Todo를 목록에서 찾은 상태

**When**
- 사용자가 유효한 내용을 입력하고 수정 반영 동작을 수행한다

**Then**
- 해당 Todo의 내용이 변경되어 목록에 표시된다

---

### AC-001-04: Todo 수정 취소

**Related Scenarios**
- SCN-004

**Given**
- 사용자가 Todo 수정 가능 상태에 있는 경우

**When**
- 사용자가 수정 취소 동작을 수행한다

**Then**
- Todo의 기존 내용이 유지되어 표시된다

---

### AC-001-05: 유효하지 않은 입력으로 Todo 수정 시도

**Related Scenarios**
- SCN-004

**Given**
- 사용자가 수정할 Todo를 목록에서 찾은 상태

**When**
- 사용자가 유효하지 않은 내용을 입력하고 수정 반영 동작을 수행한다

**Then**
- 수정 내용은 반영되지 않는다

---

### Update (Status)

### AC-001-06: Todo 완료 상태 토글

**Related Scenarios**
- SCN-003

**Given**
- 사용자가 상태를 변경할 Todo를 목록에서 찾은 상태

**When**
- 사용자가 완료 상태 토글 동작을 수행한다

**Then**
- 해당 Todo의 완료 상태가 변경되어 목록에 표시된다

---

### Deletion

### AC-001-07: Todo 삭제

**Related Scenarios**
- SCN-002

**Given**
- 사용자가 삭제할 Todo를 목록에서 찾은 상태

**When**
- 사용자가 삭제 동작을 수행한다

**Then**
- 해당 Todo는 목록에서 제거된다

---

### General Failure Conditions

### AC-001-08: 존재하지 않는 Todo에 대한 동작

**Related Scenarios**
- SCN-001, SCN-002, SCN-003, SCN-004

**Given**
- 대상 Todo가 더 이상 존재하지 않는 상태

**When**
- 사용자가 생성 이외의 동작(수정, 삭제, 상태 변경)을 수행한다

**Then**
- Todo 목록은 변경되지 않는다

---

## 3. Notes

- 입력 유효성의 구체적인 기준은 Step에서 테스트를 통해 정의한다.
- UI 표현 방식, 애니메이션, 시각적 강조는 판정 기준에 포함하지 않는다.
- 데이터 영속성(새로고침 이후 상태 유지)은 본 AC에서 다루지 않는다.

---

## 4. References

- Global Rules:
  - 03-acceptance-criteria.md
- Project Rules:
  - /docs/acceptance-criteria/ac-rule.md
