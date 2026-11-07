import mongoose from 'mongoose';

const carSchema = new mongoose.Schema(
  {
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Customer',
      required: [true, 'Customer reference is required'],
    },
    carName: {
      type: String,
      required: [true, 'Car brand/name is required'],
      trim: true,
    },
    model: {
      type: String,
      required: [true, 'Model / Variant is required'],
      trim: true,
    },
    registrationNumber: {
      type: String,
      required: [true, 'Registration number is required'],
      unique: true,
      uppercase: true,
      trim: true,
    },
    chassisNumber: {
      type: String,
      trim: true,
      default: '',
    },
    currentKm: {
      type: Number,
      required: [true, 'Current KM is required'],
      default: 0,
      min: 0,
    },
    phone: {
      type: String,
      trim: true,
      default: '',
    },
  },
  { timestamps: true }
);

export default mongoose.model('Car', carSchema);
