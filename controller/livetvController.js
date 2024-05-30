const Livetv = require("../models/livetvModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

exports.createChannels = catchAsync(async (req, res, next) => {
  const channel = await Livetv.create(req.body);

  res.status(200).json({
    status: "success",
    data: channel,
  });
});
exports.getAChannel = catchAsync(async (req, res, next) => {
  let slug = req.params.slug;

  const channel = await Livetv.findOne({ slug });

  res.status(200).json({
    status: "success",
    data: channel,
  });
});
exports.getAllChannels = catchAsync(async (req, res, next) => {
  const allChannels = await Livetv.find();

  res.status(200).json({
    status: "success",
    data: allChannels,
  });
});

exports.deleteChannel = catchAsync(async (req, res, next) => {
  let slug = req.params.slug;

  await Livetv.findOneAndDelete({ slug });

  res.status(204).json({
    status: "success",
  });
});

exports.updateAChannel = catchAsync(async (req, res, next) => {
  let slug = req.params.slug;

  const updatedChannel = await Livetv.findOneAndUpdate({ slug }, req.body);

  res.status(200).json({
    status: "success",
    data: updatedChannel,
  });
});
