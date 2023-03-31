import { Locator, Page } from "@playwright/test";
import { BasePage } from "src/ui/pages/BasePage";

// TODO: Everything
export class CartPage extends BasePage {
  url = "/cart.html"

  readonly btnCheckout: Locator;
  readonly btnContinueShopping: Locator;

  constructor(page: Page) {
    super(page);
    this.btnCheckout = this.page.locator("#checkout")
    this.btnContinueShopping = this.page.locator("#continue-shopping")
  }

  async checkout() {
    await this.btnCheckout.click();
  }

  async continueShopping() {
    await this.btnContinueShopping.click();
  }
}
