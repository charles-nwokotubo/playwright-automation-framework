import { Locator, Page } from "@playwright/test";
import { BasePage } from "src/ui/pages/BasePage";

export class MainPage extends BasePage {
  url = "/inventory.html"

  readonly btnMenu: Locator;
  readonly btnLogOut: Locator;

  constructor(page: Page) {
    super(page);

    this.btnMenu = this.page.locator("#react-burger-menu-btn");
    this.btnLogOut = this.page.locator("#logout_sidebar_link");
  }

  async addItemToCart(itemId: string) {
    const btnAddToCart = this.page.locator(`#add-to-cart-${itemId}`);
    await btnAddToCart.click();
  }

  async removeItemFromCart(itemId: string) {
    const btnRemoveFromCart = this.page.locator(`#remove-${itemId}`)
    await btnRemoveFromCart.click();
  }

  async logout() {
    await this.btnMenu.click();
    await this.btnLogOut.click();
  }
}
