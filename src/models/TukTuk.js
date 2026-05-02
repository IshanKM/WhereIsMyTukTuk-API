import mongoose from "mongoose";

const tukTukSchema = new mongoose.Schema(
  {
    registrationNumber: {
      type: String,
      required: true,
      unique: true,
    },

    chassisNumber: {
      type: String,
      unique: true,
      sparse: true,
    },
    
    district: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "District",
    },

    model: {
      type: String,
    },

    color: {
      type: String,
    },

    type: {
      type: String,
      enum: ["2-stroke", "4-stroke", "electric"],
    },

    driver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Driver",
      required: true,
    },

    status: {
      type: String,
      enum: ["active", "inactive", "blocked"],
      default: "active",
    },

    lastKnownLocation: {
      latitude: Number,
      longitude: Number,
      timestamp: Date,
    },
  },
  { timestamps: true }
);

export default mongoose.model("TukTuk", tukTukSchema);