const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoute = require('./routes/auth');
const expensesRoute = require('./routes/expenses');
require('dotenv').config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/auth', authRoute);
app.use('/api/expenses', expensesRoute);

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/Guardian')
  .then(() => console.log('Connected to MongoDB (Guardian)'))
  .catch(err => console.error('Could not connect to MongoDB', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
