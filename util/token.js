const admin = require("firebase-admin");

exports.Token = async (token) => {
  const tokenProvided = () => !token;

  const startsWithBearer = () => token.split(" ")[0] === "Bearer";

  const _validation = () => {
    if (tokenProvided()) {
      return false;
    }
    if (startsWithBearer() === false) {
      return false;
    }
    return true;
  };

  const _verifiedResult = async () => {
    if (isValid === false) {
      return false;
    }
    const extractedToken = token.split(" ")[1];
    try {
      await admin.auth().verifyIdToken(extractedToken);
      return true;
    } catch (c) {
      return false;
    }
  };

  const isValid = _validation();
  const isVerifiedResult = await _verifiedResult();

  return {
    token,
    isValid,
    isVerifiedResult,
  };
};
