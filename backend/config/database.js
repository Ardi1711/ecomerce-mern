const mongoose = require('mongoose');


const connectDB = async () => {
  try {
    
    const mongoURI = process.env.MONGODB_URI 
    
    await mongoose.connect(mongoURI);
    console.log('✅ MongoDB u lidh me sukses!');
  } catch (error) {
    console.error('❌ Lidhja me MongoDB deshtoi:', error.message);
   
    process.exit(1);
  }
};

module.exports = connectDB;
