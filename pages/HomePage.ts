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

  async navigateToProducts() {
    await this.page.locator('//a[@href="/products"]').click();
  }

  async navigateToCart() {
    await this.page.locator('//*[@id="header"]/div/div/div/div[2]/div/ul/li[3]/a').click();
  }

  async logout() {
    await this.page.locator('//*[@id="header"]/div/div/div/div[2]/div/ul/li[4]/a').click();
    await expect(this.page.locator('//*[@class="signup-form"]')).toBeVisible();
  }
}
