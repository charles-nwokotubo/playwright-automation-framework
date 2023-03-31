import { Page, test, expect } from "@playwright/test";
import { LoginPage } from "src/ui/pages/Login.page";
import { MainPage } from "src/ui/pages/Main.page";
import { CartPage } from "src/ui/pages/Cart.page";
import { Checkout1Page } from "src/ui/pages/Checkout1.page";
import { Checkout2Page } from "src/ui/pages/Checkout2.page";
import { ITestUserCredentials, ITestCartItem, ITestPaymentInfo } from "src/ui/@types/testData";


export async function stepLogin(page: LoginPage, user: ITestUserCredentials) {
  await test.step(`login as ${user.name}`, async () => {
    await page.goto();
    await page.login(user.name, user.password);
  });
}

export async function stepAddItemsToCart(page: MainPage, items: ITestCartItem[]) {
  for (const item of items) {
    await test.step(`add ${item.name} to cart`, async () => {
      await page.addItemToCart(item.id)
    });
  } 
}

export async function stepCheckout(page: Page, userPaymentInfo: ITestPaymentInfo) {
  const cartPage = new CartPage(page);
  await test.step("click checkout on cart page", async () => {
    await cartPage.goto();
    await cartPage.checkout();
  });

  const checkoutPageOne = new Checkout1Page(page);
  await test.step("click checkout on cart page", async () => {
    await checkoutPageOne.fillPaymentInfo(userPaymentInfo);
    await checkoutPageOne.continue();
  });

  const checkoutPageTwo = new Checkout2Page(page);
  await test.step("click checkout on cart page", async () => {
    await checkoutPageTwo.finishCheckout();
  });
}

/**
 * Validates that page contains text in body tag
 */
export async function stepValidateRedirect(page: Page, text: string) {
  await test.step("validate body redirect", async () => {
    await expect(page.locator("body"), `Page does not contain ${text} - possible redirect failure`).toContainText(text);
  });
}

