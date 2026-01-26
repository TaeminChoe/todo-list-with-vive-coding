# Domain Document Template

## [Domain Name] Data Model

---

## 1. Domain Overview

- **Domain Name**: [도메인명]
- **Purpose**: [이 도메인의 목적 한 줄 설명]

---

## 2. Data Structure

### [Entity Name]

#### Fields

- **field_name_1** (type): 설명 및 제약조건. 기본값 [기본값].
- **field_name_2** (type): 설명 및 제약조건.
- **field_name_3** (enum): 설명.
  - Value 1
  - Value 2

#### Constraints

- [제약조건 1]
- [제약조건 2]

---

## 3. State Definitions

### [State Name]

유효한 상태 값:
- `"STATE_1"`: [설명]
- `"STATE_2"`: [설명]

상태 전이:
- `STATE_1` → `STATE_2`: [조건]
- `STATE_2` → `STATE_1`: [조건]

---

## 4. Business Rules

- [비즈니스 규칙 1]
- [비즈니스 규칙 2]

---

## 5. Notes

- [추가 사항]
