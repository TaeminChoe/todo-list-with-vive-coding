import { test, expect } from '@playwright/test'

test.describe('Phase A – Bootstrap', () => {
  test('TODO 목록에 하나 이상의 항목이 존재한다', async ({ page }) => {
    await page.goto('/')

    const input = page.getByPlaceholder(/adicione|add|입력/i)
    const button = page.getByRole('button', { name: /criar|add|추가/i })

    // TODO 항목 추가
    await input.fill('Test todo for delete')
    await button.click()

    // 목록에 항목이 있는지 확인
    const todoItem = page.getByText('Test todo for delete')
    await expect(todoItem).toBeVisible()
  })
})

test.describe('Phase B – Core Flow: AC-02-01', () => {
  test('특정 TODO 항목을 삭제하면 목록에서 사라진다', async ({ page }) => {
    await page.goto('/')

    const input = page.getByPlaceholder(/adicione|add|입력/i)
    const button = page.getByRole('button', { name: /criar|add|추가/i })

    // 삭제할 TODO 추가
    await input.fill('Todo to delete')
    await button.click()

    // 항목이 추가되었는지 확인
    const todoItem = page.getByText('Todo to delete')
    await expect(todoItem).toBeVisible()

    // Delete 버튼 클릭
    const deleteButton = page.getByRole('button', { name: /delete/i }).first()
    await deleteButton.click()

    // 항목이 삭제되었는지 확인
    await expect(todoItem).not.toBeVisible()
  })

  test('여러 항목 중 특정 항목만 삭제된다', async ({ page }) => {
    await page.goto('/')

    const input = page.getByPlaceholder(/adicione|add|입력/i)
    const button = page.getByRole('button', { name: /criar|add|추가/i })

    // 첫 번째 TODO 추가
    await input.fill('Keep this todo')
    await button.click()

    // 두 번째 TODO 추가
    await input.fill('Delete this todo')
    await button.click()

    // 세 번째 TODO 추가
    await input.fill('Keep this too')
    await button.click()

    // 모든 항목 확인
    await expect(page.getByText('Keep this todo')).toBeVisible()
    await expect(page.getByText('Delete this todo')).toBeVisible()
    await expect(page.getByText('Keep this too')).toBeVisible()

    // 두 번째 항목 삭제 (중간 항목)
    const todoList = page.locator('li')
    const deleteButtons = page.getByRole('button', { name: /delete/i })

    // Delete this todo 항목의 Delete 버튼 찾기
    const deleteThisItem = page.locator('li', { has: page.getByText('Delete this todo') })
    const deleteButton = deleteThisItem.getByRole('button', { name: /delete/i })
    await deleteButton.click()

    // 삭제된 항목 확인
    await expect(page.getByText('Delete this todo')).not.toBeVisible()

    // 나머지 항목 확인
    await expect(page.getByText('Keep this todo')).toBeVisible()
    await expect(page.getByText('Keep this too')).toBeVisible()
  })
})

test.describe('Phase C – Edge / Regression', () => {
  test('삭제 후 남은 TODO 항목의 순서와 내용이 유지된다', async ({ page }) => {
    await page.goto('/')

    const input = page.getByPlaceholder(/adicione|add|입력/i)
    const button = page.getByRole('button', { name: /criar|add|추가/i })

    // 세 개의 TODO 추가
    const todos = ['First item', 'Second item', 'Third item']
    for (const todo of todos) {
      await input.fill(todo)
      await button.click()
    }

    // 첫 번째 항목 삭제
    const firstItem = page.locator('li', { has: page.getByText('First item') })
    const firstDeleteBtn = firstItem.getByRole('button', { name: /delete/i })
    await firstDeleteBtn.click()

    // 나머지 항목들의 순서 확인
    const remainingItems = page.locator('li')
    const count = await remainingItems.count()
    expect(count).toBe(2)

    // 텍스트 내용 확인
    const itemTexts = await remainingItems.allTextContents()
    expect(itemTexts[0]).toContain('Second item')
    expect(itemTexts[1]).toContain('Third item')
  })

  test('마지막 TODO를 삭제하면 목록이 비게 된다', async ({ page }) => {
    await page.goto('/')

    const input = page.getByPlaceholder(/adicione|add|입력/i)
    const button = page.getByRole('button', { name: /criar|add|추가/i })

    // TODO 추가
    await input.fill('Single todo')
    await button.click()

    // 항목 확인
    await expect(page.getByText('Single todo')).toBeVisible()

    // 삭제
    const deleteButton = page.getByRole('button', { name: /delete/i }).first()
    await deleteButton.click()

    // 빈 상태 메시지 확인 또는 항목이 없는지 확인
    await expect(page.getByText('Single todo')).not.toBeVisible()

    // TODO 목록의 li 개수가 0인지 확인
    const todoItems = page.locator('li')
    const count = await todoItems.count()
    expect(count).toBe(0)
  })
})
