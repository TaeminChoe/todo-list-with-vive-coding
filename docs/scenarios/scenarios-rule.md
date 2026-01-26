# scenarios-rule.md

## Scenario Documentation Rules

---

## 1. 이 문서의 목적

이 문서는 `/docs/scenarios/` 디렉토리에 위치하는 **Scenario 문서**에 대한
작성 규칙과 활용 방식을 정의한다.

- Scenario는 **서비스의 사용자 흐름(User Flow)** 을 정의한다.
- Scenario는 사용자가 서비스를 어떻게 인지하고 사용하는지를 서술한다.
- Scenario는 AI가 기능을 구현할 때 **행위의 맥락(Context)** 을 이해하기 위한 참조 문서다.

본 문서는 상위 규칙 문서(overview, rules, steps-rule 등)를 위반하지 않으며,
Scenario 레벨에서 필요한 **서술 규칙과 참조 규칙**을 보완한다.

---

## 2. Scenario 문서의 역할

Scenario 문서는 **사용자가 수행할 수 있는 행동(시나리오)** 과, 그에 대한 **시스템의 관찰 가능한 반응(행동 결과)** 을 정의한다.

Scenario 문서는 다음 목적을 가진다.

- 사용자 관점에서 서비스의 흐름을 설명한다.
- 기능 목록이 아닌 **행동의 연속**을 정의한다.
- **"무엇을 구현할지"의 범위를 결정하는 문서**다.
- Step 문서의 **출발점** 역할을 한다.
- 테스트(특히 E2E)는 본 문서의 시나리오를 기준으로 작성된다.

Scenario 문서는:

- 요구사항 명세서가 아니다.
- 구현 방법을 설명하지 않는다.
- 테스트 코드나 기술 스택을 언급하지 않는다.

👉 **"사용자가 무엇을 어떻게 경험하는가"만을 다룬다.**

---

## 2.1 Scenario 적용 원칙

### 2.1.1 시나리오 우선 원칙

- 사용자는 시나리오에 정의된 행동만 수행할 수 있다.
- 시나리오에 없는 행동은 **허용되지 않은 행동**으로 간주한다.
- **기능은 시나리오로만 존재한다.** (시나리오에 없으면 기능도 없다.)

### 2.1.2 관찰 가능성 원칙

시나리오는 반드시 다음 중 하나 이상으로 **관찰 가능**해야 한다.

- 화면(UI) 변화 (텍스트, 버튼, 리스트, 상태 표시 등)
- 네트워크 요청/응답 (요청 발생, 상태 코드, 응답에 따른 UI 변화)
- 저장/복원 (예: localStorage, DB 등) 및 그에 따른 UI 반영
- 접근성 트리(ARIA) 기반의 상호작용 가능 여부

### 2.1.3 단정형 서술 원칙

- 시나리오는 단정형으로 작성한다.
- 애매한 표현("대충", "적당히", "가능하면")은 사용하지 않는다.

### 2.1.4 예외도 시나리오다

- 실패, 에러, 빈 상태, 권한 없음, 유효성 오류 등은 모두 시나리오로 정의한다.
- 예외 처리가 문서에 없으면, 구현도 존재하지 않는 것으로 간주한다.

---

## 2.2 Scenario 표준 포맷 (필수)

본 문서의 모든 시나리오는 아래 템플릿을 따른다.

```md
### SCN-XXX: 시나리오 제목 (동사로 시작)

**Actors**
- 사용자 유형/역할 (예: anonymous, member, admin 등) 또는 시스템

**Preconditions**
- 사전 조건 (로그인 상태, 데이터 존재 여부, 네트워크 상태 등)

**Trigger**
- 사용자가 수행하는 단일 행동 (클릭/입력/제출/이동 등)

**Main Flow**
1. ...
2. ...
3. ...

**Alternative Flows**
- A1. ...
- A2. ...

**Postconditions**
- 최종 상태 (데이터/화면/저장소/네트워크 관점에서 명시)

**Acceptance Notes**
- 이 시나리오가 충족되었다고 판단할 관찰 포인트
```

---

## 2.3 Scenario ID 규칙

- 시나리오 ID는 `SCN-001` 형태로 작성한다.
- 번호는 문서 내에서 **유일**해야 한다.
- Step 문서에서 시나리오를 참조할 때는 반드시 ID를 사용한다.

---

## 2.4 Scenario 분류 규칙

시나리오는 아래 카테고리로 분류한다.

1) **Core Scenarios**
   - 제품의 핵심 가치/주요 사용자 여정

2) **Validation Scenarios**
   - 입력 값 검증, 폼 오류, 제한 조건

3) **Error & Recovery Scenarios**
   - 네트워크 실패, 서버 오류, 재시도/복구

4) **Empty & Loading Scenarios**
   - 빈 데이터, 초기 상태, 로딩 상태

5) **Access & Permission Scenarios**
   - 권한, 인증, 역할별 접근 제한

6) **Performance & Large Data Scenarios**
   - 목록이 크거나 처리량이 많은 경우의 관찰 가능한 동작

7) **Accessibility Scenarios**
   - 키보드, 스크린 리더 관점에서의 상호작용

---

## 2.5 Scenario 작성 가이드

### 2.5.1 "행동"은 단일 트리거로 쪼갠다

- 한 시나리오에는 하나의 Trigger만 둔다.
- "A하고 B한다"를 하나로 묶지 않는다.

### 2.5.2 UI 디테일은 최소화하고, 관찰 포인트는 명확히 한다

- "버튼이 예뻐야 한다" 같은 표현은 금지한다.
- "버튼을 클릭할 수 있어야 한다", "성공 메시지가 보여야 한다"처럼 관찰 가능한 표현을 사용한다.

### 2.5.3 데이터/상태 용어는 `01-rules.md`의 정의를 따른다

- 용어가 정의되지 않았다면, 시나리오에 등장시키지 않는다.
- 필요한 경우 먼저 규칙 문서에 용어/데이터를 추가한다. (문서 수정은 사용자만)

---

## 3. 디렉토리 구조 규칙

```
/docs/scenarios
 ├─ scenarios-rule.md      ← Scenario 규칙 (본 문서)
 ├─ template.md            ← Scenario 문서 템플릿
 ├─ scenario-01-*.md
 ├─ scenario-02-*.md
 └─ flow-chart/
     ├─ scenario-01.mmd
     ├─ scenario-02.mmd
     └─ ...
```

- Scenario 문서는 `/docs/scenarios/` 하위에만 위치한다.
- Flow 다이어그램은 `/docs/scenarios/flow-chart/`에 `.mmd` 파일로 저장한다.
- Flow 차트 파일은 **Scenario 문서와 1:1로 대응**한다.

---

## 4. Scenario 문서 독립성 및 참조 규칙

### 4.1 Scenario 간 독립성

- 각 Scenario 문서는 서로 독립적이다.
- 다른 Scenario의 내용을 전제로 서술하지 않는다.
- 공통 흐름이 있더라도 각 Scenario 내에서 다시 서술한다.

---

### 4.2 AI 참조 규칙 (중요)

- AI는 Scenario 문서를 **참조만 할 수 있다.**
- AI는 Scenario 문서를 수정하지 않는다.
- AI는 Scenario 문서를 기반으로:
  - Step 문서를 해석하거나
  - Flow Chart(.mmd)를 생성할 수 있다.

Scenario 문서는 **판단 기준이 아니라 맥락 제공용 문서**다.

---

## 5. Flow Chart(Mermaid) 생성 규칙

- Flow Chart는 Mermaid 문법으로 작성한다.
- Flow Chart는 **사용자 관점의 흐름**만 표현한다.
- 기술적 처리, API 호출, 상태 관리 등은 표현하지 않는다.

Flow Chart 생성 규칙:

- 시작과 종료가 명확해야 한다.
- 조건 분기는 사용자의 선택 또는 입력 기준으로만 표현한다.
- 내부 로직은 블랙박스로 취급한다.

---

## 6. Scenario 수정 규칙

- Scenario 문서는 사용자만 수정할 수 있다.
- AI는 Scenario 문서를 직접 수정하지 않는다.
- Scenario가 수정되면:
  - 기존 Step은 재검토 대상이 된다.
  - 단, 자동으로 수정되지는 않는다.

### 7.1 Scenario와 Flow Chart 동기화

- Scenario 문서가 수정될 때, 대응하는 Flow Chart(`.mmd` 파일)도 **함께 수정**되어야 한다.
- 새로운 Scenario가 생성되면, 대응하는 Flow Chart를 **반드시 생성**한다.
- Scenario의 흐름 변화가 Flow Chart에 반영되지 않으면, 문서 간 불일치로 간주한다.
- Flow Chart 수정은 **Scenario 수정과 동시에 1개의 커밋으로 기록**하거나, 별도 커밋으로 사전 처리된다.

---

## 7. Scenario 문서 템플릿 준수 규칙

- `/docs/scenarios/` 하위에 작성되는 모든 Scenario 문서는
  `template.md`에 정의된 형식과 구조를 반드시 따른다.
- 템플릿을 따르지 않은 Scenario 문서는
  유효한 사용자 흐름 문서로 간주하지 않는다.
- 템플릿과 Scenario 문서 간 충돌이 발생하는 경우,
  다음 우선순위를 따른다.

우선순위:

1. 상위 글로벌 규칙 문서 (overview, rules)
2. scenarios-rule.md
3. template.md
4. 개별 Scenario 문서

---

## 8. 이 문서의 위상

이 문서는 `/docs/scenarios/` 하위에서
Scenario 문서에 대한 **최상위 규칙 문서**다.

본 문서의 규칙을 따르지 않는 Scenario 문서는
유효한 참조 문서로 간주되지 않는다.
