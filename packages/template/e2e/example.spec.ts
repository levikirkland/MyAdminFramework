import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/My Admin Template/);
});

test('login and dashboard loads', async ({ page }) => {
  await page.goto('/login');
  
  // Fill login form
  await page.getByPlaceholder('name@company.com').fill('test@example.com');
  await page.getByPlaceholder('••••••••').fill('password');
  
  // Click sign in
  await page.getByRole('button', { name: 'Sign In' }).click();
  
  // Wait for navigation to dashboard
  await page.waitForURL('/');
  
  // Check if sidebar exists
  await expect(page.locator('.ma-sidebar')).toBeVisible();
  
  // Check if header exists
  await expect(page.locator('.ma-header')).toBeVisible();
});
