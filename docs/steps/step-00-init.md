## Step Execution – Project Initialization

---

## 1. Step Overview

- **Step ID**: step-00-init
- **Title**: 프로젝트 초기화 (React + TypeScript + TailwindCSS)
- **Goal**:  
  이후 Step에서 도메인 기능을 구현할 수 있도록,  
  애플리케이션 실행·라우팅·스타일·E2E 테스트가 가능한 최소 프로젝트 기반을 확보한다.

---

## 2. Scope

### In Scope

- React + TypeScript + TailwindCSS 기반 프로젝트 초기화
- 애플리케이션 진입이 가능한 기본 라우트 1개 구성
- 공통 레이아웃 또는 페이지 골격 구성
- Playwright 설치 및 실행 가능한 테스트 환경 구성
- 최소 1개의 E2E 스모크 테스트 작성 및 통과

### Out of Scope

- TODO 도메인 기능 구현 (추가/수정/삭제)
- 데이터 영속성 (스토리지, DB, API 연동)
- 디자인 시스템 구축 또는 UI 고도화
- 상태 관리, 폼 처리 등 애플리케이션 구조 고도화

---

## 3. References (Explicit Only)

이 Step에서 참조가 허용된 파일 목록이다.  
여기에 명시되지 않은 파일은 존재하지 않는 것으로 간주한다.

- Acceptance Criteria:
  - docs/acceptance-criteria/ac-00-init.md (AC-000-01 ~ AC-000-05)
- Decisions:
  - (없음)
- Issues:
  - (없음)

---

## 4. Acceptance Criteria (Step Final)

본 Step은 “기능 구현”이 아닌 “실행 기반 확보” 단계다.  
아래 기준을 모두 만족할 경우 Step 완료로 간주한다.

- **AC-000-01**: 개발 서버를 실행하면 애플리케이션이 오류 없이 로드된다.
- **AC-000-02**: 기본 진입 라우트에서 사용자에게 인지 가능한 화면 요소가 렌더링된다.
- **AC-000-03**: TailwindCSS 유틸리티 클래스가 적용된 스타일 변화가 화면에서 확인된다.
- **AC-000-04**: 도메인 기능 구현을 위한 기본 페이지(예: TODO 목록 화면) 라우트가 존재한다.
- **AC-000-05**: Playwright 테스트가 실행 가능하며, 최소 1개의 E2E 스모크 테스트가 통과한다.

---

## 5. Test Strategy (Playwright)

이 Step의 테스트는 “애플리케이션이 실행 가능한 상태인지”를 검증하는 데 목적이 있다.

### Phase A – Bootstrap

- 애플리케이션 진입 가능 여부 확인
- 기본 라우트 접근 시 화면 렌더링 확인
- 핵심 텍스트 또는 UI 요소 존재 여부 확인

### Phase B – Core Flow

- (해당 없음)  
  본 Step은 사용자 도메인 플로우를 검증하지 않는다.

### Phase C – Edge / Regression

- Playwright 실행 안정성 검증
  - baseURL 설정
  - headless 모드 실행 가능 여부

---

## 6. Test Specification

- **Test Tool**: Playwright
- **Test Type**: E2E (Smoke)
- **Test Files**:
  - tests/e2e/step-00-init.spec.ts

테스트는 Acceptance Criteria와 명시적으로 매핑되어야 한다.

---

## 7. Deliverables

- React + TypeScript + TailwindCSS 프로젝트 초기 구조
- 기본 라우트 및 페이지/레이아웃 골격
- Playwright 설정 파일
- tests/e2e/step-00-init.spec.ts
- **Step 단위 커밋 1개**

---

## 8. Notes

- 본 Step은 도메인 기능 개발 이전의 기반 구축 단계다.
- 이후 Step에서 기능 요구사항에 따라 폴더 구조 및 라우팅은 변경될 수 있다.
- 본 문서는 사용자 책임 하에 관리되며, AI는 수정하지 않는다.
