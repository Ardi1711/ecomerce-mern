import React from 'react';
import { useNavigate } from 'react-router-dom';



export function NavBar() {
  const navigate = useNavigate();
  //  Merr user dhe logout nga state
  const user = JSON.parse(localStorage.getItem('user') || 'null');

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* 🏪 LOGO */}
        <div 
          className="text-2xl font-bold cursor-pointer hover:text-blue-200"
          onClick={() => navigate('/')}
        >
          🛍️ ShopHub
        </div>

        {/* 🔗 LIDHJE NAVIGIMI */}
        <div className="flex gap-6 items-center">
          <button 
            onClick={() => navigate('/')}
            className="hover:text-blue-200 transition"
          >
            Produktet
          </button>
          
          <button 
            onClick={() => navigate('/cart')}
            className="hover:text-blue-200 transition"
          >
            🛒 Shporta
          </button>

          {user ? (
            <>
              <span className="text-sm">👤 {user.name}</span>
              <button 
                onClick={() => {
                  localStorage.removeItem('token');
                  localStorage.removeItem('user');
                  navigate('/login');
                }}
                className="bg-red-600 px-4 py-2 rounded hover:bg-red-700 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <button 
                onClick={() => navigate('/login')}
                className="bg-green-600 px-4 py-2 rounded hover:bg-green-700 transition"
              >
                Login
              </button>
              <button 
                onClick={() => navigate('/register')}
                className="bg-yellow-600 px-4 py-2 rounded hover:bg-yellow-700 transition"
              >
                Register
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
