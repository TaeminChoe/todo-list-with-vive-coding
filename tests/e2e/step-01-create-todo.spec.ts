import { test, expect } from '@playwright/test'

test.describe('Phase A – Bootstrap', () => {
  test('TODO 목록 화면에 접근 가능하고 입력 UI가 표시된다', async ({ page }) => {
    await page.goto('/')

    // TODO 목록 화면 확인
    const heading = page.getByRole('heading', { name: 'My Todo List' })
    await expect(heading).toBeVisible()

    // TODO 입력 UI 확인 (입력 필드와 버튼)
    const input = page.getByPlaceholder(/add.*todo|입력/i)
    await expect(input).toBeVisible()

    const button = page.getByRole('button', { name: /add|추가/i })
    await expect(button).toBeVisible()
  })
})

test.describe('Phase B – Core Flow: AC-001-01 & AC-001-03', () => {
  test('유효한 입력으로 TODO를 생성하면 목록에 표시된다', async ({ page }) => {
    await page.goto('/')

    // 입력 필드와 버튼 찾기
    const input = page.getByPlaceholder(/add.*todo|입력/i)
    const button = page.getByRole('button', { name: /add|추가/i })

    // TODO 항목 입력 및 추가
    const todoText = 'Buy milk'
    await input.fill(todoText)
    await button.click()

    // 목록에 새로운 TODO가 표시되는지 확인
    const todoItem = page.getByText(todoText)
    await expect(todoItem).toBeVisible()

    // 입력 필드가 초기화되었는지 확인
    await expect(input).toHaveValue('')
  })

  test('AC-001-03: TODO 생성 시 메시지와 생성일자가 표출된다', async ({ page }) => {
    await page.goto('/')

    const input = page.getByPlaceholder(/add.*todo|입력/i)
    const button = page.getByRole('button', { name: /add|추가/i })

    const todoText = 'Test todo for date check'
    await input.fill(todoText)
    await button.click()

    const todoListItem = page.locator('li').first()

    // 메시지 확인
    await expect(todoListItem).toContainText(todoText)

    // 생성일자 형식 확인: yyyy-MM-dd HH:mm
    const todoContent = await todoListItem.textContent()
    expect(todoContent).toMatch(/\d{4}-\d{2}-\d{2}\s\d{2}:\d{2}/)
  })

  test('여러 개의 TODO를 차례대로 추가할 수 있다', async ({ page }) => {
    await page.goto('/')

    const input = page.getByPlaceholder(/add.*todo|입력/i)
    const button = page.getByRole('button', { name: /add|추가/i })

    // 첫 번째 TODO 추가
    await input.fill('Task 1')
    await button.click()
    await expect(page.getByText('Task 1')).toBeVisible()

    // 두 번째 TODO 추가
    await input.fill('Task 2')
    await button.click()
    await expect(page.getByText('Task 2')).toBeVisible()

    // 세 번째 TODO 추가
    await input.fill('Task 3')
    await button.click()
    await expect(page.getByText('Task 3')).toBeVisible()

    // 모든 TODO가 목록에 있는지 확인
    await expect(page.getByText('Task 1')).toBeVisible()
    await expect(page.getByText('Task 2')).toBeVisible()
    await expect(page.getByText('Task 3')).toBeVisible()
  })
})

test.describe('Phase C – Edge / Regression: AC-001-02', () => {
  test('빈 입력으로 TODO 추가를 시도하면 생성되지 않는다', async ({ page }) => {
    await page.goto('/')

    const input = page.getByPlaceholder(/add.*todo|입력/i)
    const button = page.getByRole('button', { name: /add|추가/i })

    // 빈 입력으로 추가 시도
    await input.fill('')
    await button.click()

    // 입력 필드가 비어있는지 확인
    await expect(input).toHaveValue('')

    // TODO 목록이 비어있는지 확인 (최초 상태 유지)
    const todoItems = page.locator('li')
    const count = await todoItems.count()
    expect(count).toBe(0)
  })

  test('공백만 입력한 경우 TODO가 생성되지 않는다', async ({ page }) => {
    await page.goto('/')

    const input = page.getByPlaceholder(/add.*todo|입력/i)
    const button = page.getByRole('button', { name: /add|추가/i })

    // 공백만 입력
    await input.fill('   ')
    await button.click()

    // TODO 목록이 비어있는지 확인
    const todoItems = page.locator('li')
    const count = await todoItems.count()
    expect(count).toBe(0)
  })

  test('엔터 키로도 TODO를 추가할 수 있다', async ({ page }) => {
    await page.goto('/')

    const input = page.getByPlaceholder(/add.*todo|입력/i)

    // 입력 후 엔터 키 누르기
    await input.fill('Shopping list')
    await input.press('Enter')

    // TODO가 추가되었는지 확인
    await expect(page.getByText('Shopping list')).toBeVisible()

    // 입력 필드가 초기화되었는지 확인
    await expect(input).toHaveValue('')
  })
})
