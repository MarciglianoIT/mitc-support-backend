const { Token } = require("../util/token");

exports.isUser = async (req, res, next) => {
  try {
    console.log(req.get("authorization"));
    const verifyToken = await Token(req.get("authorization"));
    if (verifyToken.isValid) {
      const isVerified = verifyToken.isVerifiedResult;
      if (isVerified) {
        next();
        return;
      }
      return res.status(403).send({ type: "Could not authorize" });
    }
    return res.status(401).send({ message: "Invalid token" });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ type: "Unexpeced error", message: error });
  }
};
