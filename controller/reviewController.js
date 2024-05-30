const Review = require("../models/reviewModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

exports.autoAddingCred = catchAsync(async (req, res, next) => {
  if (!req.body.user) {
    req.body.user = req.user.id;
  }
  if (!req.body.movie) {
    req.body.movie = req.params.id;
  }

  next();
});

exports.giveReview = catchAsync(async (req, res, next) => {
  const newReview = await Review.create({
    review: req.body.review,
    rating: req.body.rating,
    user: req.body.user,
    movie: req.body.movie,
  });

  res.status(200).json({
    status: "success",
    data: newReview,
  });
});

exports.getAllReviews = catchAsync(async (req, res, next) => {
  const reviews = await Review.find();

  if (reviews.length == 0) {
    return next(new AppError("Sorry no reviews found!", 404));
  }

  res.status(200).json({
    status: "success",
    results: reviews.length,
    data: reviews,
  });
});

exports.deleteReview = catchAsync(async (req, res, next) => {
  const revId = req.params.id;

  await Review.findByIdAndDelete(revId);

  res.status(204).json({
    status: "success",
  });
});
