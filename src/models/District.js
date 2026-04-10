import mongoose from 'mongoose';

const districtSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  province: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Province'
  }
});

export default mongoose.model('District', districtSchema);