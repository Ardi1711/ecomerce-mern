

const mongoose = require('mongoose');

// Struktura e produktit ne mong db
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Emri i produktit eshte i detyrueshem'],
      trim: true
    },
    description: {
      type: String,
      required: [true, 'Pershkrimi eshte i detyrueshem']
    },
    price: {
      type: Number,
      required: [true, 'Çmimi eshte i detyrueshem'],
      min: 0
    },
    category: {
      type: String,
      required: [true, 'Kategoria eshte e detyrueshme']
    },
    stock: {
      type: Number,
      required: [true, 'Stoku eshte i detyrueshem'],
      min: 0,
      default: 0
    },
    image: {
      type: String,
      default: 'https://via.placeholder.com/300' // Slika per demo
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5
    },
    reviews: [
      {
        userId: mongoose.Schema.Types.ObjectId,
        userName: String,
        comment: String,
        rating: Number,
        createdAt: { type: Date, default: Date.now }
      }
    ],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  {
    timestamps: true 
  }
);

module.exports = mongoose.model('Product', productSchema);
