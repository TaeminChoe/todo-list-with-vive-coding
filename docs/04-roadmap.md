# 04-roadmap.md

## Roadmap Rules

---

## 1. Purpose

이 문서는 프로젝트를 단계적으로 진행하기 위한 **Roadmap 규칙**을 정의한다.

- 기능 요구사항, 구현 방식, 상세 Step 내용은 포함하지 않는다.
- Step의 구체적인 내용은 각 Step 문서에서 정의한다.
- 본 문서는 **모든 프로젝트에 재사용 가능한 일반화된 규칙 문서**다.

---

## 2. Scope of Roadmap

Roadmap은 다음 항목만을 규정한다.

- Step의 **순서 규칙**
- Step 완료 단위
- 커밋 및 PR 생성 시점

Roadmap은 다음을 정의하지 않는다.

- Step의 역할 또는 목적
- 기능 구현 범위
- 기술 스택, 테스트 방식

---

## 3. Step Ordering Rules

- Step은 번호 순서대로 진행된다.
- Step 번호는 실행 순서를 의미한다.
- Step 번호는 `00`부터 시작할 수 있다.
- 번호 간 의미적 차이(예외, 특수 단계 등)는 존재하지 않는다.

형식:

- `step-XX-*.md`
- `XX`는 두 자리 숫자다.

---

## 4. Step Completion Rules

- 각 Step은 완료 단위로 관리된다.
- Step 완료 여부는 해당 Step 문서에 정의된 조건을 기준으로 판단한다.
- 이미 완료된 Step은 다시 실행하지 않는다.

---

## 5. Commit Rules

- Step이 완료될 때마다 **Step 단위 커밋을 반드시 생성한다**.
- 커밋 메시지는 루트의 `.gitmessage` 규칙을 따른다.
- 하나의 Step에는 하나의 커밋만 존재한다.

---

## 6. Pull Request Rules

- PR은 개별 Step 완료 시점에 생성하지 않는다.
- PR은 다음 조건을 만족했을 때 생성한다.

PR 생성 조건:

- Roadmap에 정의된 **모든 Step이 완료되었을 때**

- PR은 여러 Step 커밋을 포함하는 **검토 단위**다.
- Step은 실행 단위이며, PR과 동일하지 않다.

---

## 7. Step Definition Flexibility

- Roadmap에 정의된 Step은 **공식 실행 순서**를 의미한다.
- Roadmap에 포함되지 않은 Step 문서는:
  - 공식 진행 Step으로 간주하지 않는다.
  - Roadmap 규칙의 적용 대상이 아니다.

---

## 8. Document Authority

- 본 문서는 프로젝트 진행 규칙에 대한 **최상위 기준 문서**다.
- 하위 문서는 본 문서의 규칙을 완화하거나 재정의할 수 없다.
