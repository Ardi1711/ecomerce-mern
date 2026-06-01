import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';



export function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  
  useEffect(() => {
    fetchProducts();
  }, []);


  const fetchProducts = async () => {
    try {

      const response = await axios.get(`${process.env.REACT_APP_API_URL}/products`);
      setProducts(response.data.products || []);
      setLoading(false);
    } catch (err) {
      setError('Gabim gjate ngarkimit te produkteve!');
      setLoading(false);
    }
  };


  const handleAddToCart = (product) => {
    
    const token = localStorage.getItem('token');
    
    if (!token) {
      alert('❌ Ups! Duhet te jeni i regjistruar per te shtuar produkte ne shporte.\n\n Duke ridrejtuar ne faqen e hyrjes...');
      navigate('/login');
      return;
    }

    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existingItem = cart.find((item) => item.productId === product._id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({
        productId: product._id,
        name: product.name,
        price: product.price,
        quantity: 1
      });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    alert('✅ Proizvod je dodan u korpu!');
  };

  if (loading) return <div className="text-center mt-10">⏳ Po ngarkohet...</div>;
  if (error) return <div className="text-center mt-10 text-red-600">{error}</div>;

  return (
    <div className="max-w-7xl mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8">📦 Produktet Disponuese</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product._id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
            {/* IMAZHI */}
            <img 
              src={product.image} 
              alt={product.name}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />

            {/* EMRI */}
            <h3 className="text-xl font-bold mb-2">{product.name}</h3>

            {/* PeRSHKRIMI */}
            <p className="text-gray-600 text-sm mb-3">
              {product.description.substring(0, 50)}...
            </p>

            {/* KATEGORIA */}
            <p className="text-sm text-blue-600 mb-2">
              🏷️ {product.category}
            </p>

            {/* ÇMIMI */}
            <p className="text-2xl font-bold text-green-600 mb-3">
              💰 ${product.price}
            </p>

            {/* STOKU */}
            <p className="text-sm mb-4">
              {product.stock > 0 ? (
                <span className="text-green-600">✅ Ne stok: {product.stock}</span>
              ) : (
                <span className="text-red-600">❌ Nuk ka stok</span>
              )}
            </p>

            {/* BUTONI */}
            <button
              onClick={() => handleAddToCart(product)}
              disabled={product.stock === 0}
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {product.stock > 0 ? '🛒 Shto ne Shporte' : 'Nuk ka disponueshmeri'}
            </button>
          </div>
        ))}
      </div>

      {products.length === 0 && (
        <div className="text-center mt-10 text-gray-600">
          Nuk ka produkte te disponueshme per tani
        </div>
      )}
    </div>
  );
}

export default ProductsPage;
