import { Page, expect } from "@playwright/test";

export class LoginPage {
  constructor(private page: Page) {
    this.page = page;
  }

  
  async validateLoginModal() {
    const loginModal = this.page.locator('//form[@id="login_form"]');
    await expect(loginModal).toBeVisible();

  }
  async addUserAndPassword(user: string, password: string) {
    await this.page.locator('//*[@id="user_login"]').fill(user);
    await this.page.locator('//*[@id="user_password"]').fill(password);
  }
  async SignIn(){
    await this.page.locator('//*[@name="submit"]').click();
  }

  async validateLoginError(){
    const errorMessage = await this.page.locator('//*[@class="alert alert-error"]');
    await expect(errorMessage).toBeVisible();
  }
  
}