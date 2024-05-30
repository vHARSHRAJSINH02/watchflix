const express = require("express");
const viewController = require("../controller/viewController");
const authController = require("../controller/authController");

const router = express.Router();

// router.use(viewController.alerts);

router.get("/signup", viewController.signUp);
router.get("/login", viewController.getLoginForm);
router.get("/forgot-password", viewController.forgotPassForm);
router.get("/reset-password", viewController.resetPassForm);

router.use(authController.isLoggedIn);

router.get("/genre/:name", viewController.getGenreMovies);
router.get("/", viewController.getGenres);

router.get("/genre/:genre/:slug", viewController.getMovie);
router.get("/livetv/:slug", viewController.getlive);

router.get("/account", viewController.getMe);

router.get("/my-watchlist", viewController.getWatchList);
router.get("/manage-movies", viewController.getManageMovie);
router.get("/manage-genre", viewController.getManageGenre);
router.get("/search-movie", viewController.getSearchedMovie);
router.get("/delete-me", viewController.deleteMeForm);
router.get("/manage-reviews", viewController.manageReviews);
router.get("/manage-users", viewController.manageUsers);

router.get("/my-activity", viewController.myActivity);
router.get("/admin-stats", viewController.allStats);
router.get("/add-movie", viewController.addMovie);

// router.get("/home", viewController.getOverview);

module.exports = router;
