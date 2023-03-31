import { Page } from "@playwright/test";

/**
 * Base class for every Page Object
 */
export abstract class BasePage {
  protected readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  protected url = "/";
  protected baseUrl = "https://www.saucedemo.com";

  async goto(params?: { waitUntil?: "networkidle" | "load" | "domcontentloaded" | "commit" }) {
    await this.page.goto(`${this.baseUrl}${this.url}`, {
      waitUntil: params?.waitUntil ? params?.waitUntil : "networkidle",
      timeout: 10_000,
    });
    return this;
  }
}
