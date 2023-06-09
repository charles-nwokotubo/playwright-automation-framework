
/**
 * Interface types used in tests
 */

export interface ITestData {
  user: ITestUserCredentials;
  cartItems?: ITestCartItem[];
  billingInfo?: ITestBillingInfo;
  confirmationText?: string;
}

export interface ITestUserCredentials {
  name: string;
  password: string;
}

export interface ITestCartItem {
  name: string;
  price: string;
  quantity: number;
  id: string;
}

export interface ITestBillingInfo {
  firstName: string;
  lastName: string;
  postalCode: string;
}
