// 👤 RURAT E PeRDORUESIT

const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/authMiddleware');
const User = require('../models/User');


// GET /api/users
router.get('/', verifyToken, async (req, res) => {
  try {
  
 
    const users = await User.find().select('-password');

    res.status(200).json({
      success: true,
      count: users.length,
      users
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Marrja e perdoruesve deshtoi: ' + error.message
    });
  }
});

module.exports = router;
