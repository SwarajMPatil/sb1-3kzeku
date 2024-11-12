import mongoose from 'mongoose';

const AssetSchema = new mongoose.Schema({
  coin: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  purchasePrice: {
    type: Number,
    required: true,
  },
  purchaseDate: {
    type: Date,
    required: true,
  },
});

const PortfolioSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  assets: [AssetSchema],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

export const Portfolio = mongoose.models.Portfolio || mongoose.model('Portfolio', PortfolioSchema);