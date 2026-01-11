const mongoose = require("mongoose");

const ConsumptionItemSchema = new mongoose.Schema(
  {
    key: { type: String, required: true },      
    label: { type: String, required: true },    
    quantity: { type: Number, required: true }, 
    unit: { type: String, required: true },    
    factor: { type: Number, default: 1 },       
    subtotal: { type: Number, required: true }, 
  },
  { _id: false }
);

const ExpenseSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  type: {
    type: String,
    enum: ["water", "light", "plastic"],
    required: true,
  },

  amount: {
    type: Number,
    required: true, 
  },

  items: {
    type: [ConsumptionItemSchema],
    default: [],
  },

  meta: {
    source: { type: String, default: "dashboard" },
    notes: { type: String },
  },

  date: {
    type: Date,
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Expense", ExpenseSchema);
