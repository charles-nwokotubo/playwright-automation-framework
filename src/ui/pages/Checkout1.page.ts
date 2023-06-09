import { Locator, Page } from "@playwright/test";
import { BasePage } from "src/ui/pages/BasePage";
import { ITestBillingInfo } from "src/ui/@types/testData";

export class Checkout1Page extends BasePage {
  url = "/checkout-step-one.html"

  readonly inputFirstName: Locator;
  readonly inputLastName: Locator;
  readonly inputPostalCode: Locator;
  readonly btnContinue: Locator;
  readonly btnCancel: Locator;
  readonly errorMsg: Locator;

  constructor(page: Page) {
    super(page);

    this.inputFirstName = this.page.locator("#first-name");
    this.inputLastName = this.page.locator("#last-name");
    this.inputPostalCode = this.page.locator("#postal-code");
    this.btnContinue = this.page.locator("#continue");
    this.btnCancel = this.page.locator("#cancel");
    this.errorMsg = this.page.locator("[data-test='error']")
  }

  async fillBillingInfo(info: ITestBillingInfo) {
    await this.inputFirstName.fill(info.firstName);
    await this.inputLastName.fill(info.lastName);
    await this.inputPostalCode.fill(info.postalCode);
  }

  async continue() {
    await this.btnContinue.click();
  }

  async cancel() {
    await this.btnCancel.click();
  }
}
