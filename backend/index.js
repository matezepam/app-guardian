const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoute = require('./routes/auth');
const expensesRoute = require('./routes/expenses');
const userRoute = require('./routes/user'); 
require('dotenv').config();

const app = express();

app.use(express.json());
app.use(cors());
app.use('/uploads/avatars', express.static('uploads/avatars')); 

app.use('/api/auth', authRoute);
app.use('/api/expenses', expensesRoute);
app.use('/api/users', userRoute); 

mongoose.connect('mongodb://localhost:27017/Guardian')
  .then(() => console.log('Connected to MongoDB (Guardian)'))
  .catch(err => console.error('Could not connect to MongoDB', err));

const PORT = process.env.PORT || 5000;
app.get('/api/test', (req, res) => res.json({ message: 'Backend OK' }));
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
