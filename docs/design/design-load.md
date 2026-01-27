# Design Load Guide (Figma File → Local Artifacts)

이 문서는 **Figma 디자인 파일 전체 링크 하나를 입력받아, 해당 파일에 포함된 모든 디자인 정보를 로컬 자료로 추출**하기 위한 절차를 정의한다.

본 가이드는 **환경변수 기반 인증을 기본으로 사용하며**, 환경변수가 없을 경우 **사용자 입력을 통해 토큰을 보완**한다.

---

## 목적

- 개발 문서에서 **Figma 디자인 파일 전체를 참조**할 수 있도록 한다.
- AI가 디자인을 **추론이 아닌 근거 기반**으로 구현하게 한다.
- Figma 링크 의존을 제거하고, **로컬 디자인 자료를 Source of Truth**로 사용한다.

---

## 1. 추출 대상 (필요한 자료)

AI는 아래 자료들을 **Figma 파일 단위로 모두 추출**해야 한다.

### 1. 전체 디자인 구조 (JSON) — 필수

- 포함 범위:
  - 모든 페이지(Page)
  - 모든 Frame / Component / Layer
  - Layer name, type, size, position
  - AutoLayout, spacing, padding
  - Text style, color, effects
- 저장 위치:
  ```
  /docs/design/context/file.context.json
  ```

### 2. 주요 화면 스크린샷 (PNG) — 필수

- 대상:
  - 각 Page의 최상위 Frame
  - 이름이 Screen / Page / View 로 추정되는 Frame
- 저장 위치:
  ```
  /docs/design/screens/
  ```

### 3. Assets (선택)

- 아이콘, 로고, 이미지
- 저장 위치:
  ```
  /docs/design/assets/
  ```

---

## 2. Figma 파일 링크 입력

### Question 1

> 참조할 **Figma 디자인 파일 링크**를 입력해주세요.

```text
Figma File URL: https://www.figma.com/design/l7SUhmVh7eVMiwItBzmBjH/ToDo-List-%F0%9F%91%85--Community-?m=auto&t=p3Ccsc1oKQBHXSwO-6
```

예시:

```
https://www.figma.com/design/FILE_KEY/Project-Name
```

---

## 3. Figma API 인증 규칙 (중요)

### 기본 규칙

- AI는 **환경변수 `FIGMA_API_TOKEN`을 우선적으로 사용**해야 한다.
- 이 환경변수는 로컬 또는 CI 환경에 설정되어 있어야 한다.

### Fallback 규칙

- `FIGMA_API_TOKEN` 환경변수가 **존재하지 않을 경우**,  
  AI는 **아래 질문을 통해 사용자에게 직접 입력을 요청**해야 한다.

### Question 2 (Fallback)

> `FIGMA_API_TOKEN` 환경변수가 설정되어 있지 않습니다.  
> 임시로 사용할 Figma API Access Token을 입력해주세요.

```text
FIGMA_API_TOKEN (input):
```

Rules:

- 입력된 토큰은 **현재 실행 세션에서만 사용**한다.
- 토큰 값은 로그, 문서, 결과물에 절대 출력하지 않는다.
- 실행 종료 후 토큰은 폐기한다.

---

## 4. 디자인 자료 추출 절차 (AI 수행)

### Step 1. 환경변수 확인

1. `FIGMA_API_TOKEN` 환경변수 존재 여부 확인
2. 존재 → 해당 값을 사용
3. 없음 → Question 2 수행 후 입력값 사용

---

### Step 2. Figma 파일 정보 파싱

- Figma File URL에서 `fileKey`를 추출한다.
- node-id가 없는 경우 **파일 전체를 추출 대상으로 설정**한다.

---

### Step 3. 전체 디자인 구조 추출 (JSON)

- API:

  ```
  GET /v1/files/{fileKey}
  ```

- 저장:
  ```
  /docs/design/context/file.context.json
  ```

---

### Step 4. 화면 후보(Frame) 자동 식별

- 전체 JSON을 분석하여 화면(Screen) 후보 Frame을 식별한다.

---

### Step 5. 화면 스크린샷 생성 (PNG)

- API:

  ```
  GET /v1/images/{fileKey}?ids={nodeId}&format=png&scale=2
  ```

- 저장:
  ```
  /docs/design/screens/{frame-name}.png
  ```

---

### Step 6. Assets 추출 규칙 (SVG)

- 전체 디자인 구조(JSON)에서 다음 조건을 만족하는 노드를 아이콘 후보로 간주한다:
  - type === "VECTOR"
  - name에 "icon" 또는 "ic-" 포함
- 각 아이콘 후보 노드는 SVG 형식으로 export한다.
- SVG 파일은 /docs/design/assets/ 에 저장한다.

---

## 5. 저장 규칙

```text
/ docs / design /
 ├─ design-load.md
 ├─ context/
 │   └─ file.context.json
 ├─ screens/
 │   └─ *.png
 └─ assets/
     └─ ...
```

---

## 6. 실패 처리 규칙

- Figma 파일 링크가 유효하지 않은 경우
- API 인증 실패 (환경변수 + 사용자 입력 모두 실패)
- 파일 구조를 가져올 수 없는 경우

---

## 7. 개발 단계 사용 규칙

- 개발 단계에서는 **Figma 링크를 다시 참조하지 않는다.**
- `/docs/design/`에 저장된 자료만을 기준으로 구현한다.

---

## 요약

- 인증: **환경변수 우선, 사용자 입력 fallback**
- 입력: **Figma 파일 링크 1개**
- 추출: **파일 전체 디자인 정보**
- 개발: **로컬 디자인 자료 기준**
