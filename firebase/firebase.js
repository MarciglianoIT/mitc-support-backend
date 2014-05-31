const admin = require("firebase-admin");
require("dotenv").config();

const serviceAccount = JSON.parse(
  Buffer.from(process.env.GOOGLE_CONFIG_BASE64, "base64").toString("ascii")
);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
