import { test, expect } from "@playwright/test";
import { LoginPage } from "src/ui/pages/Login.page";
import { MainPage } from "src/ui/pages/Main.page";
import { CartPage } from "src/ui/pages/Cart.page";
import { Checkout1Page } from "src/ui/pages/Checkout1.page";
import { stepLogin, stepAddItemsToCart, stepCheckout, stepValidateConfirmation } from "src/ui/sharedSteps/test.step";
import { ITestData } from "src/ui/@types/testData";
import { camelToSpaceLowerCase } from "src/ui/utils/testUtils";

const testData: ITestData = {
  user: {
    name: "standard_user",
    password: process.env.USER_PASSWORD!
  },
  cartItems: [
    {
      name: "Sauce Labs Backpack",
      price: "$29.99",
      quantity: 1,
      id: "sauce-labs-backpack"
    }
  ],
  billingInfo: {
    firstName: "Test",
    lastName: "User",
    postalCode: "A1A A1A"
  },
  confirmationText: "Thank you for your order!"
};

test("Incomplete billing info should block checkout", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await stepLogin(loginPage, testData.user);

  const mainPage = new MainPage(page);
  await stepAddItemsToCart(mainPage, testData.cartItems)

  const cartPage = new CartPage(page);
  await test.step("click checkout on cart page", async () => {
    await cartPage.goto();
    await cartPage.checkout();
  });

  const checkoutPageOne = new Checkout1Page(page);
  for (const info in testData.billingInfo) {
    await test.step(`omit ${info} and attempt to continue`, async () => {
      await checkoutPageOne.fillBillingInfo({...testData.billingInfo, [info]: ""});
      await checkoutPageOne.continue();

      const errorMsg = await checkoutPageOne.errorMsg.innerText();
      expect(errorMsg.toLowerCase()).toEqual(`error: ${camelToSpaceLowerCase(info)} is required`);
    });
  }

  await stepCheckout(page, testData.billingInfo, { skipCartPage: true })

  await stepValidateConfirmation(page, testData.confirmationText)
});