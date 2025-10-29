import { test, expect , chromium} from '@playwright/test';
import {playAudit} from 'playwright-lighthouse';
import { HomePage } from '../pages/HomePage';


test('Performance & Accessibility Audit', async () => {
  const browser = await chromium.launch({
        args: ['--remote-debugging-port=9222'],
      });
      const page = await browser.newPage();
      const homePage = new HomePage(page);
      await homePage.goHome();
      // Expect our page to match the correct title.
      await expect(homePage.getTitle()).resolves.toMatch('Zero - Personal Banking - Loans - Credit Cards');


      //lighthouse performance report depending on the thresholds defined for each category
      await playAudit({
            page: page,
            thresholds: {
              performance: 60, // Example threshold
              accessibility: 60,
              'best-practices': 40,
              seo: 40,
              pwa: 70,
            },
            port: 9222,
          });

          await page.close();

});
