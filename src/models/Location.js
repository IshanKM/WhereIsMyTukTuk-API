import mongoose from "mongoose";

const locationSchema = new mongoose.Schema(
  {
    tuktuk: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TukTuk",
      required: true,
    },

    latitude: {
      type: Number,
      required: true,
    },

    longitude: {
      type: Number,
      required: true,
    },

    speed: {
      type: Number,
    },

    recordedAt: {
      type: Date,
      default: Date.now,
    },

    // optional (future improvement)
    district: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "District",
    },

    province: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Province",
    },

    town: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Location", locationSchema);