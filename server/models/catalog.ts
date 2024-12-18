import mongoose from "mongoose";

const musicSchema = new mongoose.Schema({
  id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  dateCreation: {
    type: Date,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  genres: {
    type: [String],
    required: true,
  },
});

const catalogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      index: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Artist",
      required: true,
    },
    dateCreation: {
      type: Date,
      default: Date.now,
    },
    thumbnail: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ["SINGLE", "ALBUM", "EP"],
      required: true,
    },
    musics: {
      type: [musicSchema],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Catalog", catalogSchema);
