import { test, expect } from "@playwright/test";

const body = {
  id: 1,
  category: { id: 1, name: 'string' },
  name: 'doggie',
  photoUrls: [ 'string' ],
  tags: [ { id: 1, name: 'string' } ],
  status: 'available'
};

const testCases = [
  {
    petId: 1,
    expectedBody: body,
    expectedResponse: 200
  },
  {
    petId: -999,
    expectedBody: {
      code: 1,
      type: "error",
      message: "Pet not found"
    },
    expectedResponse: 404
  }
];

const testData = {
  postBody: body,
  testCases: testCases
};


test.beforeAll(async ({ request }) => {
  const response = await request.post("/v2/pet", {data: testData.postBody});
  expect(response.ok()).toBeTruthy();
});

for (const testCase of testData.testCases) {
  test(`GET /v2/pet/${testCase.petId}`, async ({ request }) => {
    const response = await request.get(`/v2/pet/${testCase.petId}`);
    expect(response.status()).toEqual(testCase.expectedResponse);
    expect(await response.json()).toEqual(testCase.expectedBody);
  });
}
