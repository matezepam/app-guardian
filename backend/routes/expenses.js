const express = require('express');
const router = express.Router();
const Expense = require('../models/Expense');
const auth = require('../middleware/auth');

router.get('/', auth, async (req, res) => {
  try {
    const expenses = await Expense.find({ userId: req.user._id }).sort({ date: -1 });
    res.json({ data: expenses });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: { message: err.message } });
  }
});

router.post('/', auth, async (req, res) => {
  try {
    const { type, amount, date } = req.body.data || req.body;
    if (!type || !amount || !date) return res.status(400).json({ error: { message: 'All fields required' } });

    const expense = new Expense({
      type,
      amount,
      date,
      userId: req.user._id
    });

    const savedExpense = await expense.save();
    res.json({ data: savedExpense });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: { message: err.message } });
  }
});

module.exports = router;
