const admin = require("firebase-admin");

const Token = async (token) => {
  const tokenProvided = !token;
  const startsWithBearer = token.split(" ")[0] === "Bearer";
  const extractedToken = token.split(" ")[1];
  const isVerifiedResult = admin
    .auth()
    .verifyIdToken(extractedToken)
    .then((v) => true)
    .catch((c) => false);
  const isValid = startsWithBearer && tokenProvided;

  return {
    isValid,
    tokenProvided,
    startsWithBearer,
    token,
    extractedToken,
    isVerifiedResult,
  };
};

exports.isUser = async (req, res, next) => {
  try {
    const verifyToken = await Token(req.headers.authorization);
    if (verifyToken.isValid) {
      return res.status(401).send({ message: "Invalid token" });
    }

    const isVerified = await verifyToken.isVerifiedResult;
    if (isVerified) {
      return next();
    } else {
      return res.status(403).send({ message: "Could not authorize" });
    }
  } catch (error) {
    return res.status(500).send({ message: "Unexpeced error" });
  }
};
