# ac-00-init.md

## Acceptance Criteria – Project Initialization

---

## 1. Acceptance Criteria Overview

- **AC Document ID**: AC-000
- **Title**: 프로젝트 초기 세팅에 대한 판정 기준
- **Derived From Scenario**:
  - (없음) — 본 AC는 사용자 시나리오가 아닌 프로젝트 기반 구축 단계에 해당한다.
- **Description**:
  - React + TypeScript + TailwindCSS 기반 프로젝트가
    이후 기능 Step을 진행할 수 있는 상태인지 판단하기 위한 기준을 정의한다.

---

## 2. Acceptance Criteria List

- **AC-000-01**
  - 개발 서버를 실행하면,
    기본 진입 경로에서 화면이 정상적으로 렌더링된다.

- **AC-000-02**
  - 화면에 TailwindCSS 클래스가 적용된 스타일 변화를
    사용자가 인지할 수 있다.

- **AC-000-03**
  - TODO 기능을 구현할 기본 라우트(목록 화면)가 존재하며,
    해당 경로로 접근 가능하다.

- **AC-000-04**
  - Playwright 테스트 실행 환경이 구성되어,
    테스트 명령을 실행할 수 있다.

- **AC-000-05**
  - 프로젝트 초기 상태를 검증하는
    최소 1개의 Playwright 테스트가 통과한다.

---

## 3. Notes

- 본 AC는 도메인 기능의 동작을 판정하지 않는다.
- UI 구성의 세부 사항(레이아웃, 디자인)은 판정 기준에 포함하지 않는다.
- 데이터 영속성, 상태 관리 방식은 본 AC에서 다루지 않는다.

---

## 4. References

- Global Rules:
  - 03-acceptance-criteria.md
- Project Rules:
  - /docs/acceptance-criteria/ac-rule.md
- Related Step:
  - /docs/steps/step-00-init.md
