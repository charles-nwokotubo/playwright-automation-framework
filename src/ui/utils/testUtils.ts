/**
 * Utility functions for tests.
 */
import { Locator } from "@playwright/test";

export function generate_id(name: string) {
  return name.split(" ").map(word => word.toLowerCase()).join('-');
}

export async function buildElementsArray(locator: Locator) {
  const arr = [];
  const count = await locator.count();
  for (let index = 0; index < count; index += 1) {
    arr.push(locator.nth(index));
  }
  return arr;
}

export function camelToSpaceLowerCase(camel: string): string {
  return camel.replace(/[A-Z]/g, letter => ` ${letter.toLowerCase()}`).trim();
}

