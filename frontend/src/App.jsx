import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import NavBar from './components/NavBar';
import ProductsPage from './pages/ProductsPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import CartPage from './pages/CartPage';
import './index.css';



export default function App() {
  return (
    <Provider store={store}>
      <Router>
        {/* 📌 NAVBAR - NAVIGIM KRYESOR */}
        <NavBar />
        
        {/* 📖 RRUGeT (PAGES) */}
        <Routes>
          {/* 📦 PRODUKTET */}
          <Route path="/" element={<ProductsPage />} />
          
          {/* 🛒 SHPORTA */}
          <Route path="/cart" element={<CartPage />} />
          
          {/* 🔓 LOGIN */}
          <Route path="/login" element={<LoginPage />} />
          
          {/* 📝 REGISTER */}
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </Router>
    </Provider>
  );
}
