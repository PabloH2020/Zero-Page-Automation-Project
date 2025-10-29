import { test, expect} from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { Feedback } from '../pages/Feedback'; 
import { LoginPage } from '../pages/LoginPage';
import { generateUserData , generateRandomComment} from '../data/test-data';

test.describe('Zero Page Tests', () => {

    test('Validate Zero Page main components functionality', async ({ page }) => {
      //generate random user data
      const userData = generateUserData();
      const comment = generateRandomComment();

      const homePage = new HomePage(page);
      await homePage.goHome();

      // Expect our to contain the desired services title, and validate privacy statement content
      await expect(homePage.getTitle()).resolves.toMatch('Zero - Personal Banking - Loans - Credit Cards');
      await homePage.validatePrivacyStatementContent();
      await homePage.goHome();

      //navigate to online banking section and count that the amount of services is correct
      await homePage.navigateToOnlineBanking();
      await page.waitForTimeout(2000); //wait for 2 seconds to ensure all elements are loaded
      const bankingServices = await page.locator('//span[@class="headers"]');
      const serviceCount = await bankingServices.count();
      console.log('Number of online banking services:', serviceCount);
      await expect(serviceCount).toBe(6);

      // go to the Feedback section and view details. Review title, description and form functionalities
      await homePage.navigateToFeedback();
      const feedback = new Feedback(page);
      await feedback.validateTitle();
      await feedback.validateLoginForm();
      await feedback.validateDescription();
      await feedback.validateFields();
      //complete feedback form, clear it and complete it again to submit
      await feedback.fillEmptyFields(userData.name,userData.email, 'Feedback Subject', comment);
      await feedback.clearContactForm();
      await feedback.fillEmptyFields(userData.name,userData.email, 'Feedback Subject', comment);
      await feedback.submitContactForm();
      await feedback.validateContactFormSubmitted();
      await homePage.goHome();

      // Head to Login section and try to login with invalid credentials
      await homePage.navigateToLogin();
      const loginPage = new LoginPage(page);
      await loginPage.validateLoginModal();
      await loginPage.addUserAndPassword(userData.name,userData.password);
      await loginPage.SignIn();
      await loginPage.validateLoginError();
      await homePage.goHome();
      

    });


    //negative scenario to validate email input on feedback form
    test('Check Email Input validation on Feedback Form', async ({ page }) => {
      
      //generate new random user data and define page objects
      const userData = generateUserData();
      const comment = generateRandomComment();
      const homePage = new HomePage(page);
      await homePage.goHome();
      await homePage.navigateToFeedback();
      const feedback = new Feedback(page);
      //validate email input with non valid email data, in this case adding a name with string type instead of a valid email
      await feedback.fillEmptyFields(userData.name, userData.name,'Feedback Subject', comment);
      await feedback.submitContactForm();
      //validate that error message is shown. The validation is NOT OK if there is no error message
      await expect(page.locator('//*[@class="alert alert-error"]')).toBeVisible();

    })





})