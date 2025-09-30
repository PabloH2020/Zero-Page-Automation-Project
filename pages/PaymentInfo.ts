import {Page, expect} from '@playwright/test';
import { faker } from '@faker-js/faker';

export class PaymentInfo {
    constructor(private page: Page) {
        this.page = page;
    }

    async headToCheckout(){
        await this.page.locator('//*[@id="do_action"]/div[1]/div/div/a').click();
    }
    async fillCommentAndPlaceOrder(comment:string){
        await this.page.locator('//textarea[@name="message"]').fill(comment);
        await this.page.locator('//*[@id="cart_items"]/div/div[7]/a').click();
    }
    async fillPaymentDetails(name:string){
        //payment information
        await this.page.locator('//input[@data-qa="name-on-card"]').fill(name);
        await this.page.locator('//input[@data-qa="card-number"]').fill('4111111111111111');
        const cvcCode = faker.finance.creditCardCVV();
        const cardExpiry = faker.date.future({ years: 2 }).toLocaleDateString('en-US', { month: '2-digit', year: 'numeric' });
        await this.page.locator('//input[@data-qa="cvc"]').fill(cvcCode);
        await this.page.locator('//input[@data-qa="expiry-month"]').fill(cardExpiry.split('/')[0]);
        await this.page.locator('//input[@data-qa="expiry-year"]').fill(cardExpiry.split('/')[1]);
    }
    async completePayment(){
        await this.page.locator('//button[@data-qa="pay-button"]').click();
    }
    async confirmSuccessfulOrder(){
        const orderConfirmed = this.page.locator('//h2[@data-qa="order-placed"]');
        if ( orderConfirmed ){
            await expect(orderConfirmed).toBeVisible();
            await expect(orderConfirmed).toContainText('Order Placed!');
            console.log('The order was successfully placed');
        }else{
            console.log('The order could not be placed');
        }
    }
}