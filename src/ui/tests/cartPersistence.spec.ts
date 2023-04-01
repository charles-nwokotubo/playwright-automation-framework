import { test, expect } from "@playwright/test";
import { LoginPage } from "src/ui/pages/Login.page";
import { MainPage } from "src/ui/pages/Main.page";
import { CartPage } from "src/ui/pages/Cart.page";
import { stepLogin, stepAddItemsToCart, stepLogout } from "src/ui/sharedSteps/test.step";
import { ITestCartItem, ITestData } from "src/ui/@types/testData";

const testData: ITestData = {
  user: {
    name: "standard_user",
    password: process.env.USER_PASSWORD!
  },
  cartItems: [
    {
      name: "Sauce Labs Bike Light",
      price: "$9.99",
      quantity: 1,
      id: "sauce-labs-bike-light"
    },
    {
      name: "Sauce Labs Onesie",
      price: "$7.99",
      quantity: 1,
      id: "sauce-labs-onesie"
    }
  ]
};

const additionalItem: ITestCartItem = {
  name: "Sauce Labs Fleece Jacket", 
  price: "$49.99", 
  quantity: 1, 
  id: "sauce-labs-fleece-jacket"
};

test("Cart should persist between user sessions", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await stepLogin(loginPage, testData.user);

  const mainPage = new MainPage(page);
  await stepAddItemsToCart(mainPage, testData.cartItems)

  // Add/remove extra item from cart to also test removal functionality
  await stepAddItemsToCart(mainPage, [additionalItem]);

  await test.step(`remove ${additionalItem.name} from cart`, async () => {
    await mainPage.removeItemFromCart(additionalItem.id);
  });

  await stepLogout(mainPage, testData.user.name)

  await stepLogin(loginPage, testData.user);

  const cartPage = new CartPage(page);
  await test.step("cart items should persist on logging back in", async () => {
    await cartPage.goto();

    const currentCartItems = await cartPage.getCartItemNames();
    expect(currentCartItems).toEqual(testData.cartItems.map(item => item.name));
  });
});