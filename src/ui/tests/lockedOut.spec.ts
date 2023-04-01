import { test, expect } from "@playwright/test";
import { LoginPage } from "src/ui/pages/Login.page";
import { stepLogin } from "src/ui/sharedSteps/test.step";
import { ITestData } from "src/ui/@types/testData";

const testData: ITestData = {
  user: {
    name: "locked_out_user",
    password: process.env.USER_PASSWORD!
  }
}

test("Locked out user is denied access", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await stepLogin(loginPage, testData.user);

  const errorMsg = await loginPage.errorMsg.innerText();
  expect(errorMsg).toBeTruthy();
});