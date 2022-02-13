const admin = require("firebase-admin");
const axios = require("axios");
const firebase = require("../firebase/firebase");

const { isUser } = require("../middleware/");
const {
  mockRequest,
  mockResponse,
  getFirebaseToken,
} = require("../__mocks__/http");

describe("Auth middleware", () => {
  test("should throw an 401 if no authorization header is present", async () => {
    const req = mockRequest();
    const res = mockResponse();
    await isUser(req, res, () => {});
    expect(res.status).toHaveBeenCalledWith(401);
  });

  test("should throw an 401 if no Bearer keyword is passed to the header", async () => {
    const req = mockRequest("afdadfasdf");
    const res = mockResponse();
    await isUser(req, res, () => {});
    expect(res.status).toHaveBeenCalledWith(401);
  });

  test("should throw an 401 if no Bearer keyword is passed to the header", async () => {
    const req = mockRequest("Bearer test");
    const res = mockResponse();
    await isUser(req, res, () => {});
    expect(res.status).toHaveBeenCalledWith(403);
  });
});

describe("IntegrationTest Auth", () => {
  test("should throw set next to true from the generated token", async () => {
    try {
      const req = mockRequest(`Bearer ${await getFirebaseToken()}`);
      
      const res = mockResponse();
      let verified = false;
      await isUser(req, res, () => {
        verified = true;
      });
      expect(verified).toBeTruthy();
    } catch (error) {
      console.log("There is an error: ", error);
      expect(false).toBeTruthy();
    }
  });
});
