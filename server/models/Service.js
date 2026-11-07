import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema(
  {
    serviceCode: {
      type: String,
      unique: true,
      trim: true,
    },
    carId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Car',
      required: [true, 'Car reference is required'],
    },
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Customer',
      required: [true, 'Customer reference is required'],
    },
    serviceDate: {
      type: Date,
      required: [true, 'Service date is required'],
      default: Date.now,
    },
    serviceType: {
      type: String,
      required: [true, 'Service type is required'],
      enum: [
        'General Service',
        'Oil Service',
        'AC Service',
        'Brake Service',
        'Engine Service',
        'Major Service',
        'Other',
      ],
      default: 'General Service',
    },
    currentKm: {
      type: Number,
      required: [true, 'Current KM reading is required'],
      min: 0,
    },
    status: {
      type: String,
      required: true,
      enum: ['Pending', 'In Service', 'Completed', 'Delivered'],
      default: 'Pending',
    },
    expectedDeliveryDate: {
      type: Date,
    },
    workDescription: {
      type: String,
      default: '',
    },
    parts: {
      type: String,
      default: '',
    },
    labourCost: {
      type: Number,
      default: 0,
      min: 0,
    },
    partsCost: {
      type: Number,
      default: 0,
      min: 0,
    },
    totalCost: {
      type: Number,
      default: 0,
      min: 0,
    },
    notes: {
      type: String,
      default: '',
    },
  },
  { timestamps: true }
);

// Auto generate serviceCode if not present
serviceSchema.pre('save', async function (next) {
  if (!this.serviceCode) {
    const count = await mongoose.model('Service').countDocuments();
    const formattedCount = String(count + 1).padStart(4, '0');
    this.serviceCode = `SRV-${formattedCount}`;
  }
  next();
});

export default mongoose.model('Service', serviceSchema);
