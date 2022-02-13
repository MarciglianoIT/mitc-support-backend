const admin = require("firebase-admin");
const axios = require("axios");
const firebase = require("../firebase/firebase");

exports.mockRequest = (authHeader, sessionData, body) => ({
  get(name) {
    if (name === "authorization") return authHeader;
    return null;
  },
  session: { data: sessionData },
  body,
});

exports.mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.send = jest.fn().mockReturnValue(res);
  return res;
};

exports.getFirebaseToken = async () => {
  const customToken = await admin.auth().createCustomToken("test-uid");
  const url = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyCustomToken?key=${process.env.NODE_APP_FIREBASE_KEY}`;
  const firebaseResponse = await axios.post(url, {
    token: customToken,
    returnSecureToken: true,
  });
  return firebaseResponse.data.idToken;
};
