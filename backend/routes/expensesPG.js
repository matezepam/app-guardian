const router = require('express').Router();
const auth = require('../middleware/auth');
const { insertExpenseStats } = require('../models/ExpensePG');

router.post('/save-stats', auth, async (req, res) => {
  try {
    const { water_total, light_total, plastic_total } = req.body;
    const month = new Date().toLocaleString('default', { month: 'long', year: 'numeric' });
    const report = await insertExpenseStats({
      userId: req.user._id,
      month,
      water_total,
      light_total,
      plastic_total
    });
    res.json({ data: report });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: { message: err.message } });
  }
});

module.exports = router;
