import { test, expect } from '@playwright/test'

test.describe('Phase A – Bootstrap', () => {
  test('TODO 항목이 목록에 존재한다', async ({ page }) => {
    await page.goto('/')
    
    const input = page.getByPlaceholder(/add.*todo|입력/i)
    const button = page.getByRole('button', { name: /add|추가/i })
    
    // TODO 추가
    await input.fill('Item to edit')
    await button.click()
    
    // TODO 항목 표시 확인
    await expect(page.getByText('Item to edit')).toBeVisible()
  })
})

test.describe('Phase B – Core Flow', () => {
  test('AC-001-03: 유효한 내용으로 TODO를 수정하면 변경 내용이 반영된다', async ({ page }) => {
    await page.goto('/')
    
    const input = page.getByPlaceholder(/add.*todo|입력/i)
    const button = page.getByRole('button', { name: /add|추가/i })
    
    // TODO 추가
    await input.fill('Original text')
    await button.click()
    
    // 수정 버튼 찾기 (Edit 버튼이 Original text와 같은 li 내에 있음)
    const listItems = page.locator('li')
    const originalItem = listItems.filter({ hasText: 'Original text' })
    
    // Edit 버튼 클릭
    const editButton = originalItem.locator('button').filter({ hasText: /edit/i })
    await editButton.click()
    
    // 수정 입력 필드 찾기 (수정 모드로 전환되면 입력 필드가 보임)
    const editInput = page.locator('li').locator('input[type="text"]')
    await expect(editInput).toBeVisible()
    
    // 기존 텍스트가 입력 필드에 있는지 확인
    const currentValue = await editInput.inputValue()
    expect(currentValue).toBe('Original text')
    
    // 수정 내용 입력
    await editInput.clear()
    await editInput.fill('Modified text')
    
    // 저장 버튼 클릭 (현재 li 내의 Save 버튼)
    const saveButton = page.locator('li').locator('button').filter({ hasText: /save/i })
    await saveButton.click()
    
    // 수정된 내용이 목록에 표시됨
    await expect(page.getByText('Modified text')).toBeVisible()
    await expect(page.getByText('Original text')).not.toBeVisible()
  })

  test('AC-001-04: 수정 취소 동작을 수행하면 기존 내용이 유지된다', async ({ page }) => {
    await page.goto('/')
    
    const input = page.getByPlaceholder(/add.*todo|입력/i)
    const button = page.getByRole('button', { name: /add|추가/i })
    
    // TODO 추가
    await input.fill('Keep this text')
    await button.click()
    
    // Edit 버튼 클릭
    const editButton = page.locator('li').locator('button').filter({ hasText: /edit/i })
    await editButton.click()
    
    // 입력 필드에 새 내용 입력
    const editInput = page.locator('li').locator('input[type="text"]')
    await editInput.clear()
    await editInput.fill('Changed text')
    
    // 취소 버튼 클릭
    const cancelButton = page.locator('li').locator('button').filter({ hasText: /cancel/i })
    await cancelButton.click()
    
    // 기존 내용이 유지됨
    await expect(page.getByText('Keep this text')).toBeVisible()
    await expect(page.getByText('Changed text')).not.toBeVisible()
  })

  test('AC-001-05: 유효하지 않은 입력으로 수정 반영 시도하면 반영되지 않는다', async ({ page }) => {
    await page.goto('/')
    
    const input = page.getByPlaceholder(/add.*todo|입력/i)
    const button = page.getByRole('button', { name: /add|추가/i })
    
    // TODO 추가
    await input.fill('Should remain unchanged')
    await button.click()
    
    // Edit 버튼 클릭
    const editButton = page.locator('li').locator('button').filter({ hasText: /edit/i })
    await editButton.click()
    
    // 입력 필드에 공백만 입력
    const editInput = page.locator('li').locator('input[type="text"]')
    await editInput.clear()
    await editInput.fill('   ')
    
    // 저장 버튼 클릭
    const saveButton = page.locator('li').locator('button').filter({ hasText: /save/i })
    await saveButton.click()
    
    // 기존 내용이 유지됨 (공백은 저장되지 않음)
    await expect(page.getByText('Should remain unchanged')).toBeVisible()
  })
})

test.describe('Phase C – Edge / Regression', () => {
  test('수정 도중 입력을 변경해도 다른 항목에 영향이 없다', async ({ page }) => {
    await page.goto('/')
    
    const input = page.getByPlaceholder(/add.*todo|입력/i)
    const button = page.getByRole('button', { name: /add|추가/i })
    
    // 3개의 TODO 추가
    await input.fill('First')
    await button.click()
    await input.fill('Second')
    await button.click()
    await input.fill('Third')
    await button.click()
    
    // 모든 항목 확인
    await expect(page.getByText('First')).toBeVisible()
    await expect(page.getByText('Second')).toBeVisible()
    await expect(page.getByText('Third')).toBeVisible()
    
    // "Second" 항목의 Edit 버튼 찾아서 클릭 (여러 개이므로 "Second"를 포함한 li에서만)
    const allItems = page.locator('li')
    for (let i = 0; i < await allItems.count(); i++) {
      const itemText = await allItems.nth(i).textContent()
      if (itemText?.includes('Second')) {
        const editButtonInItem = allItems.nth(i).locator('button').filter({ hasText: /edit/i })
        await editButtonInItem.click()
        break
      }
    }
    
    // 수정 입력 필드가 보임
    const editInput = page.locator('li').locator('input[type="text"]')
    await expect(editInput).toBeVisible()
    
    // 수정 내용 입력
    await editInput.clear()
    await editInput.fill('Modified Second')
    
    // 저장 버튼 클릭
    const saveButton = page.locator('li').locator('button').filter({ hasText: /save/i })
    await saveButton.click()
    
    // First와 Third는 변경되지 않음
    await expect(page.getByText('First')).toBeVisible()
    await expect(page.getByText('Modified Second')).toBeVisible()
    await expect(page.getByText('Third')).toBeVisible()
  })

  test('여러 수정을 연속으로 수행할 수 있다', async ({ page }) => {
    await page.goto('/')
    
    const input = page.getByPlaceholder(/add.*todo|입력/i)
    const button = page.getByRole('button', { name: /add|추가/i })
    
    // TODO 추가
    await input.fill('Version 1')
    await button.click()
    
    // 첫 번째 수정
    let editButton = page.locator('li').locator('button').filter({ hasText: /edit/i }).first()
    await editButton.click()
    let editInput = page.locator('li').locator('input[type="text"]')
    await editInput.clear()
    await editInput.fill('Version 2')
    let saveButton = page.locator('li').locator('button').filter({ hasText: /save/i })
    await saveButton.click()
    
    // 두 번째 수정
    editButton = page.locator('li').locator('button').filter({ hasText: /edit/i }).first()
    await editButton.click()
    editInput = page.locator('li').locator('input[type="text"]')
    await editInput.clear()
    await editInput.fill('Version 3')
    saveButton = page.locator('li').locator('button').filter({ hasText: /save/i })
    await saveButton.click()
    
    // 최종 상태 확인
    await expect(page.getByText('Version 3')).toBeVisible()
    await expect(page.getByText('Version 1')).not.toBeVisible()
    await expect(page.getByText('Version 2')).not.toBeVisible()
  })
})
