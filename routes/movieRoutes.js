const express = require("express");
const reviewRouter = require("../routes/reviewRoutes");
const movieController = require("../controller/movieController");
const app = require("../app");
// const authController = require("../controller/authController");

const router = express.Router({ mergeParams: true });

router.use("/:id/reviews", reviewRouter);

router
  .route("/")
  .get(movieController.getAllMovies)
  .post(
    movieController.uploadImage,
    movieController.resizeMovieImage,
    movieController.createMovie
  );

router
  .route("/:id")
  .get(movieController.getAMovie)
  .patch(movieController.updateMovie)
  .delete(movieController.deleteMovie);

router.route("/:slug/like").post(movieController.likeAMovie);
router.route("/:slug/dislike").post(movieController.unlikeAMovie);

module.exports = router;
