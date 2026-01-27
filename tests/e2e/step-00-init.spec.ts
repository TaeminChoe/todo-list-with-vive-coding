import { test, expect } from '@playwright/test'

test.describe('AC-000-01 & AC-000-02: 개발 서버 실행 및 기본 화면 렌더링', () => {
  test('개발 서버 실행 시 애플리케이션 오류 없이 로드', async ({ page }) => {
    await page.goto('/')
    
    // AC-000-01: 페이지 로드 성공 확인 (404나 500 에러 없음)
    const url = page.url()
    expect(url).toContain('localhost:5173')
    
    // AC-000-02: "My Todo List" 제목이 화면에 렌더링됨
    const heading = page.getByRole('heading', { name: 'My Todo List' })
    await expect(heading).toBeVisible()
  })
})

test.describe('AC-000-03: TailwindCSS 스타일 적용 확인', () => {
  test('TailwindCSS 클래스 적용 확인', async ({ page }) => {
    await page.goto('/')
    
    // 흰색 배경을 가진 요소 확인 (내부 카드)
    const card = page.locator('.bg-white').first()
    await expect(card).toBeVisible()
    
    // 파란색 배경이 있는 컨테이너 확인
    const blueContainer = page.locator('.bg-blue-600').first()
    await expect(blueContainer).toBeVisible()
  })
})

test.describe('AC-000-04: TODO 목록 화면 라우트 존재', () => {
  test('/ 경로에서 TODO 페이지 렌더링', async ({ page }) => {
    await page.goto('/')
    
    // "/" 라우트 접근
    const heading = page.getByRole('heading', { name: 'My Todo List' })
    await expect(heading).toBeVisible()
    
    // TODO 입력 UI가 표시됨 (Step-01 이후 추가됨)
    const input = page.getByPlaceholder(/add.*todo|입력/i)
    await expect(input).toBeVisible()
  })
})

test.describe('AC-000-05: Playwright 테스트 실행 가능 확인', () => {
  test('Playwright E2E 테스트 실행 가능', async ({ page }) => {
    await page.goto('/')
    
    // 기본 페이지 요소 접근 가능
    const heading = page.getByRole('heading', { name: 'My Todo List' })
    await expect(heading).toBeVisible()
    
    // 테스트 실행 성공
    const url = page.url()
    expect(url).toContain('localhost:5173')
  })
})
