import { Page, expect } from "@playwright/test";

export class Products {
  constructor(private page: Page) {
    this.page = page;
  }

  async reviewProductDetails() {
    //choose the third product to review details
    await this.page.locator('//div[@class="features_items"]/div[@class="col-sm-4"][3]/div[@class="product-image-wrapper"]/div[@class="choose"]/ul/li/a').click();
  }
  async addProductToCart(quantity: number) {
     await this.page.locator('//div[@class="product-information"]/span/input[@name="quantity"]').fill(quantity.toString());
     await this.page.locator('//div[@class="product-information"]/span/button[@class="btn btn-default cart"]').click();
  }
  async validateModalAndProceedToCheckout() {
    await expect(this.page.locator('//div[@id="cartModal"]')).toBeVisible();
      await this.page.locator('//*[@id="cartModal"]/div/div/div[2]/p[2]/a').click();
      const productAdded = this.page.locator('//tbody/tr[@id="product-3"]');
      if ( productAdded ) {
        await expect(productAdded).toBeVisible();
        console.log('The product was successfully added to the cart');
        await this.page.locator('//*[@id="do_action"]/div[1]/div/div/a').click();
    } else {
        console.log('The product was not added to the cart');
    }
  }
}