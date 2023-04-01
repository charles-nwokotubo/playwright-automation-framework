import { test, expect } from "@playwright/test";
import { LoginPage } from "src/ui/pages/Login.page";
import { MainPage } from "src/ui/pages/Main.page";
import { stepLogin, stepLogout } from "src/ui/sharedSteps/test.step";
import { ITestData } from "src/ui/@types/testData";

const testData: ITestData = {
  user: {
    name: "standard_user",
    password: process.env.USER_PASSWORD!
  }
};

test("Logged out user should not be able to log in with back button", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await stepLogin(loginPage, testData.user);

  const mainPage = new MainPage(page);
  await stepLogout(mainPage, testData.user.name);

  await test.step("click back button", async () => {
    await page.goBack();
  });

  await test.step("error message should be displayed", async () => {
    const errorMsg = await loginPage.errorMsg.innerText();
    expect(errorMsg).toBeTruthy();
  });
});
