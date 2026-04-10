import mongoose from 'mongoose';

const locationSchema = new mongoose.Schema({
  tukTuk: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'TukTuk',
    required: true
  },
  latitude: Number,
  longitude: Number,
  speed: Number,
  recordedAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('LocationLog', locationSchema);