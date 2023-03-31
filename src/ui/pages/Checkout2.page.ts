import { Locator, Page } from "@playwright/test";
import { BasePage } from "src/ui/pages/BasePage";

export class Checkout2Page extends BasePage {
  url = "/checkout-step-two.html"

  readonly inputFirstName: Locator;
  readonly inputLastName: Locator;
  readonly inputPostalCode: Locator;
  readonly btnFinish: Locator;
  readonly btnCancel: Locator;

  constructor(page: Page) {
    super(page);

    this.btnFinish = this.page.locator("#finish");
    this.btnCancel = this.page.locator("#cancel");
  }

  async finishCheckout() {
    await this.btnFinish.click();
  }

  async cancel() {
    await this.btnCancel.click();
  }
}
