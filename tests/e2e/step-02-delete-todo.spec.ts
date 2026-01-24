import { test, expect } from '@playwright/test'

test.describe('Phase A – Bootstrap', () => {
  test('TODO 목록에 하나 이상의 항목이 존재한다', async ({ page }) => {
    await page.goto('/')
    
    const input = page.getByPlaceholder(/add.*todo|입력/i)
    const button = page.getByRole('button', { name: /add|추가/i })
    
    // TODO 추가
    await input.fill('Test todo')
    await button.click()
    
    // TODO 추가 확인
    await expect(page.getByText('Test todo')).toBeVisible()
  })
})

test.describe('Phase B – Core Flow: AC-001-07', () => {
  test('특정 TODO 항목을 삭제하면 목록에서 사라진다', async ({ page }) => {
    await page.goto('/')
    
    const input = page.getByPlaceholder(/add.*todo|입력/i)
    const button = page.getByRole('button', { name: /add|추가/i })
    
    // TODO 추가
    await input.fill('Item to delete')
    await button.click()
    await expect(page.getByText('Item to delete')).toBeVisible()
    
    // 삭제 버튼 클릭
    const deleteButton = page.locator('button').filter({ hasText: /delete|삭제/i }).first()
    await deleteButton.click()
    
    // TODO가 삭제되었는지 확인
    await expect(page.getByText('Item to delete')).not.toBeVisible()
  })

  test('여러 TODO 중에서 특정 항목만 삭제할 수 있다', async ({ page }) => {
    await page.goto('/')
    
    const input = page.getByPlaceholder(/add.*todo|입력/i)
    const button = page.getByRole('button', { name: /add|추가/i })
    
    // 3개의 TODO 추가
    await input.fill('Keep this 1')
    await button.click()
    await input.fill('Delete this')
    await button.click()
    await input.fill('Keep this 2')
    await button.click()
    
    // 모든 TODO가 추가되었는지 확인
    await expect(page.getByText('Keep this 1')).toBeVisible()
    await expect(page.getByText('Delete this')).toBeVisible()
    await expect(page.getByText('Keep this 2')).toBeVisible()
    
    // "Delete this" 항목의 삭제 버튼 찾기
    const deleteThisItem = page.locator('li').filter({ hasText: 'Delete this' })
    const deleteButton = deleteThisItem.locator('button').filter({ hasText: /delete|삭제/i })
    await deleteButton.click()
    
    // "Delete this"는 제거되었고 다른 항목들은 유지되어야 함
    await expect(page.getByText('Delete this')).not.toBeVisible()
    await expect(page.getByText('Keep this 1')).toBeVisible()
    await expect(page.getByText('Keep this 2')).toBeVisible()
  })
})

test.describe('Phase C – Edge / Regression', () => {
  test('삭제 후 남은 TODO 항목의 순서와 내용이 유지된다', async ({ page }) => {
    await page.goto('/')
    
    const input = page.getByPlaceholder(/add.*todo|입력/i)
    const button = page.getByRole('button', { name: /add|추가/i })
    
    // TODO 추가
    const todos = ['First', 'Second', 'Third', 'Fourth']
    for (const todo of todos) {
      await input.fill(todo)
      await button.click()
    }
    
    // 모든 항목 확인
    for (const todo of todos) {
      await expect(page.getByText(todo)).toBeVisible()
    }
    
    // 두 번째 항목 삭제
    const secondItem = page.locator('li').filter({ hasText: 'Second' })
    const deleteButton = secondItem.locator('button').filter({ hasText: /delete|삭제/i })
    await deleteButton.click()
    
    // Second는 없고, 나머지는 순서 유지
    await expect(page.getByText('Second')).not.toBeVisible()
    await expect(page.getByText('First')).toBeVisible()
    await expect(page.getByText('Third')).toBeVisible()
    await expect(page.getByText('Fourth')).toBeVisible()
    
    // DOM 순서 확인 (First - Third - Fourth)
    const items = page.locator('li')
    const firstText = await items.first().textContent()
    const thirdText = await items.nth(1).textContent()
    const fourthText = await items.nth(2).textContent()
    
    expect(firstText).toContain('First')
    expect(thirdText).toContain('Third')
    expect(fourthText).toContain('Fourth')
  })
})
