import { Page,expect } from "@playwright/test";

export class Feedback {
    private contactForm;
  constructor(private page: Page) {
    this.page = page;
    this.contactForm = this.page.locator('//html/body/div[1]/div[2]/div/div/div/form');
  }



  async validateTitle(){
    await expect(this.page.title()).resolves.toMatch('Zero - Contact Us');
  }

  async validateLoginForm() {
    await expect(this.contactForm).toBeVisible();
  }

  async validateDescription(){
    await expect(this.page.locator('//*[@id="description"]')).toBeVisible();
  }

  async validateFields() {
    const namePlaceholderText = await this.contactForm.locator('//*[@id="name"]').getAttribute('placeholder');
    const emailPlaceholderText = await this.contactForm.locator('//*[@id="email"]').getAttribute('placeholder');
    const subjectPlaceholderText = await this.contactForm.locator('//*[@id="subject"]').getAttribute('placeholder');
    console.log(namePlaceholderText);
    await expect(namePlaceholderText).toBe('Your Name');
    await expect(emailPlaceholderText).toBe('Your email address');
    await expect(subjectPlaceholderText).toBe('Subject');
  }

  async fillEmptyFields(name:string, email:string, subject:string, comment:string) {
    
    //fill data in the form
    await this.contactForm.locator('//*[@id="name"]').fill(name);
    await this.contactForm.locator('//*[@id="email"]').fill(email);
    await this.contactForm.locator('//*[@id="subject"]').fill(subject);
    await this.contactForm.locator('//*[@id="comment"]').fill(comment);

  }
    async submitContactForm() {
        await this.contactForm.locator('//*[@name="submit"]').click()
    }
    
    async clearContactForm(){
      await this.contactForm.locator('//*[@name="clear"]').click()
    }

    async validateContactFormSubmitted(){
      await expect(this.page.locator('//*[@class="page-header"]')).toBeVisible();
    }

}
