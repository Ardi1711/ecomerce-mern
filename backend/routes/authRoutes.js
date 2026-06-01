

const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { verifyToken } = require('../middleware/authMiddleware');

//Regjistrim i perdoruesit

router.post('/register', authController.register);


router.post('/login', authController.login);


router.get('/profile', verifyToken, authController.getProfile);

module.exports = router;
