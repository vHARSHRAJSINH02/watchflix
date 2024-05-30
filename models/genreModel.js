const mongoose = require("mongoose");
const slugify = require("slugify");

const genreSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A genre must have a name"],
    unique: [true, "Genre name must be different"],
  },

  movies: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Movie",
    },
  ],

  image: {
    type: String,
  },

  createdAt: {
    type: Date,
    default: Date.now(),
  },

  createdAt: { type: Date, default: Date.now() },

  slug: String,
});

genreSchema.pre("save", function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

const genreModel = mongoose.model("Genre", genreSchema);

module.exports = genreModel;
