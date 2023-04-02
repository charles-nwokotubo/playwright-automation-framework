import { test, expect } from "@playwright/test";

const randomId = Math.floor(Math.random() * 100); 
const body = {
  id: randomId,
  category: { id: randomId, name: 'string' },
  name: 'doggie',
  photoUrls: [ 'string' ],
  tags: [ { id: randomId, name: 'test' } ],
  status: 'available'
};

const testCases = [
  {
    petId: randomId,
    putBody: body,
    expectedBody: body,
    expectedResponse: 200
  }
];

const testData = {
  postBody: {
    id: randomId,
    category: { id: randomId, name: 'string' },
    name: 'doggie',
    photoUrls: [ 'string' ],
    tags: [ { id: randomId, name: 'string' } ],
    status: 'available'
  },
  testCases: testCases
};


test.beforeAll(async ({ request }) => {
  const response = await request.post("/v2/pet", {data: testData.postBody});
  expect(response.ok()).toBeTruthy();
});

for (const testCase of testData.testCases) {
  test("PUT /v2/pet", async ({ request }) => {
    const response = await request.put("/v2/pet", {data: testCase.putBody});
    expect(response.status()).toEqual(testCase.expectedResponse);
    expect(await response.json()).toEqual(testCase.expectedBody);
  });
}
