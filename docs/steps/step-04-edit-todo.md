## Step Execution – Edit TODO

---

## 1. Step Overview

- **Step ID**: step-04-edit-todo
- **Title**: TODO 항목 수정
- **Goal**:  
  사용자가 기존 TODO 항목의 내용을 수정할 수 있다.

---

## 2. Scope

### In Scope

- TODO 항목 수정 진입 UI 제공
- TODO 내용 수정 및 저장
- 수정 결과가 목록에 반영됨

### Out of Scope

- 수정 취소 이력 관리
- 동시 수정 처리
- 입력 검증 고도화

---

## 3. References (Explicit Only)

여기에 명시되지 않은 파일은 존재하지 않는 것으로 간주한다.

- Scenarios:
  - docs/scenarios/scenario-04-edit-todo.md (SCN-004)
- Acceptance Criteria:
  - docs/acceptance-criteria/ac-01-todo.md (AC-001-03, AC-001-04, AC-001-05)
- Decisions:
  - (없음)
- Issues:
  - (없음)

---

## 4. Acceptance Criteria (Step Final)

- **AC-001-03**: 사용자가 유효한 내용을 입력하고 수정 반영 동작을 수행하면, 해당 Todo의 내용이 변경되어 목록에 표시된다.
- **AC-001-04**: 사용자가 수정 취소 동작을 수행하면, Todo의 기존 내용이 유지되어 표시된다.
- **AC-001-05**: 사용자가 유효하지 않은 내용을 입력하고 수정 반영 동작을 수행하면, 수정 내용은 반영되지 않는다.

---

## 5. Test Strategy (Playwright)

### Phase A – Bootstrap

- TODO 항목이 목록에 존재한다.

### Phase B – Core Flow

- TODO 내용을 수정하고 저장하면 변경 내용이 반영된다.

### Phase C – Edge / Regression

- 수정 도중 입력을 변경해도 다른 항목에 영향이 없다.

---

## 6. Test Specification

- **Test Tool**: Playwright
- **Test Type**: E2E
- **Test Files**:
  - tests/e2e/step-04-edit-todo.spec.ts

---

## 7. Deliverables

- TODO 수정 UI 및 로직
- tests/e2e/step-04-edit-todo.spec.ts
- **Step 단위 커밋 1개**

---

## 8. Implementation Guide

### 전제 조건

- Step-01~03 (생성, 삭제, 토글) 완료
- 개발 서버 실행 가능 상태

### 구현 단계

#### 단계 1: AC 기반 테스트 작성

```bash
# tests/e2e/step-04-edit-todo.spec.ts 생성
```

**테스트 케이스**:
- Phase A: TODO 항목이 목록에 표시됨
- Phase B:
  - 유효한 입력으로 수정 저장 (AC-001-03)
  - 빈 입력 시 저장 안 됨 (AC-001-05)
  - 수정 취소 시 기존 내용 유지 (AC-001-04)
- Phase C: 수정 도중 다른 항목 영향 없음

#### 단계 2: 테스트 실행 및 실패 확인

```bash
# 터미널 1
npm run dev

# 터미널 2
npm run test:e2e
```

**예상**: step-04 테스트 실패 (수정 기능 미구현)

#### 단계 3: 수정 모드 상태 추가

**수정 파일**: `src/pages/TodoListPage.tsx`

```typescript
const [editingId, setEditingId] = useState<string | null>(null)
const [editText, setEditText] = useState('')
```

#### 단계 4: 수정 진입 함수

```typescript
const handleEditStart = (id: string, text: string) => {
  setEditingId(id)
  setEditText(text)
}
```

#### 단계 5: 수정 저장 함수

```typescript
const handleEditSave = (id: string) => {
  if (editText.trim()) {  // 빈 입력 체크 (AC-001-05)
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, text: editText } : todo
    ))
    setEditingId(null)
    setEditText('')
  }
}
```

#### 단계 6: 수정 취소 함수

```typescript
const handleEditCancel = () => {
  setEditingId(null)
  setEditText('')
}
```

#### 단계 7: UI 구현 (인라인 편집)

```typescript
{todos.map(todo => (
  <div key={todo.id}>
    {editingId === todo.id ? (
      <>
        <input
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
        />
        <button onClick={() => handleEditSave(todo.id)}>저장</button>
        <button onClick={handleEditCancel}>취소</button>
      </>
    ) : (
      <>
        <span className={todo.completed ? 'line-through' : ''}>
          {todo.text}
        </span>
        <button onClick={() => handleEditStart(todo.id, todo.text)}>수정</button>
        <button onClick={() => handleToggle(todo.id)}>
          {todo.completed ? '미완료' : '완료'}
        </button>
        <button onClick={() => handleDelete(todo.id)}>삭제</button>
      </>
    )}
  </div>
))}
```

#### 단계 8: 테스트 통과 확인

```bash
npm run test:e2e
```

**기준**: AC-001-03, AC-001-04, AC-001-05 관련 테스트 통과

#### 단계 9: 전체 회귀 테스트

```bash
npm run test:e2e  # 모든 테스트 (Step-00~04)
```

**확인**: 생성, 삭제, 토글 기능 여전히 정상 작동

#### 단계 10: 완료 체크리스트

- ✅ AC-001-03: 유효한 입력으로 수정 저장
- ✅ AC-001-04: 수정 취소 시 기존 내용 유지
- ✅ AC-001-05: 빈 입력 시 저장 안 됨
- ✅ E2E 테스트 4개 이상 통과
- ✅ 모든 이전 Step 테스트 통과
- ✅ TypeScript 에러 없음

#### 단계 11: 커밋 생성

```bash
git add src/pages/TodoListPage.tsx tests/e2e/step-04-edit-todo.spec.ts
git commit -m "feat(step-04): implement TODO edit functionality

- Add edit mode state management (editingId, editText)
- Implement edit save with validation (prevent empty todos)
- Implement edit cancel to preserve original content
- Add inline edit UI with input field and action buttons
- Add E2E tests for edit flow

Satisfies AC-001-03, AC-001-04, AC-001-05

Co-Authored-By: Claude Haiku 4.5 <noreply@anthropic.com>"
```

---

## 9. Notes

- 수정 UI의 표현 방식(인라인/모달 등)은 본 Step에서 강제하지 않는다.
- 인라인 편집을 권장하지만, 모달 형태로도 구현 가능하다.
- 데이터 영속성(localStorage)은 향후 Step에서 다룬다.
