# ac-01-todo.md

## Acceptance Criteria – Todo Domain

---

## 1. Acceptance Criteria Overview

- **AC Document ID**: AC-01
- **Title**: Todo 도메인에 대한 통합 판정 기준
- **Derived From Scenarios**:
  - SC-01 (scenario-01-create-todo.md)
  - SC-02 (scenario-02-delete-todo.md)
  - SC-03 (scenario-03-toggle-complete.md)
  - SC-04 (scenario-04-edit-todo.md)
- **Description**:
  - 사용자가 Todo를 생성, 수정, 삭제하고
    완료 상태를 변경하는 전 과정에서
    기능이 성공적으로 동작했는지를 판단하기 위한 기준을 정의한다.

---

## 2. Acceptance Criteria List

### Creation

- **AC-01-01**
  - 사용자가 유효한 내용을 입력하고 Todo 추가 동작을 수행하면,
    새로운 Todo는 목록에 표시된다.

- **AC-01-02**
  - 사용자가 내용을 입력하지 않거나 유효하지 않은 입력으로
    Todo 추가를 시도한 경우,
    Todo는 생성되지 않는다.

---

### Update (Content)

- **AC-01-03**
  - 사용자가 유효한 내용을 입력하고 수정 반영 동작을 수행하면,
    해당 Todo의 내용은 변경된다.

- **AC-01-04**
  - 사용자가 수정을 취소한 경우,
    Todo의 기존 내용은 유지된다.

- **AC-01-05**
  - 사용자가 유효하지 않은 내용을 입력한 경우,
    수정 내용은 반영되지 않는다.

---

### Update (Status)

- **AC-01-06**
  - 사용자가 완료 상태 토글 동작을 수행하면,
    해당 Todo의 완료 상태는 변경된다.

---

### Deletion

- **AC-01-07**
  - 사용자가 기존 Todo에 대해 삭제 동작을 수행하면,
    해당 Todo는 목록에서 제거된다.

---

### General Failure Conditions

- **AC-01-08**
  - 대상 Todo가 더 이상 존재하지 않는 상태에서
    생성 이외의 동작(수정, 삭제, 상태 변경)을 수행한 경우,
    Todo 목록은 변경되지 않는다.

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
