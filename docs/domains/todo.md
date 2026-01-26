# Domain: Todo Data Model

---

## 1. Domain Overview

- **Domain Name**: Todo
- **Purpose**: TODO 애플리케이션의 할 일 항목 데이터 구조를 정의한다.

---

## 2. Data Structure

### Todo Entity

#### Fields

- **id** (string, UUID): 고유 식별자. 시스템에서 자동 생성.
- **message** (string): 할 일 내용. 1자 이상 255자 이하.
- **status** ("COMPLETE" | "NOT_COMPLETE"): 완료 상태. 기본값 "NOT_COMPLETE".
- **createdAt** (ISO 8601 string): 생성 시각. 시스템에서 자동 기록.
- **modifiedAt** (ISO 8601 string): 마지막 수정 시각. 수정될 때마다 업데이트.

#### Constraints

- `id`는 변경될 수 없다.
- `message`는 공백 문자만으로 구성될 수 없다.
- `message`는 255자를 초과할 수 없다.
- `status`는 정의된 값("COMPLETE" 또는 "NOT_COMPLETE")만 허용한다.
- `createdAt`은 변경될 수 없다.
- `modifiedAt`은 `message` 또는 `status` 변경 시에만 업데이트된다.

---

## 3. State Definitions

### Status (완료 상태)

유효한 상태 값:
- `"NOT_COMPLETE"`: 미완료 상태 (기본값)
- `"COMPLETE"`: 완료 상태

상태 전이:
- `"NOT_COMPLETE"` → `"COMPLETE"`: 사용자가 완료 버튼 클릭
- `"COMPLETE"` → `"NOT_COMPLETE"`: 사용자가 미완료 버튼 클릭

---

## 4. Business Rules

- 각 Todo는 고유한 `id`를 가지며, 동일한 id를 가진 Todo는 한 번에 하나만 존재한다.
- `message`가 변경되면 `modifiedAt`이 자동으로 갱신된다.
- `status`가 변경되면 `modifiedAt`이 자동으로 갱신된다.
- 삭제된 Todo는 복구될 수 없다.

---

## 5. Notes

- 본 도메인 정의는 메모리 기반 상태만 다룬다. 영속성(localStorage, DB)은 향후 구현 Step에서 다룬다.
