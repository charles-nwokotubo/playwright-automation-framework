import { test } from "@playwright/test";
import { LoginPage } from "src/ui/pages/Login.page";
import { MainPage } from "src/ui/pages/Main.page";
import { stepLogin, stepAddItemsToCart, stepCheckout, stepValidateConfirmation } from "src/ui/sharedSteps/test.step";
import { ITestData } from "src/ui/@types/testData";

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
  paymentInfo: {
    firstName: "Test",
    lastName: "User",
    postalCode: "A1A A1A"
  },
  confirmationText: "Thank you for your order!"
}

test("Base checkout flow", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await stepLogin(loginPage, testData.user);

  const mainPage = new MainPage(page);
  await stepAddItemsToCart(mainPage, testData.cartItems)

  await stepCheckout(page, testData.paymentInfo)

  await stepValidateConfirmation(page, testData.confirmationText)
});
