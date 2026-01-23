로드맵 (큰 흐름)
Phase 0. 프로젝트 운영 기반 만들기

Git repo 생성

/docs 뼈대 구축 (문서가 “정답/기준”이 되도록)

개발 원칙/용어/완료 기준 확정

Phase 1. 개발 환경/품질 게이트 구축

Next.js 프로젝트 생성 (repo 루트)

lint / format / typecheck

Playwright E2E 기반 구축

CI에서 테스트 돌아가게 연결(원하면)

Phase 2. Core TODO 기능 (문서 → 테스트 → 구현 → 리팩토링)

TODO 생성

TODO 삭제

TODO 수정

완료/미완료 토글

Phase 3. 사용성 확장

필터/정렬/검색

빈 상태/에러 상태/로딩 상태 UX

접근성(키보드 조작/라벨/role) 정리

Phase 4. 저장/동기화 전략

(선택) localStorage

(선택) 서버/DB 연동

(선택) 멀티 디바이스/동기화

Phase 5. 릴리즈/데모

배포(선택)

최종 문서 정리(기능 스펙과 AC가 “현재 코드와 일치”하도록)

운영 규칙 (길 잃는 걸 막는 핵심)

1. 문서가 기준이고, 코드는 따라간다

기능 정의/규칙/시나리오/AC(완료기준)는 /docs가 “소스 오브 트루스”

코드가 문서와 다르면 코드를 고친다 (문서 수정은 사용자만)

2. Claude는 문서를 “수정하지 않는다”

Claude는 문서의 모순/누락/애매함을 발견하면

/docs/issues.md에 “수정 제안”만 적는다(또는 네게 목록으로 전달)

네가 문서를 직접 수정한 후에 다음 단계 진행

3. Step 단위로만 전진한다 (작은 승리 반복)

각 Step은 반드시 아래 순서:

해당 Step 문서 읽기(필요한 것만)

AC 기반 테스트 먼저 작성

기능 구현

테스트 통과

리팩토링

Doc-check(문서와 코드 불일치/논리 오류 보고)

4. “완료 기준” 없이는 다음 기능으로 넘어가지 않는다

통과 조건 예시:

E2E 테스트 통과

타입 체크 통과

lint/format 통과

접근성 최소 기준 충족(라벨/role/키보드)

5. 의사결정은 기록한다 (나중에 길 잃는 원인 제거)

기술 선택/트레이드오프(예: 상태관리, 저장방식)는

/docs/decisions/\*.md에 짧게 남긴다

"왜 이렇게 했는지"가 남아야 리팩토링 때 흔들리지 않음

Repo 루트 구조 제안 (Claude가 루트를 프로젝트로 인식)

Claude가 “루트에서 Next 프로젝트를 생성”한다고 했으니, 최종 구조는 이런 모양이 자연스럽다:

/ (repo root)
/docs
/src ...
package.json
playwright.config.ts
...

즉, Next 앱이 루트, 문서는 /docs에.

/docs 폴더 설계 (길 안내 지도) 0) 길을 잃지 않게 하는 상위 문서

/docs/00-overview.md

목표, 범위(무엇을 하고/안 하는지), 기술스택, 작업 방식

/docs/01-rules.md

TODO 규칙/용어/데이터 모델(필드, 제약)

/docs/02-scenarios.md

사용자 시나리오 + 예외 케이스

/docs/03-acceptance-criteria.md

기능별 완료 기준(AC)

/docs/04-roadmap.md

단계(Phase/Step) 목록 + 각 Step 산출물

1. Step 문서

/docs/steps/step-01-init.md

/docs/steps/step-02-testing.md

/docs/steps/step-03-create.md

/docs/steps/step-04-delete.md

/docs/steps/step-05-edit.md

/docs/steps/step-06-toggle.md

/docs/steps/step-07-filter-sort.md

/docs/steps/step-08-persist.md

/docs/steps/step-09-polish.md

각 step 문서에 반드시 들어갈 항목(고정 템플릿):

목적 / 범위

사전 조건(필요한 문서/기능)

사용자 시나리오 링크

AC 리스트

테스트 케이스(Playwright 관점)

구현 가이드(제약/금지사항 포함)

완료 체크리스트(DoD)

2. 변경 제안/결정 기록

/docs/issues.md

문서 모순/누락/애매함 발견 시 기록

/docs/decisions/

ADR 형태로 가볍게(예: 0001-state-management.md)

3. Mermaid로 전체 흐름 유지

/docs/diagrams/flow.mmd

전체 Step 흐름

/docs/diagrams/domain.mmd

TODO 상태/전이(예: active/completed)

Claude에게 주는 “작업 규칙 프롬프트” (항상 같은 방식으로 일하게)

Claude에게는 매 Step 시작할 때 아래 규칙을 고정으로 주면 좋아:

“루트가 프로젝트 루트다. 코드는 루트에 생성한다.”

“문서는 /docs만 읽고, 수정하지 말 것.”

“Step 문서에 없는 요구사항은 구현하지 말 것(추가 기능 금지).”

“AC 기반으로 테스트 먼저 작성 후 구현.”

“문서 모순/누락은 /docs/issues.md에 제안만.”

(너는 이걸 /docs/00-overview.md에 그대로 박아두면 됨)

지금 단계에서 바로 해야 할 것 (가장 작은 시작)

빈 repo 만들고 /docs 폴더 생성

/docs/00-overview.md에 “운영 규칙 5개”를 먼저 적기

/docs/04-roadmap.md에 Step 목록만 먼저 적기

그 다음에 Step-01 문서부터 디테일을 채우기

원하면, 다음 메시지에서 내가 **/docs/00-overview.md, 01-rules.md, 03-acceptance-criteria.md, 04-roadmap.md, 그리고 step 문서 템플릿`**을 “바로 붙여넣어 시작 가능한 형태”로 한 번에 써줄게. (네가 이걸 repo에 그대로 커밋하면 Claude가 그걸 기준으로 작업하기 딱 좋아.)
