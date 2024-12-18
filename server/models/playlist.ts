import mongoose from "mongoose";

const musicInPlaylistSchema = new mongoose.Schema({
  musicId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  catalogId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
});

const playlistSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      index: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    playlistThumbnail: {
      type: String,
      required: true,
    },
    musics: {
      type: [musicInPlaylistSchema],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Playlist", playlistSchema);
