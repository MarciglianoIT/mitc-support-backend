const express = require("express");
const userController = require("../controllers/firebase");
const middleware = require("../middleware");

const router = express.Router();

router.get("/get-user-data", middleware.isUser, userController.getUserData);

module.exports = router;