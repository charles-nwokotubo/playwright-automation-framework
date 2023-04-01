import { test, expect } from "@playwright/test";
import { LoginPage } from "src/ui/pages/Login.page";
import { MainPage } from "src/ui/pages/Main.page";
import { stepLogin } from "src/ui/sharedSteps/test.step";
import { ITestData } from "src/ui/@types/testData";

const testData: ITestData = {
  user: {
    name: "standard_user",
    password: process.env.USER_PASSWORD!
  }
}

test("Logged out user should not be able to log in with back button", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await stepLogin(loginPage, testData.user);

  const mainPage = new MainPage(page);
  await test.step(`log out from ${testData.user.name}`, async () => {
    await mainPage.logout();
  });

  await test.step("click back button", async () => {
    await page.goBack();

    const errorMsg = await loginPage.errorMsg.innerText();
    expect(errorMsg).toBeTruthy();
  });
});