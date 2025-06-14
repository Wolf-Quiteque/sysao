import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  mobilePhone: { type: String, required: true },
  password: { type: String, required: true },
  payments: [{
    id: String, // ID do pagamento do Gatey
    license: Number, // Quantidade de licenças
    date: { type: Date, default: Date.now }
  }]
});

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

export default mongoose.models.User || mongoose.model('User', userSchema);
