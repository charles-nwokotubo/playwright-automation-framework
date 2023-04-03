import { test, expect } from "@playwright/test";

const testCases = [
  {
    petId: 9999,
    expectedBody: {
      code: 200,
      type: "unknown",
      message: "9999"
    },
    expectedResponse: 200,
    expectedGetResponse: 404
  },
  {
    petId: -999,
    expectedResponse: 404
  }
];

const testData = {
  postBody: {
    id: 9999,
    category: { id: 9999, name: 'string' },
    name: 'testPet',
    photoUrls: [ 'string' ],
    tags: [ { id: 9999, name: 'string' } ],
    status: 'available'
  },
  testCases: testCases
};

test.beforeAll(async ({ request }) => {
  const response = await request.post("/v2/pet", {data: testData.postBody});
  expect(response.ok()).toBeTruthy();
});

for (const testCase of testData.testCases) {
  test(`DELETE /v2/pet/${testCase.petId}`, async ({ request }) => {
    const response = await request.delete(`/v2/pet/${testCase.petId}`);
    expect(response.status()).toEqual(testCase.expectedResponse);

    if (testCase.expectedBody) {
      expect(await response.json()).toEqual(testCase.expectedBody);
    }
    
    if (testCase.expectedGetResponse) {
      const getResponse = await request.get(`/v2/pet/${testCase.petId}`);
      expect(await getResponse.status()).toEqual(404);
    }
  });
}