const AppError = require("../utils/appError");

const handleCastError = (err) => {
  const message = `Invalid ${err.path}:${err.value}`;
  return new AppError(message, 400);
};

const handleDupKeyError = (err) => {
  // const value = err.errmsg.match;
  if (err.keyValue.user && err.keyValue.movie) {
    const revMessage = "You only review a movie once!";
    return new AppError(revMessage, 400);
  }

  const message = `${
    err.keyValue.email ? "Email" : "Name"
  } already exist! Please try other one.`;
  return new AppError(message, 400);
};

const handleValidationError = (err) => {
  // console.log(err);
  const errors = Object.values(err.errors).map((el) => el.message);

  const message = `Oops! ${errors.join(". ")}`;
  return new AppError(message, 400);
};

const handlejwtError = () =>
  new AppError("Invalid token error.Please log in again!", 401);

const handlejwtExpiredError = () =>
  new AppError("Your token has been expired!Please login again", 401);

const devError = (req, err, res) => {
  //API
  if (req.originalUrl.startsWith("/api")) {
    res.status(err.statusCode).json({
      status: err.status,
      error: err,
      message: err.message,
      stack: err.stack,
    });
    //Rendered page
  } else {
    res.status(err.statusCode).render("error", {
      title: "Something went wrong!",
      mssg: err.message,
    });
  }
};

const prodError = (req, error, res) => {
  if (req.originalUrl.startsWith("/api")) {
    if (error.isOperational) {
      return res.status(error.statusCode).json({
        status: error.status,
        message: error.message,
      });
    } else {
      //1) Log error
      console.error("ERROR💥", error);
      //Programming or other error that dont leak details to te clients
      //2) send genric message
      return res.status(500).json({
        status: "fail",
        message: "Oops!something went wrong",
      });
    }
  } else {
    //B) RENDERED WEBSITE
    if (error.isOperational) {
      return res.status(error.statusCode).render("error", {
        title: "Something went wrong!",
        mssg: error.message,
      });
    } else {
      //1) Log error
      console.error("ERROR💥", error);

      //Programming or other error that dont leak details to te clients
      //2) send genric message
      return res.status(error.statusCode).render("notFound", {
        title: "Something went wrong!",
        mssg: "Please try again later.",
      });
    }
  }
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "fail";

  if (process.env.NODE_ENV === "development") {
    devError(req, err, res);
  } else if (process.env.NODE_ENV === "production") {
    let error = { ...err };
    if (err.name === "CastError") error = handleCastError(err);
    if (err.code === 11000) error = handleDupKeyError(err);
    if (err.name === "ValidationError") error = handleValidationError(err);
    if (err.name === "JsonWebTokenError") error = handlejwtError();
    if (err.name === "TokenExpiredError") error = handlejwtExpiredError();

    prodError(req, error, res);
  }
};
