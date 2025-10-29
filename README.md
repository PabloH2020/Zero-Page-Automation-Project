This repository has been created by Pablo R. Harillo.

Framework Selection:
I've chosen Playwright for the automation cases creation mainly due to the ease of use for testing across different browsers, with a firm and broad community supporting the functionalities and easy to scale if we need to use different languages. Also it's my main automation tool for the flexibility it provides.

Layout:
The project layout is composed of two different tests located on 'tests/' folder , Page Object Model implementation on 'pages/' folder, random data generation created within the files of 'data/' folder with an Interface for better field validation, and playwright configuration completed on the root folder.

Tests:
zero_page_validations.spec.ts validates the main page components and critical functionalities that I've considered for the url of Exercise number 1 'http://zero.webappsecurity.com/', as well as one of the test cases that controls if there is a validation of the email input of Feedback Form section, connected with one of the bugs that I created in the Trello board of Exercise 1.

audit_case.spec.ts validates the performance and accesibility of the website, with the options of desktop and mobile validation

Testing Pre-requisites:
- Install playwright library dependencies with browsers, and include installation of allure-report , faker and lighthouse:
  npm install --save-dev @playwright/test @types/node @faker-js/faker allure-playwright lighthouse playwright-lighthouse rimraf && npx playwright install && npx playwright install-deps

Scripts:
In order to run the required test cases we have to run:
- Test Main Pages Flow with desktop workers ( in our setup case Chrome and Firefox): npm run test:desktop
- Test Main Pages Flow with mobile workers ( in our setup case Pixel 5 and Iphone 12): npm run test:mobile
- Test Performance and Accesibility Audit with desktop workers : npm run test:desktop:audit
- Test Performance and Accesibility Audit with mobile workers : npm run test:mobile:audit
- To open successful Accesibility Audit test you must run: npx playwright show-report

Test Report:
- Create Allure Report: npm run allure:report
- Open created Allure Report: npm run allure:open
- Clean previous Allure Report and data: npm run allure:clean

