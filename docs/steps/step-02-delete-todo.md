## Step Execution – Delete TODO

---

## 1. Step Overview

- **Step ID**: step-02-delete-todo
- **Title**: TODO 항목 삭제
- **Goal**:  
  사용자가 기존 TODO 항목을 목록에서 제거할 수 있다.

---

## 2. Scope

### In Scope

- TODO 항목별 삭제 UI 제공
- 특정 TODO 항목 삭제 처리
- 삭제 결과가 목록에 즉시 반영됨

### Out of Scope

- 삭제 확인 모달
- 다중 선택 삭제
- 완료 상태와의 연계 처리

---

## 3. References (Explicit Only)

여기에 명시되지 않은 파일은 존재하지 않는 것으로 간주한다.

- Scenarios:
  - docs/scenarios/scenario-02-delete-todo.md (SCN-002)
- Acceptance Criteria:
  - docs/acceptance-criteria/ac-01-todo.md (AC-001-07)
- Decisions:
  - (없음)
- Issues:
  - (없음)

---

## 4. Acceptance Criteria (Step Final)

- **AC-001-07**: 사용자가 기존 Todo에 대해 삭제 동작을 수행하면, 해당 Todo는 목록에서 제거된다.

---

## 5. Test Strategy (Playwright)

### Phase A – Bootstrap

- TODO 목록에 하나 이상의 항목이 존재한다.

### Phase B – Core Flow

- 특정 TODO 항목을 삭제하면 목록에서 사라진다.

### Phase C – Edge / Regression

- 삭제 후 남은 TODO 항목의 순서와 내용이 유지된다.

---

## 6. Test Specification

- **Test Tool**: Playwright
- **Test Type**: E2E
- **Test Files**:
  - tests/e2e/step-02-delete-todo.spec.ts

---

## 7. Deliverables

- TODO 삭제 UI 및 로직
- tests/e2e/step-02-delete-todo.spec.ts
- **Step 단위 커밋 1개**

---

## 8. Implementation Guide

### 전제 조건

- Step-01 (TODO 생성) 완료
- 개발 서버 실행 가능 상태

### 구현 단계

#### 단계 1: AC 기반 테스트 작성

```bash
# tests/e2e/step-02-delete-todo.spec.ts 생성
```

**테스트 케이스**:
- Phase A: 목록에 TODO 항목이 존재
- Phase B: 특정 TODO 삭제 시 제거됨 (AC-001-07)
- Phase C: 삭제 후 나머지 항목 순서 유지

#### 단계 2: 테스트 실행 및 실패 확인

```bash
# 터미널 1
npm run dev

# 터미널 2
npm run test:e2e
```

**예상**: step-02 테스트 실패 (삭제 UI 미구현)

#### 단계 3: 기능 구현

**수정 파일**:
- `src/pages/TodoListPage.tsx`
  - TODO 목록 렌더링 시 각 항목별 삭제 버튼 추가
  - 삭제 버튼의 onClick 핸들러 구현
  - 해당 항목을 목록에서 제거하는 로직

**구현 사항**:
```typescript
// 예시
const handleDelete = (index: number) => {
  setTodos(todos.filter((_, i) => i !== index))
}

// UI에서
{todos.map((todo, index) => (
  <div key={index}>
    <span>{todo}</span>
    <button onClick={() => handleDelete(index)}>삭제</button>
  </div>
))}
```

#### 단계 4: 테스트 통과 확인

```bash
npm run test:e2e
```

**기준**: AC-001-07 관련 테스트 통과

#### 단계 5: 회귀 테스트

```bash
npm run test:e2e  # 모든 테스트 (Step-00, 01, 02)
```

**확인**: 이전 Step 기능 모두 정상 작동

#### 단계 6: 완료 체크리스트

- ✅ AC-001-07: TODO 삭제 기능 작동
- ✅ E2E 테스트 3개 이상 통과
- ✅ Step-00, 01 테스트 여전히 통과
- ✅ TypeScript 에러 없음

#### 단계 7: 커밋 생성

```bash
git add src/pages/TodoListPage.tsx tests/e2e/step-02-delete-todo.spec.ts
git commit -m "feat(step-02): implement TODO deletion functionality

- Add delete button for each TODO item
- Implement TODO removal logic
- Add E2E tests for deletion flow

Satisfies AC-001-07

Co-Authored-By: Claude Haiku 4.5 <noreply@anthropic.com>"
```

---

## 9. Notes

- 삭제 동작은 즉시 반영되며 되돌리기 기능은 제공하지 않는다.
- 삭제 확인 모달은 향후 Step에서 고려할 수 있다.
