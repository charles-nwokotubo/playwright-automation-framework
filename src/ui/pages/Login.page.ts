import { Locator, Page } from "@playwright/test";
import { BasePage } from "src/ui/pages/BasePage";

export class LoginPage extends BasePage {
  url = "/"

  readonly inputUserName: Locator;
  readonly inputPassword: Locator;
  readonly btnLogin: Locator;
  readonly errorMsg: Locator;

  constructor(page: Page) {
    super(page);

    this.inputUserName = this.page.locator("#user-name");
    this.inputPassword = this.page.locator("#password");
    this.btnLogin = this.page.locator("#login-button");
    this.errorMsg = this.page.locator("[data-test='error']")
  }

  async login(username: string, password: string) {
    await this.inputUserName.fill(username);
    await this.inputPassword.fill(password);
    await this.btnLogin.click();
  }
}
