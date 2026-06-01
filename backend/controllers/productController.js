

const Product = require('../models/Product');


exports.getAllProducts = async (req, res) => {
  try {
   
    const { category, search } = req.query;
    let filter = {};

   
    if (category) {
      filter.category = category;
    }

    
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    const products = await Product.find(filter);

    res.status(200).json({
      success: true,
      count: products.length,
      products
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Marrja e produkteve deshtoi: ' + error.message
    });
  }
};


exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Produkti nuk u gjet!'
      });
    }

    res.status(200).json({
      success: true,
      product
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Marrja e produktit deshtoi: ' + error.message
    });
  }
};


exports.createProduct = async (req, res) => {
  try {
    const { name, description, price, category, stock, image } = req.body;


    if (!name || !description || !price || !category) {
      return res.status(400).json({
        success: false,
        message: 'Ploteso te gjithe fushat e detyrueshem!'
      });
    }

   
    const product = new Product({
      name,
      description,
      price,
      category,
      stock: stock || 0,
      image: image || 'https://via.placeholder.com/300',
      createdBy: req.userId
    });

    await product.save();

    res.status(201).json({
      success: true,
      message: 'Produkti u krijua me sukses!',
      product
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Krijimi i produktit deshtoi: ' + error.message
    });
  }
};


exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    //  kthe produktin e ri
    const product = await Product.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true
    });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Produkti nuk u gjet!'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Produkti u perditesua me sukses!',
      product
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Perditesimi i produktit deshtoi: ' + error.message
    });
  }
};


exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Produkti nuk u gjet!'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Produkti u fshi me sukses!'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Fshirja e produktit deshtoi: ' + error.message
    });
  }
};
