const express = require("express");
const userController = require("../controllers/user");
const middleware = require("../middleware");

const router = express.Router();

router.get("/user-data/:id", userController.getUserData);
router.post(
  "/user-data",
  middleware.isUser,
  userController.createOrUpdateUserData
);
router.delete("/user-data", middleware.isUser, userController.deleteUserData);

module.exports = router;
