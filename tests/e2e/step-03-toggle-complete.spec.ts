import { test, expect } from '@playwright/test'

test.describe('Phase A – Bootstrap', () => {
  test('TODO 항목이 목록에 표시된다', async ({ page }) => {
    await page.goto('/')
    
    const input = page.getByPlaceholder(/add.*todo|입력/i)
    const button = page.getByRole('button', { name: /add|추가/i })
    
    // TODO 추가
    await input.fill('Task to complete')
    await button.click()
    
    // TODO 항목 표시 확인
    await expect(page.getByText('Task to complete')).toBeVisible()
  })
})

test.describe('Phase B – Core Flow: AC-001-06', () => {
  test('완료 토글 동작으로 상태가 변경된다', async ({ page }) => {
    await page.goto('/')
    
    const input = page.getByPlaceholder(/add.*todo|입력/i)
    const button = page.getByRole('button', { name: /add|추가/i })
    
    // TODO 추가
    await input.fill('Learn TypeScript')
    await button.click()
    
    // TODO가 미완료 상태로 표시됨
    const todoItem = page.locator('li').filter({ hasText: 'Learn TypeScript' })
    await expect(todoItem).toBeVisible()
    
    // 토글 버튼 찾기 및 클릭
    const toggleButton = todoItem.locator('button').filter({ hasText: /complete|완료/i })
    await toggleButton.click()
    
    // 완료 상태가 시각적으로 표현됨 (줄 긋기 또는 체크 표시)
    const completedText = todoItem.locator('span').filter({ hasText: 'Learn TypeScript' })
    const classes = await completedText.getAttribute('class')
    expect(classes).toContain('line-through')
  })

  test('여러 TODO 중에서 특정 항목의 상태만 변경할 수 있다', async ({ page }) => {
    await page.goto('/')
    
    const input = page.getByPlaceholder(/add.*todo|입력/i)
    const button = page.getByRole('button', { name: /add|추가/i })
    
    // 3개의 TODO 추가
    await input.fill('Task 1')
    await button.click()
    await input.fill('Task 2')
    await button.click()
    await input.fill('Task 3')
    await button.click()
    
    // Task 2의 토글 버튼 찾기
    const task2Item = page.locator('li').filter({ hasText: 'Task 2' })
    const toggleButton = task2Item.locator('button').filter({ hasText: /complete|완료/i })
    await toggleButton.click()
    
    // Task 2만 완료 상태로 변경
    const task1Item = page.locator('li').filter({ hasText: 'Task 1' })
    const task3Item = page.locator('li').filter({ hasText: 'Task 3' })
    
    const task1Classes = await task1Item.locator('span').getAttribute('class')
    const task2Classes = await task2Item.locator('span').getAttribute('class')
    const task3Classes = await task3Item.locator('span').getAttribute('class')
    
    expect(task1Classes).not.toContain('line-through')
    expect(task2Classes).toContain('line-through')
    expect(task3Classes).not.toContain('line-through')
  })
})

test.describe('Phase C – Edge / Regression', () => {
  test('토글을 반복 수행해도 상태가 정상적으로 유지된다', async ({ page }) => {
    await page.goto('/')
    
    const input = page.getByPlaceholder(/add.*todo|입력/i)
    const button = page.getByRole('button', { name: /add|추가/i })
    
    // TODO 추가
    await input.fill('Toggle test')
    await button.click()
    
    const todoItem = page.locator('li').filter({ hasText: 'Toggle test' })
    const toggleButton = todoItem.locator('button').filter({ hasText: /complete|완료/i })
    
    // 초기: 미완료
    let classes = await todoItem.locator('span').getAttribute('class')
    expect(classes).not.toContain('line-through')
    
    // 1회: 완료로 변경
    await toggleButton.click()
    classes = await todoItem.locator('span').getAttribute('class')
    expect(classes).toContain('line-through')
    
    // 2회: 미완료로 변경
    await toggleButton.click()
    classes = await todoItem.locator('span').getAttribute('class')
    expect(classes).not.toContain('line-through')
    
    // 3회: 완료로 변경
    await toggleButton.click()
    classes = await todoItem.locator('span').getAttribute('class')
    expect(classes).toContain('line-through')
  })

  test('완료/미완료 상태 토글 후에도 항목이 유지된다', async ({ page }) => {
    await page.goto('/')
    
    const input = page.getByPlaceholder(/add.*todo|입력/i)
    const button = page.getByRole('button', { name: /add|추가/i })
    
    // TODO 추가
    await input.fill('Persistent item')
    await button.click()
    
    const todoItem = page.locator('li').filter({ hasText: 'Persistent item' })
    const toggleButton = todoItem.locator('button').filter({ hasText: /complete|완료/i })
    
    // 토글 후에도 항목이 그대로 있음
    await toggleButton.click()
    await expect(page.getByText('Persistent item')).toBeVisible()
    
    await toggleButton.click()
    await expect(page.getByText('Persistent item')).toBeVisible()
  })
})
