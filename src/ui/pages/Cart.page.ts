import { Locator, Page } from "@playwright/test";
import { BasePage } from "src/ui/pages/BasePage";
import { buildElementsArray } from "src/ui/utils/testUtils";

export class CartPage extends BasePage {
  url = "/cart.html"

  readonly btnCheckout: Locator;
  readonly btnContinueShopping: Locator;
  readonly cartItemNames: Locator;

  constructor(page: Page) {
    super(page);
    
    this.btnCheckout = this.page.locator("#checkout");
    this.btnContinueShopping = this.page.locator("#continue-shopping");
    this.cartItemNames = this.page.locator(".inventory_item_name");
  }

  async checkout() {
    await this.btnCheckout.click();
  }

  async continueShopping() {
    await this.btnContinueShopping.click();
  }

  async getCartItemNames() {
    const cartItemNames = await Promise.all((await this.cartItemNames.all()).map(async (element) => {
      return await element.innerText();
    }));

    return cartItemNames;
  }
}
