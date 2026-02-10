const pool = require('../db/postgres');

async function insertExpenseStats({ userId, month, water_total, light_total, plastic_total }) {
  const query = `
    INSERT INTO expense_reports (user_id, month, water_total, light_total, plastic_total)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *;
  `;
  const values = [userId, month, water_total, light_total, plastic_total];
  const res = await pool.query(query, values);
  return res.rows[0];
}

module.exports = { insertExpenseStats };
