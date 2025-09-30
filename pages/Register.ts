import { Page,expect } from "@playwright/test";

export class Register {
    private loginForm;
  constructor(private page: Page) {
    this.page = page;
    this.loginForm = this.page.locator('//div[@class="login-form"]');
  }


  async validateLoginForm() {
    await expect(this.loginForm).toBeVisible();
  }
  async validateNameAndEmail(name:string,email:string) {
    await expect(this.loginForm.locator('//form/div[@class="required form-group"]/input[@data-qa="name"]')).toHaveValue(name);
    await expect(this.loginForm.locator('//form/div[@class="required form-group"]/input[@data-qa="email"]')).toHaveValue(email);
  }

  async fillEmptyFields() {
    
    //fill data in the form
    await this.loginForm.locator('//form/div[@class="clearfix"]/div[@class="radio-inline"][1]/label[@class="top"]/div[@class="radio"]/span/input[@value="Mr"]').click();
    await this.loginForm.locator('//form/div[@class="required form-group"]/input[@data-qa="password"]').fill('Test1234');
    await this.loginForm.locator('//select[@data-qa="days"]').selectOption('10');
    await this.loginForm.locator('//select[@data-qa="months"]').selectOption('5');
    await this.loginForm.locator('//select[@data-qa="years"]').selectOption('1990');
    await this.loginForm.locator('//input[@data-qa="first_name"]').fill('Test');
    await this.loginForm.locator('//input[@data-qa="last_name"]').fill('User');
    await this.loginForm.locator('//input[@data-qa="company"]').fill('Test Company');
    await this.loginForm.locator('//input[@data-qa="address"]').fill('123 Test St');
    await this.loginForm.locator('//input[@data-qa="address2"]').fill('Apartment 4B');
    await this.loginForm.locator('//select[@data-qa="country"]').selectOption('United States');
    await this.loginForm.locator('//input[@data-qa="state"]').fill('Arizona');
    await this.loginForm.locator('//input[@data-qa="city"]').fill('Phoenix');
    await this.loginForm.locator('//input[@data-qa="zipcode"]').fill('85001');
    await this.loginForm.locator('//input[@data-qa="mobile_number"]').fill('+15005678909');
  }
    async submitForm() {
        await this.loginForm.locator('//button[@data-qa="create-account"]').click();
    }
    async validateAccountCreated() {
        const accountCreated = this.page.locator('//h2[@data-qa="account-created"]')
        if ( accountCreated ){
            await expect(accountCreated).toBeVisible()
            await expect(accountCreated).toContainText('Account Created')
            console.log('The user was successfully created');
        }else{
            console.log('The user could not be created');
        }
    }

}
