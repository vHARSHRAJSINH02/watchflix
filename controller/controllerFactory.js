const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const ApiFeatures = require("../utils/ApiFeatures");
const Genre = require("../models/genreModel");
const Livetv = require("../models/livetvModel");
const { model } = require("mongoose");

exports.create = (Model) => {
  return catchAsync(async (req, res, next) => {
    const doc = await Model.create(req.body);

    //Pushing movies to the genre automatically
    if (doc.channel) {
      const liveChannel = await Livetv.findOne({ slug: doc.channel });
      liveChannel.channels.push(doc.id);
      await liveChannel.save({ validateBeforeSave: false });
    }

    res.status(200).json({
      status: "success",
      data: doc,
    });
  });
};

exports.getAll = (Model) => {
  return catchAsync(async (req, res, next) => {
    const features = new ApiFeatures(Model.find(), req.query)
      .filter()
      .sort()
      .limitingFields()
      .pagination();
    const doc = await features.query;

    if (doc.length == 0) {
      return next(new AppError(`No data found! Please try again later.`, 404));
    }

    res.status(200).json({
      status: "success",
      results: doc.length,
      data: doc,
    });
  });
};

exports.getA = (Model, popOptions) => {
  return catchAsync(async (req, res, next) => {
    let docId;

    if (req.params.id) {
      docId = req.params.id;
    } else if (req.params.name) {
      docId = req.params.name;
    }

    let doc;

    if (req.params.name) {
      if (popOptions) {
        doc = await Model.findOne({ name: docId }).populate(popOptions);
      } else {
        doc = await Model.findOne({ name: docId });
      }
    } else {
      if (popOptions) {
        doc = await Model.findById(docId).populate(popOptions);
      } else {
        doc = await Model.findById(docId);
      }
    }

    if (!doc) {
      return next(new AppError("No document found with that id!", 404));
    }

    res.status(200).json({
      status: "success",
      data: doc,
    });
  });
};

exports.updateA = (Model) => {
  return catchAsync(async (req, res, next) => {
    let docId;
    if (req.params.name) {
      docId = req.params.name;
    } else if (req.params.id) {
      docId = req.params.id;
    }

    let doc;

    if (req.params.name) {
      doc = await Model.findOneAndUpdate({ name: docId }, req.body);
      await doc.save({ validateBeforeSave: true });
    } else {
      doc = await Model.findByIdAndUpdate(docId, req.body);
    }

    if (!doc) {
      return next(new AppError("No document found with that id!", 404));
    }

    res.status(200).json({
      status: "success",
      data: doc,
    });
  });
};

exports.deleteA = (Model) => {
  return catchAsync(async (req, res, next) => {
    const docId = req.params.id;

    await Model.findByIdAndDelete(docId);

    res.status(204).json({
      status: "success",
    });
  });
};
