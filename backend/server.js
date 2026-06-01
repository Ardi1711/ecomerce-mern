

const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/database');


connectDB();

const app = express();

app.use(cors()); // Lejon kerkesa nga frontend
app.use(express.json()); 


app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/orders', require('./routes/orderRoutes'));
app.use('/api/users', require('./routes/userRoutes'));


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Diçka ka shkuar keq ne server'
  });
});


const PORT = process.env.PORT ;
app.listen(PORT, () => {
  console.log(`✅ Serveri po degjon ne porten ${PORT}`);
  console.log(`🌐 URL-i: http://localhost:${PORT}`);
});

module.exports = app;
