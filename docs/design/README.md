# Design Resources - Figma 추출 결과

이 디렉토리는 Figma 디자인 파일에서 추출한 로컬 디자인 자료를 포함합니다.

## 추출 일시
2026-01-27

## Figma 파일 정보
- **File Key**: `l7SUhmVh7eVMiwItBzmBjH`
- **File Name**: ToDo List 👅 - Community
- **URL**: https://www.figma.com/design/l7SUhmVh7eVMiwItBzmBjH/

---

## 📁 디렉토리 구조

```
/docs/design/
├── README.md                        # 이 파일
├── design-load.md                   # 추출 절차 가이드
├── context/
│   ├── file.context.json           # 전체 디자인 구조 (323KB)
│   ├── frames-metadata.json        # Frame 메타데이터
│   └── assets-metadata.json        # Assets 메타데이터
├── screens/
│   ├── Todo.png                    # 메인 Todo 화면 (131KB)
│   ├── Todo - Empty.png            # 빈 상태 화면 (66KB)
│   ├── Colors.png                  # 색상 팔레트 (68KB)
│   ├── Components.png              # 컴포넌트 (130KB)
│   ├── Fonts.png                   # 폰트 (55KB)
│   └── Capa.png                    # 커버 (1.8MB)
└── assets/
    ├── Checkbox-unchecked.svg      # 체크박스 (미선택)
    ├── Checkbox-unchecked-hover.svg
    ├── Checkbox-checked.svg        # 체크박스 (선택)
    ├── Checkbox-checked-hover.svg
    ├── Button-delete.svg           # 삭제 버튼
    ├── Button-delete-hover.svg
    ├── Button-done-false.svg       # Done 버튼 (미완료)
    ├── Button-done-true.svg        # Done 버튼 (완료)
    ├── Button-active-false.svg     # Active 버튼
    └── Button-active-true.svg
```

---

## 📋 추출된 자료 목록

### 1. 전체 디자인 구조 (JSON)
- **파일**: `context/file.context.json`
- **크기**: 323KB
- **내용**:
  - 모든 페이지, 프레임, 컴포넌트, 레이어 정보
  - Layout 정보 (AutoLayout, spacing, padding)
  - 텍스트 스타일, 색상, 효과
  - 위치, 크기, 제약 조건

### 2. 화면 스크린샷 (PNG, @2x)
총 6개 화면:

| 화면 | 파일명 | 크기 | 설명 |
|------|--------|------|------|
| Todo | `Todo.png` | 131KB | 메인 Todo 리스트 화면 |
| Todo - Empty | `Todo - Empty.png` | 66KB | 할 일이 없는 빈 상태 |
| Colors | `Colors.png` | 68KB | 색상 팔레트 정의 |
| Components | `Components.png` | 130KB | UI 컴포넌트 모음 |
| Fonts | `Fonts.png` | 55KB | 폰트 스타일 정의 |
| Capa | `Capa.png` | 1.8MB | 프로젝트 커버 |

### 3. UI 컴포넌트 Assets (SVG)
총 10개 컴포넌트:

**체크박스** (4개)
- `Checkbox-unchecked.svg` - 미선택 상태
- `Checkbox-unchecked-hover.svg` - 미선택 호버
- `Checkbox-checked.svg` - 선택 상태
- `Checkbox-checked-hover.svg` - 선택 호버

**버튼** (6개)
- `Button-delete.svg` - 삭제 버튼
- `Button-delete-hover.svg` - 삭제 버튼 호버
- `Button-done-false.svg` - Done 버튼 (미완료)
- `Button-done-true.svg` - Done 버튼 (완료)
- `Button-active-false.svg` - Active 버튼
- `Button-active-true.svg` - Active 버튼 활성

---

## 🎨 주요 디자인 정보

### 색상 (Colors.png 참조)
디자인 시스템의 색상 팔레트는 `screens/Colors.png`에서 확인할 수 있습니다.

### 컴포넌트 (Components.png 참조)
재사용 가능한 UI 컴포넌트는 `screens/Components.png`에서 확인할 수 있습니다.

### 타이포그래피 (Fonts.png 참조)
- 기본 폰트: **Inter**
- 폰트 스타일 및 크기는 `screens/Fonts.png`에서 확인할 수 있습니다.

---

## 🔍 사용 방법

### 개발 시
1. **화면 참조**: `screens/` 디렉토리의 PNG 파일을 참조하여 UI 구현
2. **컴포넌트 사용**: `assets/` 디렉토리의 SVG를 프로젝트에 임포트
3. **상세 정보**: 필요시 `context/file.context.json`에서 정확한 레이아웃 정보 확인

### 디자인 정보 재추출
```bash
# design-load.md 가이드를 따라 재실행
node scripts/extract-frames.cjs
node scripts/download-screenshots.cjs
node scripts/download-components.cjs
```

---

## ⚠️ 주의사항

- **로컬 자료 우선**: 개발 시 Figma 링크가 아닌 이 디렉토리의 자료를 기준으로 구현합니다.
- **Source of Truth**: `file.context.json`과 스크린샷이 디자인의 공식 소스입니다.
- **API 토큰**: 재추출 시 `FIGMA_API_TOKEN` 환경변수 또는 임시 토큰이 필요합니다.

---

## 📌 다음 단계

1. `screens/Todo.png`와 `screens/Todo - Empty.png`를 참조하여 UI 구현
2. `assets/` 디렉토리의 SVG 컴포넌트를 프로젝트에 통합
3. `context/file.context.json`에서 정확한 색상, 간격, 크기 값 확인
