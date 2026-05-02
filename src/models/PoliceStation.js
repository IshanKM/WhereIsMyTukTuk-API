import mongoose from "mongoose";

const policeStationSchema = new mongoose.Schema({
  name: String,
  district: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "District",
  },
});

export default mongoose.model("PoliceStation", policeStationSchema);