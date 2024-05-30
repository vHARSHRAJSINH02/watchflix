const express = require("express");
const genreController = require("../controller/genreController");
// const authController = require("../controller/authController");

const router = express.Router();

router
  .route("/")
  .post(genreController.createGenre)
  .get(genreController.allGenre);

router
  .route("/:name")
  .get(genreController.getAGenre)
  .patch(genreController.updateAGenre)
  .delete(genreController.deleteAGenre);

module.exports = router;
