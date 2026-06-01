import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


export function CartPage() {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);

  
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('❌ Duhet te jeni te regjistruar per te pare shporten!\n\n Duke ridrejtuar ne faqen e hyrjes...');
      navigate('/login');
      return;
    }
  }, [navigate]);

 
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCart(savedCart);
  }, []);

  //  HIQE NGA SHPORTA
  const handleRemoveItem = (productId) => {
    const updatedCart = cart.filter((item) => item.productId !== productId);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  //  NDRYSHO SASI
  const handleUpdateQuantity = (productId, quantity) => {
    const updatedCart = cart.map((item) =>
      item.productId === productId ? { ...item, quantity } : item
    );
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  //  NJEHSO TOTALIN
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  //  PeRFUNDO POROSI
  const handleCheckout = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('🔒 Duhet te jesh i loguar per te bere porosi!');
      navigate('/login');
      return;
    }

    setLoading(true);

    try {
      
      await axios.post(
        `${process.env.REACT_APP_API_URL}/orders`,
        {
          items: cart,
          shippingAddress: {
            street: 'Adresa juaj',
            city: 'Qyteti',
            country: 'Shqiperi',
            zipCode: '1000'
          }
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      alert('✅ Porosi e suksesshme!');
      localStorage.removeItem('cart');
      setCart([]);
      navigate('/');
    } catch (err) {
      alert('❌ Gabim gjate perfundimit te porosite!');
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto p-8 text-center">
        <h1 className="text-4xl font-bold mb-8">🛒 Shporta Juaj</h1>
        <p className="text-gray-600 mb-8">Shporta eshte boshe 😢</p>
        <button
          onClick={() => navigate('/')}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
        >
          👈 Kthehu ne Produktet
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8">🛒 Shporta Juaj</h1>

      <div className="grid grid-cols-3 gap-8">
        {/* LISTA E PRODUKTEVE */}
        <div className="col-span-2">
          <div className="space-y-4">
            {cart.map((item) => (
              <div key={item.productId} className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center">
                <div>
                  <h3 className="font-bold text-lg">{item.name}</h3>
                  <p className="text-gray-600">💰 ${item.price}</p>
                </div>

                <div className="flex items-center gap-4">
                  {/* SASIA */}
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => handleUpdateQuantity(item.productId, parseInt(e.target.value))}
                    className="w-12 px-2 py-1 border rounded text-center"
                  />

                  {/* NeNTOTALI */}
                  <div className="text-right">
                    <p className="text-green-600 font-bold">${item.price * item.quantity}</p>
                  </div>

                  {/* BUTONI PeR HIQJE */}
                  <button
                    onClick={() => handleRemoveItem(item.productId)}
                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                  >
                    🗑️ Hiqe
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* PeRMBLEDHJA E POROSISe */}
        <div className="bg-gray-100 p-6 rounded-lg shadow-md h-fit">
          <h2 className="text-2xl font-bold mb-4">📋 Permbledhja</h2>
          
          <div className="space-y-2 mb-6 border-b pb-4">
            <p className="flex justify-between">
              <span>Artikujt:</span>
              <span className="font-bold">{cart.length}</span>
            </p>
            <p className="flex justify-between">
              <span>Sasia totale:</span>
              <span className="font-bold">{cart.reduce((sum, item) => sum + item.quantity, 0)}</span>
            </p>
          </div>

          <div className="text-xl font-bold mb-6 text-green-600">
            <p className="flex justify-between">
              <span>Total:</span>
              <span>${totalPrice.toFixed(2)}</span>
            </p>
          </div>

          <button
            onClick={handleCheckout}
            disabled={loading}
            className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition disabled:opacity-50 font-bold text-lg"
          >
            {loading ? '⏳ Po perpunohet...' : '✅ Perfundo Porosi'}
          </button>

          <button
            onClick={() => navigate('/')}
            className="w-full mt-3 bg-gray-400 text-white py-2 rounded-lg hover:bg-gray-500"
          >
            👈 Kthehu Prape
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartPage;
