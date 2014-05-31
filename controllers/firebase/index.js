const admin = require("firebase-admin");

exports.getUserData = (req, res, next) => {
    admin
      .auth()
      .listUsers()
      .then((v) => {
        v.users.map((u) => {
          console.log(u.email);
        });
      });
    res
      .status(200)
      .send({
        user: {
          firstName: "Manuel",
          lastName: "Marcigliano",
          address: "# 17 KN 54 Street",
        },
      });
  };