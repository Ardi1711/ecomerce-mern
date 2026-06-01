

const jwt = require('jsonwebtoken');


const verifyToken = (req, res, next) => {

  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    
    return res.status(401).json({
      success: false,
      message: 'Token nuk u gjet. Duhet te jesh i loguar!'
    });
  }

  try {
   
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET 
    );
    
    
    req.userId = decoded.userId;
    next();
  } catch (error) {
   
    return res.status(401).json({
      success: false,
      message: 'Token nuk eshte i vlefshem ose ka skaduar'
    });
  }
};

module.exports = { verifyToken };
