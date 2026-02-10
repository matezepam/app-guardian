const router = require('express').Router();
const auth = require('../middleware/auth');
const pool = require('../db/postgres');

router.get('/', auth, require('../controllers/reports.controller').generateReports);

router.post('/save-stats', auth, async (req, res) => {
  try {
    const { userId, waterTotal, lightTotal, plasticTotal, month } = req.body;
    const query = `
      INSERT INTO expense_reports (user_id, month, water_total, light_total, plastic_total)
      VALUES ($1, $2, $3, $4, $5)
      ON CONFLICT (user_id, month) 
      DO UPDATE SET water_total = $3, light_total = $4, plastic_total = $5
    `;
    await pool.query(query, [userId, month, waterTotal, lightTotal, plasticTotal]);
    res.json({ message: 'Stats saved in PG' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
