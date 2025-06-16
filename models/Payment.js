import mongoose from 'mongoose';

const PaymentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  referenceId: {
    type: Number,
    required: true,
    unique: true,
  },
  amount: {
    type: String, // Store as string to match ProxyPay's amount type
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'paid', 'failed'],
    default: 'pending',
  },
  planId: {
    type: String, // Or ObjectId if plans are also in DB
    required: true,
  },
  license: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Update `updatedAt` field on save
PaymentSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

const Payment = mongoose.models.Payment || mongoose.model('Payment', PaymentSchema);

export default Payment;
