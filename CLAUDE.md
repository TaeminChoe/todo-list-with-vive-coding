# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 프로젝트 개요

Vive Todo List는 React + TypeScript + Vite로 구축된 간단한 할 일 목록 애플리케이션입니다. 사용자는 할 일을 추가, 수정, 삭제하고 완료 상태를 토글할 수 있습니다.

## 주요 명령어

### 개발 및 빌드
- `npm run dev` - 개발 서버 실행 (http://localhost:5173)
- `npm run build` - TypeScript 컴파일 및 Vite 빌드
- `npm run preview` - 빌드된 결과물 미리보기
- `npm run test:e2e` - Playwright E2E 테스트 실행

## 코드 아키텍처

### 구조
```
src/
├── App.tsx                 # 라우팅 설정 (BrowserRouter, React Router v6)
├── main.tsx               # 진입점
├── pages/
│   └── TodoListPage.tsx   # 주요 UI 컴포넌트 (상태 관리, 이벤트 핸들러 포함)
├── types/
│   └── Todo.ts            # Todo 인터페이스 및 제약사항 정의
└── utils/
    └── todoHelpers.ts     # Todo 비즈니스 로직 (생성, 수정, 검증, 포맷팅)
```

### 아키텍처 패턴

**상태 관리**: `useState` 훅을 사용한 클라이언트 상태 관리
- `todos`: Todo 배열
- `input`: 신규 추가 입력값
- `editingId`: 현재 수정 중인 Todo ID
- `editInput`: 수정 중인 입력값

**비즈니스 로직 분리**: `todoHelpers.ts`에 순수 함수로 구현
- `createTodo(message)`: UUID, timestamp와 함께 새 Todo 생성
- `updateTodo(todo, updates)`: `modifiedAt` 자동 갱신하며 Todo 수정
- `validateMessage(message)`: 문자열 길이 검증 (1~255자)
- `formatCreatedDate(isoString)`: ISO 8601을 "yyyy-MM-dd HH:mm" 형식으로 변환

**Todo 도메인 모델** (`types/Todo.ts`)
- `id`: UUID (읽기 전용)
- `message`: 1~255자 범위
- `status`: "COMPLETE" | "NOT_COMPLETE" (기본값: "NOT_COMPLETE")
- `createdAt`, `modifiedAt`: ISO 8601 문자열

### UI 구현

`TodoListPage.tsx`는 모든 UI를 관리합니다:
- **입력 UI**: 텍스트 입력 + Add 버튼 (Enter 키로도 추가 가능)
- **Todo 목록 UI**:
  - 일반 모드: Complete/Edit/Delete 버튼 + 메시지 + 생성 시간
  - 수정 모드: 편집 입력 + Save/Cancel 버튼
  - 완료 상태: line-through 스타일 적용
- **스타일**: TailwindCSS 유틸리티 클래스 사용 (파란색 테마)

## 테스트

### E2E 테스트 구조
`tests/e2e/` 아래에 기능별 스펙 파일 구성:
- `step-00-init.spec.ts`: 개발 서버 및 기본 렌더링
- `step-01-create-todo.spec.ts`: Todo 추가
- `step-02-delete-todo.spec.ts`: Todo 삭제
- `step-03-toggle-complete.spec.ts`: 완료 상태 토글
- `step-04-edit-todo.spec.ts`: Todo 수정

### Playwright 설정
- Base URL: `http://localhost:5173` (dev 서버)
- Reporter: HTML 리포트 (`playwright-report/`)
- Workers: 1 (순차 실행)
- Retries: 0

**테스트 실행 시**: `npm run dev`로 개발 서버를 먼저 실행한 후 `npm run test:e2e`를 별도 터미널에서 실행하세요.

## 개발 시 주의사항

### Todo 도메인 규칙
- `id`와 `createdAt`은 읽기 전용 - 수정 불가
- `message` 길이 제약사항 준수 (1~255자)
- `status` 변경 시 `updateTodo` 헬퍼 사용 (자동으로 `modifiedAt` 갱신)
- 항상 `validateMessage`로 메시지 검증 후 Todo 생성/수정

### Commit Message Template
`.gitmessage` 파일에 정의된 템플릿을 따릅니다. Pre-commit 훅이 커밋 메시지 포맷을 검증합니다 (`check_commit_msg_type.py`).

## 라이브러리 의존성

- **React 18.2.0**: UI 라이브러리
- **React Router 6.18.0**: 라우팅 (현재는 기본 라우트 "/" 하나)
- **TailwindCSS 3.3.5**: 스타일링
- **TypeScript 5.2.2**: 타입 안정성
- **Vite 5.0.0**: 빌드 도구 및 개발 서버
- **Playwright 1.40.0**: E2E 테스팅
