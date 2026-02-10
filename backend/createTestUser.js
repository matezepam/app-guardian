const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { Pool } = require('pg');
const User = require('./models/User');
require('dotenv').config();

const pool = new Pool({
  user: process.env.PG_USER || 'postgres',
  host: process.env.PG_HOST || 'localhost',
  database: process.env.PG_DATABASE || 'GUARDIAN', 
  password: process.env.PG_PASSWORD || 'postgres',
  port: process.env.PG_PORT || 5432,
});

async function main() {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/Guardian');
    console.log('MongoDB connected');

    const randomSuffix = Math.floor(Math.random() * 1000);
    const username = `testuser${randomSuffix}`;
    const email = `testuser${randomSuffix}@example.com`;
    const password = '12345678';
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({
      username,
      email,
      password: hashedPassword,
      firstName: 'Test',
      lastName: 'User',
      phone: '0999999999',
      country: 'Ecuador',
    });

    const savedUser = await user.save();
    console.log('MongoDB user created:', savedUser.username);

    const expenses = [
      { type: 'water', amount: 10, date: new Date(), userId: savedUser._id },
      { type: 'light', amount: 20, date: new Date(), userId: savedUser._id },
      { type: 'plastic', amount: 30, date: new Date(), userId: savedUser._id },
      { type: 'water', amount: 5, date: new Date(), userId: savedUser._id },
    ];

    await User.db.collection('expenses').insertMany(expenses);
    console.log('MongoDB expenses inserted');

    const month = new Date().toISOString().slice(0, 7); // YYYY-MM
    const water_total = expenses.filter(e => e.type === 'water').reduce((sum, e) => sum + e.amount, 0);
    const light_total = expenses.filter(e => e.type === 'light').reduce((sum, e) => sum + e.amount, 0);
    const plastic_total = expenses.filter(e => e.type === 'plastic').reduce((sum, e) => sum + e.amount, 0);

    await pool.query(
      `INSERT INTO expense_reports (user_id, month, water_total, light_total, plastic_total)
       VALUES ($1, $2, $3, $4, $5)`,
      [savedUser._id.toString(), month, water_total, light_total, plastic_total]
    );
    console.log('PostgreSQL report inserted');

    await mongoose.disconnect();
    await pool.end();
    console.log('Done');
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

main();
