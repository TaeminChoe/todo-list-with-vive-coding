import { test, expect } from '@playwright/test';

test.describe('Step 01 - Create TODO', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('Phase A: TODO 목록 화면에 접근 가능하고 입력 UI가 표시됨', async ({ page }) => {
    // 페이지 로드 확인
    await expect(page).toHaveURL('/');

    // TODO 목록 화면 존재 확인
    const heading = page.getByRole('heading', { level: 1 });
    await expect(heading).toBeVisible();

    // 입력 필드 존재 확인
    const input = page.getByRole('textbox');
    await expect(input).toBeVisible();

    // 추가 버튼 존재 확인
    const addButton = page.getByRole('button', { name: /추가|add/i });
    await expect(addButton).toBeVisible();
  });

  test('AC-001-01: 유효한 입력으로 TODO 추가 시 목록에 표시됨', async ({ page }) => {
    // 입력 필드 찾기
    const input = page.getByRole('textbox');
    const addButton = page.getByRole('button', { name: /추가|add/i });

    // TODO 입력
    const todoText = 'Buy groceries';
    await input.fill(todoText);

    // 추가 버튼 클릭
    await addButton.click();

    // TODO가 목록에 표시되는지 확인
    await expect(page.getByText(todoText)).toBeVisible();

    // 입력 필드가 비워지는지 확인
    await expect(input).toHaveValue('');
  });

  test('AC-001-02: 빈 입력으로 TODO 추가 시 생성 안 됨', async ({ page }) => {
    const input = page.getByRole('textbox');
    const addButton = page.getByRole('button', { name: /추가|add/i });

    // 입력 필드를 비운 상태로 추가 클릭
    await input.fill('');
    await addButton.click();

    // 목록에 항목이 없는지 확인 (TodoListPage의 기본 텍스트 외에)
    const items = page.locator('[role="listitem"]');
    await expect(items).toHaveCount(0);
  });

  test('Phase C: 공백만 있는 입력으로 TODO 추가 시 생성 안 됨', async ({ page }) => {
    const input = page.getByRole('textbox');
    const addButton = page.getByRole('button', { name: /추가|add/i });

    // 공백만 입력
    await input.fill('   ');
    await addButton.click();

    // 목록에 항목이 없는지 확인
    const items = page.locator('[role="listitem"]');
    await expect(items).toHaveCount(0);
  });

  test('Phase C: 여러 TODO 추가 시 모두 목록에 표시됨', async ({ page }) => {
    const input = page.getByRole('textbox');
    const addButton = page.getByRole('button', { name: /추가|add/i });

    // 첫 번째 TODO 추가
    const todo1 = 'First task';
    await input.fill(todo1);
    await addButton.click();
    await expect(page.getByText(todo1)).toBeVisible();

    // 두 번째 TODO 추가
    const todo2 = 'Second task';
    await input.fill(todo2);
    await addButton.click();
    await expect(page.getByText(todo2)).toBeVisible();

    // 두 항목 모두 표시되는지 확인
    await expect(page.getByText(todo1)).toBeVisible();
    await expect(page.getByText(todo2)).toBeVisible();
  });
});
