## Step Execution – Project Initialization

---

## 1. Step Overview

- **Step ID**: step-00-init
- **Title**: 프로젝트 초기화 (React + TypeScript + TailwindCSS)
- **Goal**:
  이후 Step에서 도메인 기능을 구현할 수 있도록,
  애플리케이션 실행·라우팅·스타일·E2E 테스트가 가능한 최소 프로젝트 기반을 확보한다.

---

## 2. Scope

### In Scope

- React + TypeScript + TailwindCSS 기반 프로젝트 초기화
- 애플리케이션 진입이 가능한 기본 라우트 1개 구성
- 공통 레이아웃 또는 페이지 골격 구성
- Playwright 설치 및 실행 가능한 테스트 환경 구성
- 최소 1개의 E2E 스모크 테스트 작성 및 통과

### Out of Scope

- TODO 도메인 기능 구현 (추가/수정/삭제)
- 데이터 영속성 (스토리지, DB, API 연동)
- 디자인 시스템 구축 또는 UI 고도화
- 상태 관리, 폼 처리 등 애플리케이션 구조 고도화

---

## 3. References (Explicit Only)

이 Step에서 참조가 허용된 파일 목록이다.
여기에 명시되지 않은 파일은 존재하지 않는 것으로 간주한다.

- Decisions:
  - (없음)
- Issues:
  - (없음)

---

## 4. Acceptance Criteria (Step Final)

본 Step은 "기능 구현"이 아닌 "실행 기반 확보" 단계다.
아래 기준을 모두 만족할 경우 Step 완료로 간주한다.

### AC-000-01: 개발 서버 실행 및 기본 화면 렌더링

**Given**
- 프로젝트가 초기화되고 의존성이 설치된 상태

**When**
- 개발 서버를 실행한다

**Then**
- 기본 진입 경로에서 화면이 오류 없이 렌더링된다

---

### AC-000-02: 사용자 인지 가능한 화면 요소 렌더링

**Given**
- 개발 서버가 실행 중인 상태

**When**
- 기본 진입 라우트에 접근한다

**Then**
- "My Todo List"와 같은 사용자에게 인지 가능한 화면 요소가 렌더링된다

---

### AC-000-03: TailwindCSS 스타일 적용 확인

**Given**
- 애플리케이션이 로드된 상태

**When**
- 브라우저에서 화면을 확인한다

**Then**
- TailwindCSS 클래스가 적용된 시각적 변화(색상, 레이아웃 등)가 확인된다

---

### AC-000-04: TODO 페이지 라우트 존재

**Given**
- 애플리케이션이 실행 중인 상태

**When**
- "/" 경로에 접근한다

**Then**
- 이후 도메인 기능 구현을 위한 기본 페이지(예: TODO 목록 화면) 라우트가 존재하고 접근 가능하다

---

### AC-000-05: Playwright E2E 테스트 실행 환경

**Given**
- Playwright가 설치되고 설정된 상태

**When**
- E2E 테스트 명령을 실행한다

**Then**
- 프로젝트 초기 상태를 검증하는 최소 1개의 Playwright 테스트가 통과한다

---

## 5. Test Strategy (Playwright)

이 Step의 테스트는 "애플리케이션이 실행 가능한 상태인지"를 검증하는 데 목적이 있다.

### Phase A – Bootstrap

- 애플리케이션 진입 가능 여부 확인
- 기본 라우트 접근 시 화면 렌더링 확인
- 핵심 텍스트 또는 UI 요소 존재 여부 확인

### Phase B – Core Flow

- (해당 없음)
  본 Step은 사용자 도메인 플로우를 검증하지 않는다.

### Phase C – Edge / Regression

- Playwright 실행 안정성 검증
  - baseURL 설정
  - headless 모드 실행 가능 여부

---

## 6. Test Specification

- **Test Tool**: Playwright
- **Test Type**: E2E (Smoke)
- **Test Files**:
  - tests/e2e/step-00-init.spec.ts

테스트는 Acceptance Criteria와 명시적으로 매핑되어야 한다.

---

## 7. Deliverables

- React + TypeScript + TailwindCSS 프로젝트 초기 구조
- 기본 라우트 및 페이지/레이아웃 골격
- Playwright 설정 파일
- tests/e2e/step-00-init.spec.ts
- **Step 단위 커밋 1개**

---

## 8. Implementation Guide

**전제 조건**: 저장소를 클론한 직후 프로젝트 루트 상태

프로젝트 루트에서 아래 단계를 순서대로 수행한다.
**각 단계는 이전 단계가 성공적으로 완료되어야 다음 단계를 진행할 수 있다.**

---

### 단계 0: 프로젝트 구조 생성 (Vite 초기화)

저장소를 클론했을 때 다음 파일들이 이미 루트에 존재해야 한다:

- `package.json`
- `vite.config.ts`
- `tsconfig.json`
- `tailwind.config.js`
- `playwright.config.ts`
- `src/` 디렉토리
- `tests/e2e/` 디렉토리

**이 파일들이 없다면**, 아래 명령어로 Vite 프로젝트를 초기화한다:

```bash
# 현재 디렉토리에 Vite React TypeScript 프로젝트 생성
npm create vite@latest . -- --template react-ts
```

> ℹ️ **참고**: Step-01 이후 코드를 진행할 때는 이미 이 파일들이 존재한다.

---

### 단계 1: npm install (의존성 설치)

#### 1-1. npm install 실행

```bash
npm install
```

#### 1-2. npm install 진행 상황 모니터링

npm install은 2~5분 정도 소요된다. **다른 터미널**에서 다음 명령어로 진행 상황을 확인하면서 기다린다.

**실시간 진행 상황 확인 (30초 간격으로 실행)**:

```bash
# 방법 1: node_modules 크기 확인 (가장 직관적)
du -sh node_modules 2>/dev/null || echo "아직 생성 중..."

# 방법 2: 설치된 패키지 수 확인
ls -1 node_modules | wc -l

# 방법 3: npm 프로세스 확인 (실제로 돌아가고 있는지 확인)
ps aux | grep "npm install" | grep -v grep && echo "✓ npm install 실행 중" || echo "✗ npm install 완료됨"
```

**진행 흐름 예시**:

```
초기:   du -sh node_modules
        아직 생성 중...

30초:   du -sh node_modules
        52M     node_modules

1분:    du -sh node_modules
        165M    node_modules

2분:    du -sh node_modules
        412M    node_modules

완료:   du -sh node_modules
        540M    node_modules

        ps aux | grep "npm install" | grep -v grep
        (아무것도 출력되지 않음 = 완료됨)
```

#### 1-3. npm install 완료 확인

터미널 프롬프트가 반환되고, 다음 명령어가 정상 작동하면 완료:

```bash
# node_modules 존재 확인
ls -d node_modules

# 주요 패키지 설치 확인
npm list --depth=0
```

**정상 출력 예시**:

```
vive-todo-list@0.0.1
├── react@18.2.0
├── react-dom@18.2.0
├── react-router-dom@6.18.0
└── (dev dependencies...)
```

#### 1-4. npm install 실패 시 트러블슈팅

**증상**: 10분 이상 실행되거나 에러 발생

**해결 방법 1 - npm 캐시 초기화**:

```bash
npm cache clean --force
npm install --legacy-peer-deps
```

**해결 방법 2 - registry 변경**:

```bash
npm install --legacy-peer-deps --registry https://registry.npmjs.org/
```

**해결 방법 3 - yarn 사용 (npm 대체)**:

```bash
yarn install
```

> ℹ️ **팁**: 회사 네트워크에서 문제가 있다면 프록시 설정 확인 필요

---

### 단계 2: 프로젝트 파일 구조 검증

npm install 완료 후, 다음 파일들이 모두 존재하는지 확인:

```bash
# 간단히 확인하는 명령어
ls src/App.tsx src/main.tsx src/pages/TodoListPage.tsx \
   tests/e2e/step-00-init.spec.ts index.html \
   package.json vite.config.ts tailwind.config.js \
   playwright.config.ts 2>&1 | wc -l

# 9개 파일이 모두 출력되면 정상
```

**파일 목록**:

```
src/
  ├── App.tsx
  ├── main.tsx
  ├── index.css
  └── pages/
      └── TodoListPage.tsx
tests/
  └── e2e/
      └── step-00-init.spec.ts
index.html
package.json
tsconfig.json
vite.config.ts
tailwind.config.js
postcss.config.js
playwright.config.ts
node_modules/  (npm install으로 생성됨)
```

---

### 단계 3: 개발 서버 실행 및 AC 검증

#### 3-1. 개발 서버 시작

```bash
npm run dev
```

**예상 출력**:

```
  VITE v5.0.2  ready in 234 ms

  ➜  Local:   http://localhost:5173/
  ➜  press h to show help
```

#### 3-2. 브라우저에서 확인

브라우저를 열고 `http://localhost:5173` 접속

**확인 항목**:

- ✅ AC-000-01: 페이지가 오류 없이 로드됨 (개발자 도구에 에러 없음)
- ✅ AC-000-02: "My Todo List" 제목이 보임
- ✅ AC-000-03: 파란색 배경과 흰색 텍스트가 있음 (TailwindCSS 스타일 적용됨)
- ✅ AC-000-04: "/" 경로에서 TODO 페이지가 렌더링됨

#### 3-3. 개발 서버 유지

다음 단계를 위해 개발 서버는 **계속 실행 상태 유지**

---

### 단계 4: Playwright E2E 테스트 실행

#### 4-1. 새로운 터미널 열기

개발 서버는 실행 중인 상태에서, **새로운 터미널 창**을 열어 아래 명령어 실행:

```bash
npm run test:e2e
```

#### 4-2. 테스트 실행 확인

**예상 출력**:

```
Running 4 tests using 1 worker

✓ AC-000-01 & AC-000-02: 개발 서버 실행 및 기본 화면 렌더링
✓ AC-000-03: TailwindCSS 클래스 적용 확인
✓ AC-000-04: TODO 목록 화면 라우트 존재
✓ AC-000-05: Playwright 테스트 실행 가능 확인

4 passed (2.5s)
```

#### 4-3. 테스트 실패 시 처리

**증상**: 일부 테스트 실패

**확인 사항**:

1. 개발 서버가 `http://localhost:5173`에서 실행 중인지 확인
2. 브라우저 포트 5173이 다른 프로세스에 점유되지 않았는지 확인
3. node_modules가 완전히 설치되었는지 확인 (`npm list --depth=0`)

**해결 방법**:

```bash
# 개발 서버 프로세스 확인/종료
ps aux | grep "vite" | grep -v grep
killall node  # 기존 프로세스 강제 종료

# 다시 시도
npm run dev  # (터미널 1)
npm run test:e2e  # (터미널 2)
```

---

### 단계 5: Step 완료 확인 및 커밋

#### 5-1. 모든 AC 충족 확인

- ✅ AC-000-01: 개발 서버 오류 없음
- ✅ AC-000-02: 기본 화면 요소 렌더링
- ✅ AC-000-03: TailwindCSS 스타일 적용
- ✅ AC-000-04: "/" 라우트 존재
- ✅ AC-000-05: E2E 테스트 4개 통과

#### 5-2. Step 완료

모든 항목이 확인되면 Step-00-init 완료 ✓

---

## 9. Notes

- 본 Step은 도메인 기능 개발 이전의 기반 구축 단계다.
- npm install은 이 Step 내에서 반드시 완료되어야 다음 Step을 진행할 수 있다.
- 진행 상황 모니터링 명령어를 활용하여 "멈춘 것 같은" 상황을 방지한다.
- 이후 Step에서 기능 요구사항에 따라 폴더 구조 및 라우팅은 변경될 수 있다.
