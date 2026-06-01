
const generateToken = (userId) => {
  const jwt = require('jsonwebtoken');
  
  
  return jwt.sign(
    { userId }, 
    process.env.JWT_SECRET || 'secret_key_default', 
    { expiresIn: process.env.JWT_EXPIRE  } 
  );
};

module.exports = { generateToken };
