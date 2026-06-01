

const User = require('../models/User');
const { generateToken } = require('../config/jwtConfig');


exports.register = async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;

    
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Ploteso te gjithe fushat!'
      });
    }

   
    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: 'Fjalekalimet nuk perputhen!'
      });
    }

    
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        success: false,
        message: 'Ky email perdoret tashme!'
      });
    }

    
    user = new User({
      name,
      email,
      password
    });

    
    await user.save();

    
    const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      message: 'Regjistrim i suksesshem!',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Regjistrim deshtoi: ' + error.message
    });
  }
};


exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

   
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email dhe fjalekalimi jane te detyrueshem!'
      });
    }

    
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Email ose fjalekalim i pasakte!'
      });
    }

    
    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Email ose fjalekalim i pasakte!'
      });
    }

    
    const token = generateToken(user._id);

    res.status(200).json({
      success: true,
      message: 'Login i suksesshem!',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Login deshtoi: ' + error.message
    });
  }
};

 //Marrja e informacionit 
exports.getProfile = async (req, res) => {
  try {
    
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Perdoruesi nuk u gjet!'
      });
    }

    res.status(200).json({
      success: true,
      user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Marrja e profilit deshtoi: ' + error.message
    });
  }
};
