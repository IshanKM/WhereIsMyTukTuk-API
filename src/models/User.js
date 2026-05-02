import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: String,

    email: {
      type: String,
      unique: true,
    },

    password: String,

    role: {
      type: String,
      enum: ["administrator", "police", "operator"],
      default: "operator",
    },

    policeStation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PoliceStation",
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);