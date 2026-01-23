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

- Scenarios:
  - docs/scenarios/scenario-01-create-todo.md (SCN-001)
- Acceptance Criteria:
  - docs/acceptance-criteria/ac-01-todo.md (AC-001-01, AC-001-02)
- Decisions:
  - (없음)
- Issues:
  - (없음)

---

## 4. Acceptance Criteria (Step Final)

- **AC-001-01**: 사용자가 유효한 내용을 입력하고 추가 동작을 수행하면, 새로운 Todo가 목록에 표시된다.
- **AC-001-02**: 사용자가 빈 입력 또는 유효하지 않은 입력으로 추가 동작을 수행하면, Todo는 생성되지 않는다.

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

## 8. Implementation Guide

### 전제 조건

- Step-00 (프로젝트 초기화) 완료
- 개발 서버 실행 가능 상태

### 구현 단계

#### 단계 1: AC 기반 테스트 작성

```bash
# tests/e2e/step-01-create-todo.spec.ts 생성
```

**테스트 케이스**:
- Phase A: TodoListPage 접근 가능, 입력 UI 표시
- Phase B: 유효한 입력으로 TODO 생성 (AC-001-01)
- Phase C: 빈 입력 시 생성 안 됨 (AC-001-02)

#### 단계 2: 테스트 실행 및 실패 확인

```bash
# 터미널 1
npm run dev

# 터미널 2
npm run test:e2e
```

**예상**: 테스트 실패 (구현 전)

#### 단계 3: 기능 구현

**수정 파일**:
- `src/pages/TodoListPage.tsx`
  - useState로 TODO 목록 상태 관리
  - 입력 필드 및 "추가" 버튼 UI 구성
  - 입력값 검증 로직 (빈 문자열 체크)
  - 새 TODO 추가 함수 구현

**구현 사항**:
```typescript
// 예시 구조
const [todos, setTodos] = useState<string[]>([])
const [input, setInput] = useState('')

const handleAdd = () => {
  if (input.trim()) {  // 빈 입력 체크
    setTodos([...todos, input])
    setInput('')
  }
}
```

#### 단계 4: 테스트 통과 확인

```bash
npm run test:e2e
```

**기준**: AC-001-01, AC-001-02 관련 테스트 통과

#### 단계 5: 타입 및 회귀 확인

```bash
npx tsc --noEmit
npm run test:e2e  # 모든 테스트 (Step-00 포함)
```

#### 단계 6: 완료 체크리스트

- ✅ AC-001-01: 유효한 입력으로 TODO 생성 가능
- ✅ AC-001-02: 빈 입력 시 생성 안 됨
- ✅ E2E 테스트 3개 이상 통과
- ✅ Step-00 테스트 여전히 통과 (회귀 없음)
- ✅ TypeScript 에러 없음

#### 단계 7: 커밋 생성

```bash
git add src/pages/TodoListPage.tsx tests/e2e/step-01-create-todo.spec.ts
git commit -m "feat(step-01): implement TODO creation functionality

- Add input form and add button UI
- Implement TODO state management with useState
- Add input validation (prevent empty todos)
- Add E2E tests for creation flow

Satisfies AC-001-01, AC-001-02

Co-Authored-By: Claude Haiku 4.5 <noreply@anthropic.com>"
```

---

## 9. Notes

- 본 Step에서는 TODO 항목의 구조를 단순 텍스트 기준으로 취급한다.
- 데이터 영속성(localStorage 등)은 Step-04에서 다룬다.
