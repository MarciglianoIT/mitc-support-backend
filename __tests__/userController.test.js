const { createUser, updateUser, deleteUser } = require("../controllers/user");

describe("UserController tests:", () => {
  beforeAll((done) => {
    done();
  });

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
    const { data } = await createUser(mockData);
    await deleteUser(mockData);

    expect(data.id).toEqual(mockData.id);
    expect(data.email).toEqual(mockData.email);
    expect(data.provider).toEqual(mockData.provider);
    expect(data.UserDatum.id).toEqual(mockData.UserDatum.id);
    expect(data.UserDatum.firstName).toEqual(mockData.UserDatum.firstName);
    expect(data.UserDatum.lastName).toEqual(mockData.UserDatum.lastName);
    expect(data.UserDatum.companyName).toEqual(mockData.UserDatum.companyName);
  });

  test("Create a user", async () => {
    await createUser(mockData);
    const mock2 = { ...mockData, email: "test@abc.de" };
    const { data } = await updateUser(mock2);
    await deleteUser(mockData);

    expect(data.id).toEqual(mock2.id);
    expect(data.email).toEqual(mock2.email);
    expect(data.provider).toEqual(mock2.provider);
    expect(data.UserDatum.id).toEqual(mock2.UserDatum.id);
    expect(data.UserDatum.firstName).toEqual(mock2.UserDatum.firstName);
    expect(data.UserDatum.lastName).toEqual(mock2.UserDatum.lastName);
    expect(data.UserDatum.companyName).toEqual(mock2.UserDatum.companyName);
  });

  afterAll(done => {
    done()
  })
});
