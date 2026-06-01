

require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('../models/Product');

//PRODUKTET 
const sampleProducts = [
  {
    name: 'Laptop HP Pavilion',
    description: 'Laptop i fuqishem me procesor Intel i7, 16GB RAM, 512GB SSD',
    price: 799,
    category: 'Electronics',
    stock: 5,
    image: 'https://images.unsplash.com/photo-1531492746076-161ca9bcad58?w=500&h=500&fit=crop',
    rating: 4.5
  },
  {
    name: 'iPhone 15 Pro',
    description: 'Smartphone premium me kamere 48MP, A17 Pro chip, 256GB storage',
    price: 999,
    category: 'Electronics',
    stock: 8,
    image: 'https://images.unsplash.com/photo-1592286927505-1def25115558?w=500&h=500&fit=crop',
    rating: 4.8
  },
  {
    name: 'Sony WH-1000XM5 Headphones',
    description: 'Headphone wireless me noise cancellation dhe sound i shuar',
    price: 399,
    category: 'Audio',
    stock: 12,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop',
    rating: 4.7
  },
  {
    name: 'Samsung 4K Monitor',
    description: 'Monitor 32" 4K UHD me HDR, ideal per design dhe gaming',
    price: 599,
    category: 'Electronics',
    stock: 3,
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&h=500&fit=crop',
    rating: 4.6
  },
  {
    name: 'Mechanical Gaming Keyboard',
    description: 'Keyboard RGB mekanik me switches Cherry MX, respons i shpejt',
    price: 159,
    category: 'Accessories',
    stock: 20,
    image: 'https://images.unsplash.com/photo-1587829191301-dc798b83add3?w=500&h=500&fit=crop',
    rating: 4.4
  },
  {
    name: 'Logitech MX Master 3S Mouse',
    description: 'Mouse wireless ergonomik me 8K DPI, multi-device',
    price: 99,
    category: 'Accessories',
    stock: 15,
    image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=500&h=500&fit=crop',
    rating: 4.7
  },
  {
    name: 'Apple iPad Air',
    description: 'Tablet 11" me M1 chip, 128GB storage, perfect per productivity',
    price: 599,
    category: 'Tablets',
    stock: 7,
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=500&h=500&fit=crop',
    rating: 4.6
  },
  {
    name: 'Samsung Galaxy Watch 6',
    description: 'Smartwatch me AMOLED display, fitness tracking, 40h battery',
    price: 299,
    category: 'Wearables',
    stock: 10,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop',
    rating: 4.5
  },
  {
    name: 'Anker PowerBank 20000mAh',
    description: 'Power bank 20000mAh me fast charging, USB-C support',
    price: 45,
    category: 'Accessories',
    stock: 30,
    image: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=500&h=500&fit=crop',
    rating: 4.3
  },
  {
    name: 'DJI Mini 3 Pro Drone',
    description: 'Drone compact me 4K kamera, 38min flight time, intelligent flight',
    price: 459,
    category: 'Drones',
    stock: 4,
    image: 'https://images.unsplash.com/photo-1512237736579-af3a1b842b38?w=500&h=500&fit=crop',
    rating: 4.8
  },
  {
    name: 'Apple MacBook Pro M3',
    description: 'Laptop professional me M3 chip, 16GB RAM, 512GB storage',
    price: 1999,
    category: 'Electronics',
    stock: 3,
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&h=500&fit=crop',
    rating: 4.9
  },
  {
    name: 'Google Pixel 8 Pro',
    description: 'Smartphone me AI features, 50MP camera, 5G connectivity',
    price: 899,
    category: 'Electronics',
    stock: 6,
    image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=500&h=500&fit=crop',
    rating: 4.6
  },
  {
    name: 'Marshall Emberton Bluetooth Speaker',
    description: 'Portable speaker me deep bass, 20h battery, waterproof',
    price: 189,
    category: 'Audio',
    stock: 14,
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&h=500&fit=crop',
    rating: 4.5
  },
  {
    name: 'GoPro Hero 12 Action Camera',
    description: '5.3K video, waterproof, stabilization i avancar per adventure',
    price: 449,
    category: 'Cameras',
    stock: 8,
    image: 'https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=500&h=500&fit=crop',
    rating: 4.7
  },
  {
    name: 'Sony Alpha A6700 Camera',
    description: 'Professional mirrorless camera me 26MP sensor, 4K 120fps video',
    price: 1299,
    category: 'Cameras',
    stock: 2,
    image: 'https://images.unsplash.com/photo-1609034227505-5876f6aa4e90?w=500&h=500&fit=crop',
    rating: 4.8
  },
  {
    name: 'Razer DeathAdder V3 Gaming Mouse',
    description: 'Gaming mouse me 30000 DPI, lightweight, fast clicks',
    price: 79,
    category: 'Gaming',
    stock: 25,
    image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=500&h=500&fit=crop',
    rating: 4.4
  }
];

// 🌱 SEED FUNKSIONI
const seedDatabase = async () => {
  try {
    // 🔗 Lidhu ne MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Lidhja me MongoDB u realizua');

    // 🗑️ Fshij produktet e vjeter
    await Product.deleteMany({});
    console.log('🗑️ Produktet e vjeter u fshire');

    // ➕ Inserto produktet e reja
    const createdProducts = await Product.insertMany(sampleProducts);
    console.log(`✨ ${createdProducts.length} produkte u shtuan me sukses!`);

    // 📊 Shfaq informacionin
    console.log('\n📦 Produktet e insertuar:');
    createdProducts.forEach((product) => {
      console.log(`  - ${product.name} (${product.stock} ne stok)`);
    });

    // 🔌 Mbyll lidhjen
    await mongoose.disconnect();
    console.log('\n✅ Seed i plote!');
  } catch (error) {
    console.error('❌ Gabim gjate seed-it:', error.message);
    process.exit(1);
  }
};

// 🚀 Ekzekuto
seedDatabase();
