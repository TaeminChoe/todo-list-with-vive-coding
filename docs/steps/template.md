## Step Execution Template

---

## 1. Step Overview

- **Step ID**: step-XX-[short-title]
- **Title**: 한 줄로 표현한 작업 요약
- **Goal**: 이 Step이 완료되었을 때 시스템이 도달해야 하는 상태

---

## 2. Scope

### In Scope

- 이 Step에서 반드시 구현 및 검증되어야 하는 항목

### Out of Scope

- 이 Step에서 의도적으로 제외하는 항목
- 다음 Step으로 이월되는 항목

---

## 3. References (Explicit Only)

이 Step에서 **참조가 허용된 파일 목록**이다.  
여기에 명시되지 않은 파일은 **존재하지 않는 것으로 간주**한다.

- design:
  -
- Scenarios:
  - docs/scenarios/SCN-XXX.md
- Acceptance Criteria:
  - docs/acceptance-criteria/AC-XXX.md
- Decisions:
  - docs/decisions/DEC-XXX.md
- Issues:
  - docs/issues/logs/ISS-YYYY-MM-DD-HHMM-context.md

---

## 4. Acceptance Criteria (Step Final)

본 Step이 완료되었다고 판단하기 위한 **구체적이고 검증 가능한 기준**을 작성한다.  
참조한 AC 문서를 기반으로 하되, **이 Step의 결과 기준으로 재정의**한다.

- AC-XX-01: …
- AC-XX-02: …

---

## 5. Test Strategy (Playwright)

이 Step에서 테스트를 **어떤 흐름으로 구성할지**를 정의한다.

### Phase A – Bootstrap

- 페이지/기능이 정상적으로 접근 가능함
- 필수 UI 또는 진입 조건이 충족됨

### Phase B – Core Flow

- 주요 성공 시나리오
- 주요 실패 시나리오

### Phase C – Edge / Regression

- 엣지 케이스
- 회귀 방지를 위한 핵심 테스트

---

## 6. Test Specification

- **Test Tool**: Playwright
- **Test Type**: E2E
- **Test Files**:
  - tests/e2e/step-XX-[name].spec.ts

각 테스트는 Acceptance Criteria와 명시적으로 매핑되어야 한다.

---

## 7. Deliverables

- 생성/수정된 테스트 파일
- 생성/수정된 구현 파일
- **Step 단위 커밋 1개**

---

## 8. Implementation Guide

### 전제 조건

- 이전 Step이 모두 완료되었으며, 프로젝트가 실행 가능한 상태
- 개발 서버(`npm run dev`)를 실행할 수 있는 환경

### 구현 단계

#### 단계 1: AC 기반 테스트 작성

먼저 테스트를 작성한다. (TDD 접근)

```bash
# 테스트 파일 생성
# tests/e2e/step-XX-[name].spec.ts
```

**테스트 구조**:
- Phase A: Bootstrap (UI 접근성 확인)
- Phase B: Core Flow (성공/실패 시나리오)
- Phase C: Edge / Regression (엣지 케이스)

#### 단계 2: 테스트 실행 및 실패 확인

```bash
# 터미널 1: 개발 서버 실행 (기존 실행 상태 유지)
npm run dev

# 터미널 2: 테스트 실행
npm run test:e2e
```

**예상 결과**: 테스트 실패 (아직 기능이 구현되지 않음)

#### 단계 3: 기능 구현

AC를 만족하도록 다음 파일들을 구현/수정한다:

- `src/App.tsx` - 필요시 라우팅 추가
- `src/pages/TodoListPage.tsx` - 주요 로직
- `src/components/` - 필요한 컴포넌트 생성

#### 단계 4: 테스트 통과 확인

```bash
npm run test:e2e
```

**기준**: 모든 테스트 통과 (✓ N passed)

#### 단계 5: 타입 체크 및 린트 확인

```bash
# TypeScript 타입 확인
npx tsc --noEmit

# (선택) ESLint 확인 (설정되어 있으면)
npm run lint
```

#### 단계 6: Step 완료 체크리스트

완료 전에 다음을 확인한다:

- ✅ 모든 AC 충족
- ✅ E2E 테스트 4개 이상 통과
- ✅ TypeScript 타입 에러 없음
- ✅ 브라우저에서 수동 검증 완료
- ✅ 이전 Step의 기능이 여전히 작동함 (회귀 테스트)

#### 단계 7: 커밋 생성

Step 완료 후 통합 커밋을 생성한다:

```bash
git add src/ tests/
git commit -m "feat(step-XX): [구현한 기능 설명]

- [변경 항목 1]
- [변경 항목 2]

Satisfies AC-XX-01, AC-XX-02

Co-Authored-By: Claude Haiku 4.5 <noreply@anthropic.com>"
```

---

## 9. Notes

- 이 Step에서 다루지 않은 내용은 다음 Step에서 다룬다.
- 본 문서는 사용자 책임 하에 관리되며, AI는 수정하지 않는다.
