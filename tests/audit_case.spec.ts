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
      // Expect our to contain Automation Excercise.
      await expect(homePage.getTitle()).resolves.toMatch('Automation Exercise');

      //lighthouse performance report
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
