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

Scenario 문서는 다음 목적을 가진다.

- 사용자 관점에서 서비스의 흐름을 설명한다.
- 기능 목록이 아닌 **행동의 연속**을 정의한다.
- Acceptance Criteria와 Step 문서의 **출발점** 역할을 한다.

Scenario 문서는:

- 요구사항 명세서가 아니다.
- 구현 방법을 설명하지 않는다.
- 테스트 코드나 기술 스택을 언급하지 않는다.

👉 **“사용자가 무엇을 어떻게 경험하는가”만을 다룬다.**

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
  - Acceptance Criteria를 도출하거나
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

## 6. Scenario와 Acceptance Criteria의 관계

- Scenario는 “무슨 일이 일어나는가”를 설명한다.
- Acceptance Criteria는 “성공했는지 어떻게 판단하는가”를 정의한다.
- 하나의 Scenario는 여러 Acceptance Criteria로 분해될 수 있다.

Scenario 문서 자체에는 AC를 작성하지 않는다.

---

## 7. Scenario 수정 규칙

- Scenario 문서는 사용자만 수정할 수 있다.
- AI는 Scenario 문서를 직접 수정하지 않는다.
- Scenario가 수정되면:
  - 기존 Acceptance Criteria와 Step은 재검토 대상이 된다.
  - 단, 자동으로 수정되지는 않는다.

---

## 8. Scenario 문서 템플릿 준수 규칙

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
