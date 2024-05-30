const mongoose = require("mongoose");
const Movie = require("../models/movieModel");

const reviewSchema = new mongoose.Schema({
  review: {
    type: String,
    maxLength: [25, "Review should have less than 25 characters!"],
    minLength: [3, "Review should have more than 5 characters!"],
    required: [true, "Review required!"],
  },

  rating: {
    type: Number,
    max: [5, "Rating must be less than 5"],
    min: [1, "Rating must be greater than 0"],
    required: [true, "Rating  required!"],
  },

  movie: {
    type: mongoose.Types.ObjectId,
    ref: "Movie",
    required: [true, "Review must belong to a movie"],
  },

  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: [true, "Review must belong to a user"],
  },

  createdAt: { type: Date, default: Date.now() },
});

// reviewSchema.index({ user: 1, movie: 1 }, { unique: true });

reviewSchema.pre(/^find/, function (next) {
  this.populate({
    path: "user",
    select: "name email photo",
  }).populate({
    path: "movie",
    select: "name genre",
  });

  next();
});

//for creating review

reviewSchema.statics.clacAverageRating = async function (movId) {
  const stats = await this.aggregate([
    {
      $match: { movie: movId },
    },

    {
      $group: {
        _id: "$movie",
        nRating: { $sum: 1 },
        avgRating: { $avg: "$rating" },
      },
    },
  ]);

  if (stats.length > 0) {
    await Movie.findByIdAndUpdate(movId, {
      rating: stats[0].avgRating.toFixed(1),
      numberRatings: stats[0].nRating,
    });
  } else {
    await Movie.findByIdAndUpdate(movId, {
      rating: 0,
      numberRatings: 0,
    });
  }
};

reviewSchema.post("save", function () {
  this.constructor.clacAverageRating(this.movie);
});

//for updating and deleting review
reviewSchema.pre(/^findOneAnd/, async function (next) {
  this.rev = await this.findOne().clone();
  next();
});

reviewSchema.post(/^findOneAnd/, async function () {
  await this.rev.constructor.clacAverageRating(this.rev.movie._id);
});

const reviewModel = mongoose.model("Review", reviewSchema);

module.exports = reviewModel;
