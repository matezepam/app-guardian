const mongoose = require('mongoose');

const ExpenseSchema = new mongoose.Schema({
  type: { type: String, enum: ['water', 'light', 'plastic'], required: true },
  amount: { type: Number, required: true },
  date: { type: Date, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

module.exports = mongoose.model('Expense', ExpenseSchema);
