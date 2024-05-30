const mongoose = require("mongoose");
const slugify = require("slugify");

const movieSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "A movie name is required"],
      unique: [true, "Movie name must be different"],
    },

    rating: {
      type: Number,
      required: [true, "A movie rating must be provided"],
      default: 0,
    },

    ImbdRating: {
      type: Number,
    },

    numberRatings: {
      type: Number,
      default: 0,
    },

    image: {
      type: "String",
      required: [true, "A movie image must be provided"],
    },

    url: {
      type: String,
    },

    genre: {
      type: String,
    },

    channel: {
      type: String,
    },

    description: {
      type: String,
      maxLength: [300, "A descrption will be less than 200 characters"],
    },

    slug: String,

    likes: [
      {
        type: mongoose.Types.ObjectId,
        ref: "User",
      },
    ],

    dislikes: [
      {
        type: mongoose.Types.ObjectId,
        ref: "User",
      },
    ],

    addedOn: {
      type: Date,
      default: Date.now(),
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

movieSchema.index({ name: 1 }, { unique: true });
movieSchema.index({ slug: 1 });

//virtual populate
movieSchema.virtual("reviews", {
  ref: "Review",
  foreignField: "movie",
  localField: "_id",
});

movieSchema.pre("save", function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

const movieModel = mongoose.model("Movie", movieSchema);

module.exports = movieModel;
