## Step Execution – Toggle TODO Completion

---

## 1. Step Overview

- **Step ID**: step-03-toggle-complete
- **Title**: TODO 완료 상태 토글
- **Goal**:  
  사용자가 TODO 항목의 완료 여부를 전환할 수 있다.

---

## 2. Scope

### In Scope

- TODO 항목 완료 상태 표시
- 완료/미완료 상태 토글 기능
- 상태 변화가 UI에 반영됨

### Out of Scope

- 완료 항목 필터링
- 완료 항목 일괄 처리
- 스타일 고도화 (애니메이션 등)

---

## 3. References (Explicit Only)

여기에 명시되지 않은 파일은 존재하지 않는 것으로 간주한다.

- Scenarios:
  - docs/scenarios/scenario-03-toggle-complete.md (SCN-003)
- Acceptance Criteria:
  - docs/acceptance-criteria/ac-01-todo.md (AC-001-06)
- Decisions:
  - (없음)
- Issues:
  - (없음)

---

## 4. Acceptance Criteria (Step Final)

- **AC-001-06**: 사용자가 완료 상태 토글 동작을 수행하면, 해당 Todo의 완료 상태가 변경되어 목록에 표시된다.

---

## 5. Test Strategy (Playwright)

### Phase A – Bootstrap

- TODO 항목이 목록에 표시된다.

### Phase B – Core Flow

- 완료 토글 동작으로 상태가 변경된다.

### Phase C – Edge / Regression

- 토글을 반복 수행해도 상태가 정상적으로 유지된다.

---

## 6. Test Specification

- **Test Tool**: Playwright
- **Test Type**: E2E
- **Test Files**:
  - tests/e2e/step-03-toggle-complete.spec.ts

---

## 7. Deliverables

- TODO 완료 토글 UI 및 로직
- tests/e2e/step-03-toggle-complete.spec.ts
- **Step 단위 커밋 1개**

---

## 8. Implementation Guide

### 전제 조건

- Step-01 (TODO 생성), Step-02 (TODO 삭제) 완료
- 개발 서버 실행 가능 상태

### 구현 단계

#### 단계 1: AC 기반 테스트 작성

```bash
# tests/e2e/step-03-toggle-complete.spec.ts 생성
```

**테스트 케이스**:
- Phase A: TODO 항목이 목록에 표시됨
- Phase B: 토글 동작으로 완료 상태 변경 (AC-001-06)
- Phase C: 반복 토글 시 상태 정상 유지

#### 단계 2: 테스트 실행 및 실패 확인

```bash
# 터미널 1
npm run dev

# 터미널 2
npm run test:e2e
```

**예상**: step-03 테스트 실패 (토글 기능 미구현)

#### 단계 3: 데이터 구조 변경

**수정 파일**: `src/pages/TodoListPage.tsx`

TODO를 문자열에서 객체로 변경:
```typescript
// Before
const [todos, setTodos] = useState<string[]>([])

// After
interface Todo {
  id: string
  text: string
  completed: boolean
}
const [todos, setTodos] = useState<Todo[]>([])
```

#### 단계 4: 토글 기능 구현

**구현 사항**:
```typescript
const handleToggle = (id: string) => {
  setTodos(todos.map(todo =>
    todo.id === id ? { ...todo, completed: !todo.completed } : todo
  ))
}

// UI에서
{todos.map(todo => (
  <div key={todo.id} className={todo.completed ? 'line-through' : ''}>
    <span>{todo.text}</span>
    <button onClick={() => handleToggle(todo.id)}>
      {todo.completed ? '미완료' : '완료'}
    </button>
    <button onClick={() => handleDelete(todo.id)}>삭제</button>
  </div>
))}
```

#### 단계 5: 생성 로직 업데이트

`handleAdd` 함수에서 새 TODO를 객체로 생성:
```typescript
const handleAdd = () => {
  if (input.trim()) {
    setTodos([...todos, {
      id: Date.now().toString(),
      text: input,
      completed: false
    }])
    setInput('')
  }
}
```

#### 단계 6: 테스트 통과 확인

```bash
npm run test:e2e
```

**기준**: AC-001-06 관련 테스트 통과

#### 단계 7: 회귀 테스트

```bash
npm run test:e2e  # 모든 테스트 (Step-00, 01, 02, 03)
```

**확인**: 생성, 삭제 기능 여전히 정상 작동

#### 단계 8: 완료 체크리스트

- ✅ AC-001-06: TODO 완료 토글 기능 작동
- ✅ E2E 테스트 3개 이상 통과
- ✅ Step-00, 01, 02 테스트 여전히 통과
- ✅ TypeScript 에러 없음

#### 단계 9: 커밋 생성

```bash
git add src/pages/TodoListPage.tsx tests/e2e/step-03-toggle-complete.spec.ts
git commit -m "feat(step-03): implement TODO completion toggle functionality

- Change TODO data structure from string to object (id, text, completed)
- Add toggle button to mark TODO as complete/incomplete
- Update UI to show completion status (visual indicator)
- Update create and delete functions for new data structure
- Add E2E tests for toggle flow

Satisfies AC-001-06

Co-Authored-By: Claude Haiku 4.5 <noreply@anthropic.com>"
```

---

## 9. Notes

- 완료 상태의 표현 방식은 단순 시각적 구분만을 목표로 한다.
- 필터링(완료/미완료만 보기)은 Step-04에서 다룬다.
