import { test, expect } from '@playwright/test'

test.describe('MaAiChat', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/login')
    await page.getByPlaceholder('name@company.com').fill('test@example.com')
    await page.getByPlaceholder('••••••••').fill('password')
    await page.getByRole('button', { name: 'Sign In' }).click()
    await page.waitForURL('/')
    await page.goto('http://localhost:5173/ai-chat')
    await page.waitForLoadState('networkidle')
  })

  test('should display empty state on initial load', async ({ page }) => {
    const emptyState = page.locator('.empty-state')
    await expect(emptyState).toBeVisible()
    await expect(page.locator('h2')).toContainText('Start a conversation')
  })

  test('should create new chat session', async ({ page }) => {
    await page.click('button:has-text("New Chat")')
    const sessions = page.locator('.session-item')
    await expect(sessions).toHaveCount(1)
  })

  test('should send message and display in chat', async ({ page }) => {
    const input = page.locator('.message-input')
    await input.fill('Hello AI')
    await page.click('.send-btn')
    
    const userMessage = page.locator('.message-wrapper.user')
    await expect(userMessage).toBeVisible()
    await expect(userMessage).toContainText('Hello AI')
  })

  test('should toggle sidebar', async ({ page }) => {
    const sidebar = page.locator('.ai-chat-sidebar')
    const toggleBtn = page.locator('.toggle-sidebar-btn')
    
    await toggleBtn.click()
    await expect(sidebar).toHaveClass(/collapsed/)
    
    await toggleBtn.click()
    await expect(sidebar).not.toHaveClass(/collapsed/)
  })

  test('should open settings modal', async ({ page }) => {
    await page.click('button:has-text("Settings")')
    await expect(page.locator('text=Chat Settings')).toBeVisible()
    await page.click('button:has-text("Cancel")')
    await expect(page.locator('text=Chat Settings')).not.toBeVisible()
  })

  test('should use suggestion chip to send message', async ({ page }) => {
    const firstChip = page.locator('.suggestion-chip').first()
    await firstChip.click()
    
    const userMessage = page.locator('.message-wrapper.user')
    await expect(userMessage).toBeVisible()
  })

  test('should disable send button when input is empty', async ({ page }) => {
    const sendBtn = page.locator('.send-btn')
    await expect(sendBtn).toBeDisabled()
    
    await page.locator('.message-input').fill('Test')
    await expect(sendBtn).not.toBeDisabled()
  })
})
