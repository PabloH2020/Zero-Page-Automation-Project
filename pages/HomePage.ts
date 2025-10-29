import { Page , expect} from "@playwright/test";

export class HomePage {
  constructor(private page: Page) {
    this.page = page;
  }

  async goHome() {
    await this.page.goto("/");
  }

  async getTitle() {
    return this.page.title();
  }

  async navigateToOnlineBanking() {
    await this.page.locator('//*[@id="onlineBankingMenu"]').click();
  }

  async navigateToFeedback() {
    await this.page.locator('//*[@id="feedback"]').click();
  }

  async navigateToServices() {
    await this.page.locator('//*[@id="online-banking"]').click();
  }
  
  async navigateToLogin() {
    await this.page.locator('//*[@id="signin_button"]').click();
  }

  async validatePrivacyStatementContent() {
    const privacyContent = await this.page.locator('//span[@id="privacy_statement_link"]');
    await privacyContent.click();
    expect(this.page.url()).toContain('privacy');
  }
}
