import { test, expect } from '@playwright/test';

test.describe('page-a', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('has title', async ({ page }) => {
    await expect(page).toHaveTitle(/FE Home Test/);
  });

  test('has heading, input and next button', async ({ page }) => {
    await expect(
      page.getByRole('heading', { name: 'Multi-Page Form' })
    ).toBeVisible();
    await expect(page.getByLabel('City')).toBeVisible();
    await expect(page.getByText('Next', { exact: true })).toBeVisible();
  });

  test('valid city navigation', async ({ page }) => {
    await page.getByLabel('City').fill('London');
    await page.getByText('Next', { exact: true }).click();
    await expect(page).toHaveURL(/\/page-b/);
  });

  test('no city and error appears', async ({ page }) => {
    await page.getByText('Next', { exact: true }).click();
    await expect(page.getByText('Invalid value')).toBeVisible();
    await expect(page).toHaveURL(/\/page-a/);
  });

  test('spaces in city and error appears', async ({ page }) => {
    await page.getByLabel('City').fill('     ');
    await page.getByText('Next', { exact: true }).click();
    await expect(page.getByText('Invalid value')).toBeVisible();
    await expect(page).toHaveURL(/\/page-a/);
  });
});
