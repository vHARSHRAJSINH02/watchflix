const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const Movie = require("../models/movieModel");
const Genre = require("../models/genreModel");
const Review = require("../models/reviewModel");
const Livetv = require("../models/livetvModel");
const User = require("../models/userModel");

// exports.getAllMovies = catchAsync(async (req, res) => {
//   //Find all the data
//   const movies = await Movie.find();

//   res.status(200).render("movies", {
//     title: "All movies",
//     movies,
//   });
// });

exports.signUp = (req, res, next) => {
  res.status(200).render("signup", {
    title: "create your account",
  });
};

exports.getLoginForm = (req, res, next) => {
  res.status(200).render("login", {
    title: "Login to your account",
  });
};

exports.getGenres = catchAsync(async (req, res, next) => {
  const genres = await Genre.find();
  const liveChannels = await Livetv.find();

  res.status(200).render("genre", {
    title: "Home",
    genres,
    liveChannels,
  });
});

exports.getGenreMovies = async (req, res, next) => {
  const genName = req.params.name;

  const movies = await Movie.find({ genre: genName }).sort({ addedOn: -1 });

  res.status(200).render("movies", {
    title: `${genName} movies`,
    movies,
  });
};

exports.getMe = (req, res, next) => {
  res.status(200).render("account", {
    title: "My account",
  });
};

exports.forgotPassForm = (req, res, next) => {
  res.status(200).render("forgotpass", {
    title: "Forgot password",
  });
};

exports.resetPassForm = (req, res, next) => {
  res.status(200).render("resetpass", {
    title: "Reset your password",
  });
};

exports.getMovie = catchAsync(async (req, res, next) => {
  const slug = req.params.slug;
  const movie = await Movie.findOne({ slug }).populate("reviews");

  if (!movie) {
    res.status(404).render("notFound", {
      title: `Not found`,
      type: "movies",
    });
  } else {
    res.status(200).render("movie", {
      title: `${movie.name}`,
      movie,
    });
  }
});

exports.getlive = catchAsync(async (req, res, next) => {
  const slug = req.params.slug;
  const channel = await Movie.findOne({ slug }).populate("reviews");

  if (!channel) {
    res.status(404).render("notFound", {
      title: `Coming soon`,
      type: "Channel",
    });
  } else {
    res.status(200).render("livetv", {
      title: `${channel.name}`,
      channel,
    });
  }
});

exports.getWatchList = catchAsync(async (req, res, next) => {
  const userId = req.user.id;

  const user = await User.findById(userId).populate("watchList");

  if (user.watchList.length === 0) {
    res.status(404).render("notFound", {
      title: "My watchlist",
      type: "movies",
    });
  } else {
    res.status(200).render("watchList", {
      title: "My watchlist",
      user,
    });
  }
});

exports.getManageMovie = catchAsync(async (req, res, next) => {
  const movies = await Movie.find();

  res.status(200).render("manageMovie", {
    title: "Manage movies",
    movies,
  });
});

exports.getManageGenre = catchAsync(async (req, res, next) => {
  const genres = await Genre.find();

  res.status(200).render("manageGenre", {
    title: "Manage genres",
    genres,
  });
});

exports.getSearchedMovie = catchAsync(async (req, res, next) => {
  const movName = req.query.name;

  const movie = await Movie.findOne({ slug: movName });

  if (!movie) {
    return next(new AppError("Sorry no movie found !", 404));
  }

  res.status(200).render("searchMov", {
    title: `${movie.name}`,
    movie,
  });
});

exports.deleteMeForm = (req, res, next) => {
  res.status(200).render("deleteMe", {
    title: "Delete your account",
  });
};

exports.manageReviews = catchAsync(async (req, res, next) => {
  const reviews = await Review.find();

  if (reviews.length <= 0) {
    res.status(404).render("notFound");
  }

  res.status(200).render("manageReview", {
    title: "Manage reviews",
    reviews,
  });
});

exports.manageUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();

  if (users.length <= 0) {
    res.status(404).render("notFound");
  }

  res.status(200).render("manageUsers", {
    title: "Manage users",
    users,
  });
});

exports.myActivity = catchAsync(async (req, res, next) => {
  // const likes = await Movie.find({ likes: req.user.id });
  // const dislikes = await Movie.find({ dislikes: req.user.id });

  // const reviews = await Review.find({ user: req.user.id });

  res.status(200).render("myActivity", {
    title: "My activity",
  });
});

exports.allStats = catchAsync(async (req, res, next) => {
  const movies = await Movie.find();
  const users = await User.find();
  const genres = await Genre.find();
  const reviews = await Review.find();

  res.status(200).render("adminStats", {
    title: "My activity",
    movies,
    genres,
    users,
    reviews,
  });
});

exports.addMovie = catchAsync(async (req, res, next) => {
  res.status(200).render("addMovie", {
    title: "Add movie",
  });
});
