const express = require("express");
const userController = require("../controller/userController");
const authController = require("../controller/authController");

const router = express.Router();

router.route("/signup").post(authController.signup);
router.route("/login").post(authController.login);
router.route("/logout").get(authController.logOut);

router.post("/forgotPassword", authController.forgotPassword);
router.patch("/resetPassword/:token", authController.resetPassword);

router.use(authController.protect);

router.patch("/updatePassword", authController.updatePassword);
router.post("/:movSlug/watchlist/add", userController.addToWatchList);
router.post("/:movSlug/watchlist/remove", userController.removeFromWatchList);

router.route("/my-stats").get(userController.getMyStats);

router
  .route("/updateMe")
  .patch(
    userController.uploadImage,
    userController.resizeUserImage,
    userController.updateMe
  );
router.route("/deleteMe").patch(userController.deleteMe);
router.get("/me", userController.getMe, userController.getAUser);

router.use(authController.restrictTo("admin"));

router.route("/").get(userController.getAllUsers);
//   .post(userController.createUser);

router
  .route("/:id")
  .get(userController.getAUser)
  .patch(userController.updateAUser)
  .delete(userController.deleteAUser);

module.exports = router;
