const multer = require("multer");
const sharp = require("sharp");

const Movie = require("../models/movieModel");
const Genre = require("../models/genreModel");

const controllerFactory = require("../controller/controllerFactory");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new AppError("Please upload only images.", 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.resizeMovieImage = (req, res, next) => {
  if (!req.file) return next();

  req.file.filename = `movie-${req.user.name}-${Date.now()}.jpeg`;

  sharp(req.file.buffer)
    .resize(1820, 700)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(`public/img/movies/${req.file.filename}`);

  next();
};

exports.uploadImage = upload.single("image");

exports.createMovie = catchAsync(async (req, res, next) => {
  if (!req.body.image) req.body.image = req.file.filename;

  const movie = await Movie.create(req.body);

  const genre = await Genre.findOne({ name: movie.genre });
  genre.movies.push(movie.id);
  await genre.save({ validateBeforeSave: false });

  res.status(200).json({
    status: "success",
    data: movie,
  });
});

exports.getAllMovies = controllerFactory.getAll(Movie);
exports.getAMovie = controllerFactory.getA(Movie, "reviews");

exports.updateMovie = controllerFactory.updateA(Movie);

exports.deleteMovie = catchAsync(async (req, res, next) => {
  const movId = req.params.id;

  await Movie.findByIdAndDelete(movId);

  const genre = await Genre.findOne({ movies: movId });
  var index = genre.movies.indexOf(movId);

  if (index > -1) {
    genre.movies.splice(index, 1);
    await genre.save({ validateBeforeSave: false });
  }

  res.status(204).json({
    staus: "success",
  });
});

exports.likeAMovie = catchAsync(async (req, res, next) => {
  const movName = req.params.slug;
  const userId = req.user.id;

  const movie = await Movie.findOne({ slug: movName });

  if (movie.likes.includes(userId)) {
    return next(new AppError("You only like a movie once!", 400));
  }

  movie.likes.push(userId);
  await movie.save({ validateBeforeSave: false });

  var index = movie.dislikes.indexOf(userId);

  if (index > -1) {
    movie.dislikes.splice(index, 1);
    movie.save({ validateBeforeSave: true });
  }

  res.status(200).json({
    status: "success",
    data: movie,
  });
});

exports.unlikeAMovie = catchAsync(async (req, res, next) => {
  const movName = req.params.slug;
  const userId = req.user.id;

  const movie = await Movie.findOne({ slug: movName });

  if (movie.dislikes.includes(userId)) {
    return next(new AppError("You only dislike a movie once!", 400));
  }

  movie.dislikes.push(userId);
  await movie.save({ validateBeforeSave: false });

  var index = movie.likes.indexOf(userId);

  if (index > -1) {
    movie.likes.splice(index, 1);
    movie.save({ validateBeforeSave: true });
  }

  res.status(200).json({
    status: "success",
    data: movie,
  });
});
