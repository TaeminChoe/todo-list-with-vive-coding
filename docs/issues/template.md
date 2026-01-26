# Issue Template

> ⚠️ 이 파일은 **이슈 작성 템플릿**이다.  
> 실제 이슈를 기록할 때는 이 파일을 복사하여  
> `ISS-YYYY-MM-DD-HHMM-[context].md` 형식의 새 파일로 생성한다.
>
> 템플릿 사용 전, 반드시 `issue-rule.md`를 확인한다.

---

# Summary (Fixed / Always at Top)

## Issue ID
IID-0001

## Status
Open

## Resolved At
N/A

## Resolution Summary
N/A

---

## Timestamp
YYYY-MM-DD HH:MM (Asia/Seoul)

---

## Detected In
- 실행 단위 식별 정보  
  (예: Step-03 실행 중 / PR #12 생성 중 / 테스트 실행 중 등)

---

## Open Issues
> 현재 시점에서 `Resolved`되지 않은 Issue ID를 모두 나열한다.  
> (본 이슈 포함. `Resolved` 파일에서는 비워 두거나, 이 이슈를 제외한 목록만 유지한다.)

- IID-0001

---

## Context
- 이슈가 발생한 구체적인 상황
- 어떤 요청, 어떤 흐름, 어떤 조건에서 발생했는지 서술

---

## Related Documents
- 관련 문서 목록
  - 00-overview.md
  - 01-rules.md
  - docs/scenarios/scenarios-rule.md
  - Step 문서 / 시나리오 파일 등

---

## Issue Description
- 문제가 무엇인지 명확하고 단정적으로 서술
- 추측이나 해결책 제안은 포함하지 않음

---

## Impact
- 이 이슈로 인해:
  - 구현이 불가능한 기능
  - 제외되거나 비활성화된 동작
  - 정상적으로 동작하는 범위
를 구분하여 서술

---

## Workaround Status
다음 중 하나를 명시한다.

- Excluded   : 문제 기능을 이번 실행 범위에서 제외
- Disabled  : 기능은 존재하되 실행되지 않도록 처리
- Stubbed   : 최소한의 대체 UI/동작으로 유지
- None      : 우회 처리 없이도 작업 지속 가능

---

## Requires User Decision
- Yes / No

---

## Question to User
> `Requires User Decision`이 **Yes**인 경우에만 작성한다.

- 사용자에게 필요한 판단 사항을 질문 형태로 서술
- 질문은 최소화하며, 하나의 이슈당 1~2개를 넘기지 않는다

---

# Resolved Note (How to use this template for Resolved)

- `Status`를 `Resolved`로 변경한다.
- `Resolved At`에 해결이 확정된 이슈 파일명을 기록한다. (예: `ISS-2026-01-23-1422-step03.md`)
- `Resolution Summary`에 해결 근거를 2~5줄로 간결히 작성한다.
- **Resolved 파일은 Summary만 유지하는 것을 원칙**으로 하며, 그 외 섹션은 작성하지 않는다.
