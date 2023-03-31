import { Locator, Page } from "@playwright/test";
import { BasePage } from "src/ui/pages/BasePage";

export class MainPage extends BasePage {
  url = "/inventory.html"

  constructor(page: Page) {
    super(page);
  }

  async addItemToCart(itemId: string) {
    const btnAddToCart = this.page.locator(`#add-to-cart-${itemId}`);
    await btnAddToCart.click();
  }

  async removeItemFromCart(itemId: string) {
    const btnRemoveFromCart = this.page.locator(`#remove-${itemId}`)
    await btnRemoveFromCart.click();
  }
}
