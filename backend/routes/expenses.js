const router = require('express').Router();
const Expense = require('../models/Expense');
const auth = require('../middleware/auth');

// Get expenses
router.get('/', auth, async (req, res) => {
  try {
    const expenses = await Expense.find({ user: req.user.id }).sort({ date: -1 });
    res.json({ data: expenses });
  } catch (err) {
    res.status(500).json({ error: { message: err.message } });
  }
});

router.post('/', auth, async (req, res) => {
  try {
    const { type, amount, date } = req.body.data || req.body; 

    const expense = new Expense({
      user: req.user.id,
      type,
      amount,
      date
    });

    const savedExpense = await expense.save();
    res.json({ data: savedExpense });
  } catch (err) {
    res.status(500).json({ error: { message: err.message } });
  }
});

module.exports = router;
