import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

//  FAQJA E LOGIN-IT

export function LoginPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  //  NDRYSHIMI I INPUTEVE
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
     
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/auth/login`,
        formData
      );

      // ✅ LOGIN I SUKSESSHeM
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      
      alert('🎉 Login i suksesshem!');
      navigate('/');
    } catch (err) {
      
      setError(err.response?.data?.message || 'Gabim gjate login-it!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md mt-10">
      <h1 className="text-3xl font-bold mb-6 text-center">Login 🔓</h1>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          ❌ {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* EMAIL */}
        <input
          type="email"
          name="email"
          placeholder="Email-i"
          value={formData.email}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
          required
        />

        {/* FJALeKALIMI */}
        <input
          type="password"
          name="password"
          placeholder="Fjalekalimi"
          value={formData.password}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
          required
        />

        {/* BUTONI */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
        >
          {loading ? '⏳ Po hyr...' : '✅ Login'}
        </button>
      </form>

      {/* LINK PeR REGISTER */}
      <p className="text-center mt-4">
        Nuk ke account? 
        <button 
          onClick={() => navigate('/register')}
          className="text-blue-600 hover:underline ml-2"
        >
          Regjistrohu ketu
        </button>
      </p>
    </div>
  );
}

export default LoginPage;
