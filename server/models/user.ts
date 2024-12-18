import mongoose from "mongoose";

const socialMediaSchema = new mongoose.Schema({
  media: {
    type: String,
    required: false,
  },
  link: {
    type: String,
    required: false,
  },
});

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    pictureProfile: {
      type: String,
      required: false,
    },
    followers: {
      type: Number,
      default: 0,
    },
    likedArtists: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    likedMusics: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Catalog",
      },
    ],
    likedCatalogs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Catalog",
      },
    ],
    likedGenres: [
      {
        type: String,
      },
    ],
    likedPlaylists: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Playlist",
      },
    ],
    role: {
      type: String,
      enum: ["USER", "ARTIST"],
      required: true,
      index: true,
      default: "USER",
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    socialMedia: [socialMediaSchema],
    genre: {
      type: String,
      index: true,
    },
    artistName: {
      type: String,
      index: true,
      default: name,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
