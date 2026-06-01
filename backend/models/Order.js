

const mongoose = require('mongoose');


const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    items: [
      {
        productId: mongoose.Schema.Types.ObjectId,
        productName: String,
        price: Number,
        quantity: Number,
        subtotal: Number
      }
    ],
    totalAmount: {
      type: Number,
      required: true,
      min: 0
    },
    status: {
      type: String,
      enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
      default: 'pending'
    },
    shippingAddress: {
      street: String,
      city: String,
      country: String,
      zipCode: String
    },
    paymentStatus: {
      type: String,
      enum: ['pending', 'completed', 'failed'],
      default: 'pending'
    }
  },
  {
    timestamps: true 
  }
);

module.exports = mongoose.model('Order', orderSchema);
