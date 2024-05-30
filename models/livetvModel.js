const mongoose = require("mongoose");
const slugify = require("slugify");

const livetvSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A genre must have a name"],
    unique: [true, "Genre name must be different"],
  },

  channels: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Movie",
    },
  ],

  image: {
    type: String,
  },

  createdAt: { type: Date, default: Date.now() },

  slug: String,
});

livetvSchema.pre("save", function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

const livetvModel = mongoose.model("Livetv", livetvSchema);

module.exports = livetvModel;
