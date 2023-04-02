import { test, expect } from "@playwright/test";

const randomId = Math.floor(Math.random() * 1000000);
const testCases = [
  {
    petId: randomId
    ,
    body: {
      id: randomId,
      category: { id: randomId, name: 'string' },
      name: 'testPet',
      photoUrls: [ 'string' ],
      tags: [ { id: randomId, name: 'string' } ],
      status: 'available'
    }
  }
];

for (const testCase of testCases) {
  test("POST /v2/pet", async ({ request }) => {
    const response = await request.post("/v2/pet", {data: testCase.body});
    expect(response.ok()).toBeTruthy();
    expect(await response.json()).toEqual(testCase.body);
  });
}