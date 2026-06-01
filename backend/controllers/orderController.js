const Order = require('../models/Order');
const Product = require('../models/Product');


exports.createOrder = async (req, res) => {
  try {
    const { items, shippingAddress } = req.body;

    
    if (!items || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Shporta eshte boshe!'
      });
    }

    
    let totalAmount = 0;
    const orderItems = [];

   
    for (const item of items) {
      const product = await Product.findById(item.productId);

      if (!product) {
        return res.status(404).json({
          success: false,
          message: `Produkti ${item.productId} nuk u gjet!`
        });
      }

     
      if (product.stock < item.quantity) {
        return res.status(400).json({
          success: false,
          message: `Nuk ka mjaftueshem stoku per ${product.name}`
        });
      }

      const subtotal = product.price * item.quantity;
      totalAmount += subtotal;

      orderItems.push({
        productId: product._id,
        productName: product.name,
        price: product.price,
        quantity: item.quantity,
        subtotal
      });
    }

   
    const order = new Order({
      userId: req.userId,
      items: orderItems,
      totalAmount,
      shippingAddress
    });

    await order.save();

    
    for (const item of items) {
      await Product.findByIdAndUpdate(
        item.productId,
        { $inc: { stock: -item.quantity } }
      );
    }

    res.status(201).json({
      success: true,
      message: 'Porosi u krijua me sukses!',
      order
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Krijimi i porosite deshtoi: ' + error.message
    });
  }
};


exports.getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.userId });

    res.status(200).json({
      success: true,
      count: orders.length,
      orders
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Marrja e porosive deshtoi: ' + error.message
    });
  }
};


exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Porosi nuk u gjet!'
      });
    }

   
    if (order.userId.toString() !== req.userId) {
      return res.status(403).json({
        success: false,
        message: 'Nuk ke qasje ne kete porosi!'
      });
    }

    res.status(200).json({
      success: true,
      order
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Marrja e porosite deshtoi: ' + error.message
    });
  }
};


exports.updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;

    
    const validStatuses = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Status i pavlefshem!'
      });
    }

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Porosi nuk u gjet!'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Statusi u perditesua me sukses!',
      order
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Perditesimi i statusit deshtoi: ' + error.message
    });
  }
};
