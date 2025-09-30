This repository has been created by Pablo R. Harillo.

Framework Selection:
I've chosen Playwright for the automation cases creation mainly due to the ease of use for testing across different browsers, with a firm and broad community supporting the functionalities and easy to scale if we need to use different languages.Also it's my main automation tool for the flexibility it provides.

Layout:
The project layout is composed of two different tests located on 'tests/' folder , POM implementation on 'pages/' folder, random data generation created within the files of 'data/' folder, and playwright configuration completed on the root folder.

Tests:
product_checkout.spec.ts validates the selection and checkout of a Product with the characteristics required from the excercise file ( point B - User Flow) , as well as the registration of a new user
audit_case.spec.ts validates the performance and accesibility of the https://automationexercise.com/ website, with the options of desktop and mobile validation

Testing Pre-requisites:
- Install playwright library dependencies with browsers, and include installation of allure-report , faker and lighthouse:
  npm install --save-dev @playwright/test @types/node @faker-js/faker allure-playwright lighthouse playwright-lighthouse rimraf && npx playwright install && npx playwright install-deps

Scripts:
In order to run the required test cases we have to run:
- Test Product Flow with desktop workers ( in our setup case Chrome and Firefox): npm run test:desktop
- Test Product Flow with mobile workers ( in our setup case Pixel 5 and Iphone 12): npm run test:mobile
- Test Performance and Accesibility Audit with desktop workers : npm run test:desktop:audit
- Test Performance and Accesibility Audit with mobile workers : npm run test:mobile:audit

Test Report:
- Create Allure Report: npm run allure:report
- Open created Allure Report: npm run allure:open
- Clean previous Allure Report and data: npm run allure:clean

