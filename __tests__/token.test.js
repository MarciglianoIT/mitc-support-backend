const { Token } = require("../util/token");

describe("Test for Token class", () => {
    test("Token with empty token returns wrong valid", async () => {
        const token = await Token();
        expect(token.isValid).toBeFalsy();
    });

    test("Token with random token returns wrong valid", async () => {
        const token = await Token("asfasdf");
        expect(token.isValid).toBeFalsy();
    });

    test("Token with random string incldung blank string wrong valid", async () => {
        const token = await Token("FirstString asfasdf");
        expect(token.isValid).toBeFalsy();
    });

    test("Token with empty token returns wrong valid", async () => {
        const token = await Token("FirstString asfasdf");
        expect(token.isValid).toBeFalsy();
    });

    test("Token with Bearer start  returns correct valid", async () => {
        const token = await Token("Bearer asfasdf");
        expect(token.isValid).toBeTruthy();
    });

    test("Token with Bearer start  returns correct valid", async () => {
      const token = await Token("Bearer asfasdf");
      expect(token.isVerifiedResult).toBeFalsy();
  });
})