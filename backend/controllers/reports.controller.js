const pool = require('../db/postgres');

const generateReports = async (req, res) => {
  try {
    const userId = req.query.user_id || req.user?._id;
    if (!userId) return res.status(400).json({ message: "user_id is required" });

    const query = `
      SELECT 
        user_id,
        SUM(water_total) AS water_total,
        SUM(light_total) AS light_total,
        SUM(plastic_total) AS plastic_total,
        COUNT(*) AS total_reports,
        MAX(created_at) AS last_update
      FROM expense_reports
      WHERE user_id = $1
      GROUP BY user_id
    `;

    const { rows } = await pool.query(query, [userId]);
    res.json({ data: rows.length ? [rows[0]] : [] });
  } catch (err) {
    console.error("Reports error:", err);
    res.status(500).json({ message: 'Error generating reports' });
  }
};

module.exports = { generateReports };
