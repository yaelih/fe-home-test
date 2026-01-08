import { test, expect } from '@playwright/test';

test.describe('page-b', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.getByLabel('City').fill('London');
    await page.getByText('Next', { exact: true }).click();
    await expect(page).toHaveURL(/\/page-b/);
  });

  test('has heading, inputs and submit button', async ({ page }) => {
    await expect(
      page.getByRole('heading', { name: 'Multi-Page Form' })
    ).toBeVisible();
    const cityInput = page.getByLabel('City')
    await expect(cityInput).toBeVisible();
    await expect(cityInput).toBeDisabled();
    await expect(cityInput).toHaveValue('London');
    await expect(page.getByLabel('User Name')).toBeVisible();
    await expect(page.getByText('Submit', { exact: true })).toBeVisible();
  });

  test('valid username navigation', async ({ page }) => {
    await page.getByLabel('User Name').fill('David');
    await page.getByText('Submit', { exact: true }).click();
    await expect(page).toHaveURL(/\/result/);
  });
});
