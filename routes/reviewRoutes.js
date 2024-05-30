const express = require("express");
const authController = require("../controller/authController");
const reviewController = require("../controller/reviewController");

const router = express.Router({ mergeParams: true });

router.use(authController.protect);

router
  .route("/")
  .post(reviewController.autoAddingCred, reviewController.giveReview)
  .get(authController.restrictTo("admin"), reviewController.getAllReviews);

router
  .route("/:id")
  .delete(authController.restrictTo("admin"), reviewController.deleteReview);

module.exports = router;
