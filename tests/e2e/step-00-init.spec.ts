import { test, expect } from '@playwright/test';

test.describe('Step 00 - Project Initialization', () => {
  test('AC-000-01 & AC-000-02: 개발 서버 실행 및 기본 화면 렌더링', async ({ page }) => {
    await page.goto('/');

    // 페이지가 로드되었는지 확인 (AC-000-01)
    await expect(page).toHaveTitle(/Vite \+ React \+ TS/);

    // 화면 요소가 렌더링되는지 확인 (AC-000-02)
    const heading = page.getByRole('heading', { level: 1 });
    await expect(heading).toBeVisible();
  });

  test('AC-000-03: TailwindCSS 클래스 적용 확인', async ({ page }) => {
    await page.goto('/');

    // TailwindCSS가 적용된 요소 확인
    const styledElement = page.locator('.text-4xl');
    await expect(styledElement).toBeVisible();

    // 배경색 클래스가 적용된 요소 확인
    const bgElement = page.locator('.bg-gradient-to-br');
    await expect(bgElement).toBeVisible();
  });

  test('AC-000-04: TODO 목록 화면 라우트 존재', async ({ page }) => {
    await page.goto('/');

    // "/" 경로가 정상적으로 접근 가능
    await expect(page).toHaveURL('/');

    // TODO 페이지임을 확인
    const pageContent = page.getByText(/todo/i);
    await expect(pageContent).toBeVisible();
  });

  test('AC-000-05: Playwright 테스트 실행 가능 확인', async ({ page }) => {
    await page.goto('/');

    // 페이지가 정상적으로 로드되었음을 확인
    const title = page.getByText('My Todo List');
    await expect(title).toBeVisible();

    // 기본 요소들이 모두 렌더링됨을 확인
    const description = page.getByText(/Welcome to your todo management app/);
    await expect(description).toBeVisible();
  });
});
