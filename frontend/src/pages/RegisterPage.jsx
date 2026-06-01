import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';



export function RegisterPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  
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
        `${process.env.REACT_APP_API_URL}/auth/register`,
        formData
      );

      //  REGJISTRIM I SUKSESSHeM
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      
      alert('🎉 Regjistrim i suksesshem! Mire se vjen!');
      navigate('/');
    } catch (err) {
     
      setError(err.response?.data?.message || 'Gabim gjate regjstrimit!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md mt-10">
      <h1 className="text-3xl font-bold mb-6 text-center">Regjistrohu 📝</h1>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          ❌ {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* EMRI */}
        <input
          type="text"
          name="name"
          placeholder="Emri i plote"
          value={formData.name}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
          required
        />

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

        {/* KONFIRMO FJALeKALIMIN */}
        <input
          type="password"
          name="confirmPassword"
          placeholder="Konfirmo fjalekalimin"
          value={formData.confirmPassword}
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
          {loading ? '⏳ Po regjistrohet...' : '✅ Regjistrohu'}
        </button>
      </form>

      {/* LINK PeR LOGIN */}
      <p className="text-center mt-4">
        Ke account? 
        <button 
          onClick={() => navigate('/login')}
          className="text-blue-600 hover:underline ml-2"
        >
          Login ketu
        </button>
      </p>
    </div>
  );
}

export default RegisterPage;
