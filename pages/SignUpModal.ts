import { Page, expect } from "@playwright/test";

export class SignUpModal {
  constructor(private page: Page) {
    this.page = page;
  }

  async validateSignUpModal() {
    const checkoutModal = this.page.locator('//div[@id="checkoutModal"]');
    await expect(checkoutModal).toBeVisible();
    await checkoutModal.locator('//div/div/div[2]/p[2]/a').click();
    await expect(this.page.locator('//*[@class="signup-form"]')).toContainText('New User Signup!');
  }
  async preAddNameAndEmail(name: string, email: string) {
    await this.page.locator('//*[@class="signup-form"]/form/input[@data-qa="signup-name"]').fill(name);
    await this.page.locator('//*[@class="signup-form"]/form/input[@data-qa="signup-email"]').fill(email);
    await this.page.locator('//*[@class="signup-form"]/form/button[@data-qa="signup-button"]').click();
  }
  async validateNotAnExistingUser(){
    await expect(this.page.locator('//*[@class="signup-form"]/form/p')).not.toBeVisible();
  }
  
}