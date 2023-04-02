import { test, expect } from "@playwright/test";

const testCases = [
  {
    petId: 1,
    expectedBody: {
      id: 1,
      category: { id: 1, name: 'string' },
      name: 'doggie',
      photoUrls: [ 'string' ],
      tags: [ { id: 1, name: 'string' } ],
      status: 'available'
    }
  }
]

// Post pet first with rand int and then get
for (const testCase of testCases) {
  test(`GET /v2/pet${testCase.petId}`, async ({ request }) => {
    const response = await request.get(`/v2/pet/${testCase.petId}`);
    expect(response.ok()).toBeTruthy();
    expect(await response.json()).toEqual(testCase.expectedBody);
  });
}
