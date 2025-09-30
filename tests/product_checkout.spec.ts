import { test, expect} from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { Register } from '../pages/Register'; 
import { Products } from '../pages/Products';
import { SignUpModal } from '../pages/SignUpModal';
import { PaymentInfo } from '../pages/PaymentInfo';
import { generateUserData , generateRandomQuantity , generateRandomComment} from '../data/test-data';


test('Select and Checkout Product', async ({ page }) => {
  //generate random user data
  const userData = generateUserData();
  const quantity = generateRandomQuantity();
  const comment = generateRandomComment();

  const homePage = new HomePage(page);
  await homePage.goHome();

  // Expect our to contain Automation Excercise.
  await expect(homePage.getTitle()).resolves.toMatch('Automation Exercise');

  // go to products section and view details of third product
  await homePage.navigateToProducts();
  const productsPage = new Products(page);
  await productsPage.reviewProductDetails();
  await page.waitForTimeout(3000);

  //add a random quantity of the product to the cart
  await productsPage.addProductToCart(quantity);

  //check cart modal is visible and proceed to checkout
  await productsPage.validateModalAndProceedToCheckout();
  await page.waitForTimeout(3000);
  
  //validate register modal , register a new user and login
  const signUpModal = new SignUpModal(page);
  await signUpModal.validateSignUpModal();
  await signUpModal.preAddNameAndEmail(userData.name, userData.email);
  await page.waitForTimeout(3000);
  //check that user is not registered yet with the chosen email and visibility of information filler form
  await signUpModal.validateNotAnExistingUser();
  const register = new Register(page);
  await register.validateLoginForm();
  await page.waitForTimeout(3000);
  
  //validate that name and email are correctly prefilled
  await register.validateNameAndEmail(userData.name, userData.email);
  //fill new user data
  await register.fillEmptyFields();
  await register.submitForm();
  //validate that the account was created correctly
  await register.validateAccountCreated();

  
  await page.waitForTimeout(3000);


  //proceed to the cart and confirm the order
  await homePage.navigateToCart();
  const paymentInfo = new PaymentInfo(page);
  await paymentInfo.headToCheckout();
  //fill comment text area and place the order
  await paymentInfo.fillCommentAndPlaceOrder(comment);
  //payment information
  await paymentInfo.fillPaymentDetails(userData.name);
  await paymentInfo.completePayment();
  //check that the order was placed successfully
  await page.waitForTimeout(3000);     
  await paymentInfo.confirmSuccessfulOrder();
  //logout of the account
  await homePage.logout();

  
});








