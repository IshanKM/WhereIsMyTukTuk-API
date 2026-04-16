import mongoose from 'mongoose';

const tukTukSchema = new mongoose.Schema({
  registrationNumber: {
    type: String,
    required: true,
    unique: true
  },
  driverName: String,
  phone: String,
  district: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'District'
  },
  status: {
    type: String,
    enum: ['active', 'blocked'],
    default: 'active'
  }
}, { timestamps: true });

export default mongoose.model('TukTuk', tukTukSchema);