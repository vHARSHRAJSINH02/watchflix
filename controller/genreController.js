const Genre = require("../models/genreModel");
const Movie = require("../models/movieModel");
const controllerFactory = require("../controller/controllerFactory");
const catchAsync = require("../utils/catchAsync");

exports.createGenre = controllerFactory.create(Genre);

exports.allGenre = controllerFactory.getAll(Genre);

exports.getAGenre = controllerFactory.getA(Genre, {
  path: "movies",
});

exports.updateAGenre = controllerFactory.updateA(Genre);

exports.deleteAGenre = catchAsync(async (req, res, next) => {
  const genName = req.params.name;

  await Genre.findOneAndDelete({ name: genName });

  await Movie.deleteMany({ genre: genName });

  res.status(204).json({
    staus: "success",
  });
});
