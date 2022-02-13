const sinon = require("sinon");

const {
  mockRequest,
  mockResponse,
  getFirebaseToken,
} = require("../__mocks__/http");

const {
  createUser,
  updateUser,
  deleteUser,
  createOrUpdateUserData,
  deleteUserData,
} = require("../controllers/user");
const User = require("../models/user");
const UserData = require("../models/userdata");

describe("UserController Function tests:", () => {
  const mockData = {
    id: "aasv123123vafasf",
    email: "info@marcigliano-it.com",
    provider: null,
    UserDatum: {
      id: "aasv123123vafasf",
      firstName: "Manuel",
      lastName: "Marcigliano",
      companyName: "MARCIGLIANO IT CONSULTING",
      addressCountry: null,
      addressStreet: null,
      addressZip: null,
      addressCity: null,
    },
  };

  test("Create a user", async () => {
    const { status, data } = await createUser(mockData);
    await deleteUser(mockData);

    expect(status).toEqual(200);
    expect(data.id).toEqual(mockData.id);
    expect(data.email).toEqual(mockData.email);
    expect(data.provider).toEqual(mockData.provider);
    expect(data.UserDatum.id).toEqual(mockData.UserDatum.id);
    expect(data.UserDatum.firstName).toEqual(mockData.UserDatum.firstName);
    expect(data.UserDatum.lastName).toEqual(mockData.UserDatum.lastName);
    expect(data.UserDatum.companyName).toEqual(mockData.UserDatum.companyName);
  });

  test("Update a user", async () => {
    await createUser(mockData);
    const mock2 = { ...mockData, email: "test@abc.de" };
    const { status, data } = await updateUser(mock2);
    await deleteUser(mockData);

    expect(status).toEqual(200);
    expect(data.id).toEqual(mock2.id);
    expect(data.email).toEqual(mock2.email);
    expect(data.provider).toEqual(mock2.provider);
    expect(data.UserDatum.id).toEqual(mock2.UserDatum.id);
    expect(data.UserDatum.firstName).toEqual(mock2.UserDatum.firstName);
    expect(data.UserDatum.lastName).toEqual(mock2.UserDatum.lastName);
    expect(data.UserDatum.companyName).toEqual(mock2.UserDatum.companyName);
  });

  test("Wrong validated data", async () => {
    const mockNew = {
      ...mockData,
      UserDatum: { ...mockData.UserDatum, id: "123" },
    };
    const { status, error } = await createUser(mockNew);
    expect(status).toEqual(403);
    expect(error).not.toBeNull();
  });
});

describe("UserController Controllers test", () => {
  const mockData = {
    id: "adsfasdf",
    email: "info@marcigliano-it.com",
    provider: null,
    UserDatum: {
      id: "adsfasdf",
      firstName: "Manuel",
      lastName: "Marcigliano",
      companyName: "MARCIGLIANO IT CONSULTING",
      addressCountry: null,
      addressStreet: null,
      addressZip: null,
      addressCity: null,
    },
  };
  test("Call a user that does not exist", async () => {
    const req = mockRequest(`Bearer ${await getFirebaseToken()}`, {} , mockData);
    const res = mockResponse();

    await deleteUser(mockData);
    await createOrUpdateUserData(req, res, () => {});
    expect(res.status).toHaveBeenCalledWith(200);

  });

  test("Create and then update a user that does not exist", async () => {
    const req = mockRequest(`Bearer ${await getFirebaseToken()}`, {} , mockData);
    const res = mockResponse();

    await deleteUser(mockData);
    await createOrUpdateUserData(req, res, () => {});
    await createOrUpdateUserData(req, res, () => {});
    await deleteUser(mockData);
    expect(res.status).toHaveBeenCalledWith(200);
  });

  test("Delete UserData of a user that does not exist", async () => {
    const req = mockRequest(`Bearer ${await getFirebaseToken()}`, {} , mockData);
    const res = mockResponse();

    await deleteUserData(req, res, () => {});
    expect(res.status).toHaveBeenCalledWith(200);
  });
});
