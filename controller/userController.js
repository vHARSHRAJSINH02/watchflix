const multer = require("multer");
const sharp = require("sharp");

const User = require("../models/userModel");
const Review = require("../models/reviewModel");
const Movie = require("../models/movieModel");
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

exports.resizeUserImage = (req, res, next) => {
  if (!req.file) return next();

  req.file.filename = `user-${req.user.name}-${Date.now()}.jpeg`;

  sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(`public/img/users/${req.file.filename}`);

  next();
};

exports.uploadImage = upload.single("photo");

exports.getAllUsers = controllerFactory.getAll(User);
exports.getAUser = controllerFactory.getA(User, "watchList");

exports.updateAUser = controllerFactory.updateA(User);
exports.deleteAUser = controllerFactory.deleteA(User);

exports.getMe = (req, res, next) => {
  req.params.id = req.user.id;
  next();
};

exports.deleteMe = catchAsync(async (req, res, next) => {
  const userId = req.user.id;

  //Deleting the review given by this user
  const givenReview = await Review.findOne({ user: userId });
  if (givenReview) {
    await Review.findByIdAndDelete(givenReview.id);
  }

  await User.findByIdAndUpdate(userId, { active: false });

  res.cookie("jwt", "Expires", {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });

  res.status(204).json({
    status: "success ",
  });
});

exports.addToWatchList = catchAsync(async (req, res, next) => {
  const movSlug = req.params.movSlug;
  const userId = req.user.id;

  const mov = await Movie.findOne({ slug: movSlug });
  const user = await User.findById(userId);

  if (user.watchList.includes(mov.id)) {
    return next(new AppError("Movie already in the watchlist!", 400));
  }

  user.watchList.push(mov.id);
  user.save({ validateBeforeSave: false });

  res.status(200).json({
    status: "success",
    watchList: user.watchList,
  });
});

exports.removeFromWatchList = catchAsync(async (req, res, next) => {
  const movSlug = req.params.movSlug;
  const userId = req.user.id;

  const mov = await Movie.findOne({ slug: movSlug });
  const user = await User.findById(userId);

  if (user.watchList.length == 0) {
    return next(
      new AppError(
        "Your watchList is empty!Please add movies to watch later",
        404
      )
    );
  }

  var index = user.watchList.indexOf(mov.id);

  if (index > -1) {
    user.watchList.splice(index, 1);
    user.save({ validateBeforeSave: false });
  }

  res.status(200).json({
    status: "success",
    watchList: user.watchList,
  });
});

exports.updateMe = catchAsync(async (req, res, next) => {
  const userId = req.user.id;

  const Updateduser = await User.findByIdAndUpdate(
    userId,
    {
      name: req.body.name,
      email: req.body.email,
      photo: req.file?.filename,
    },
    {
      new: true,
      runValidators: false,
    }
  );

  res.status(200).json({
    status: "success",
    data: Updateduser,
  });
});

exports.getMyStats = catchAsync(async (req, res, next) => {
  let userId = req.user.id;
  let resp = {};

  const likes = Movie.find({ likes: userId });
  const dislikes = Movie.find({ dislikes: userId });
  const reviews = Review.find({ user: userId });

  let data = await Promise.all([likes, dislikes, reviews]);

  resp.likes = data[0].length;
  resp.dislikes = data[1].length;
  resp.reviews = data[2].length;

  res.status(200).json({
    status: "success",
    resp,
  });
});
