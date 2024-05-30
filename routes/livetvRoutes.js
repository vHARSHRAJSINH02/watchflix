const express = require("express");
const livetvController = require("../controller/livetvController");
// const authController = require("../controller/authController");

const router = express.Router();

router
  .route("/")
  .post(livetvController.createChannels)
  .get(livetvController.getAllChannels);

router
  .route("/:slug")
  .get(livetvController.getAChannel)
  .patch(livetvController.updateAChannel)
  .delete(livetvController.updateAChannel);

module.exports = router;
