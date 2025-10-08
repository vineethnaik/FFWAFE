import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './components/CartContext';
import { SearchProvider } from './components/SearchContext';
import WelcomePage from './components/WelcomePage';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import HomePage from './components/HomePage';
import ProductsPage from './components/ProductsPage';
import NewArrivalPage from './components/NewArrivalPage';
import SeedsSaplingsPage from './components/SeedsSaplingsPage';
import CartPage from './components/CartPage';
import PaymentPage from './components/PaymentPage';
import AboutPage from './components/AboutPage';
import FarmerDashboard from './components/FarmerDashboard';

function App() {
  return (
    <SearchProvider>
      <CartProvider>
        <Router>
          <Routes>
            <Route path="/" element={<WelcomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/new-arrival" element={<NewArrivalPage />} />
            <Route path="/seeds-saplings" element={<SeedsSaplingsPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/payment" element={<PaymentPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/farmer" element={<FarmerDashboard farmerId={localStorage.getItem('farmerId')} />} />
            <Route path="/farmer-dashboard" element={<FarmerDashboard farmerId={localStorage.getItem('farmerId')} />} />
          </Routes>
        </Router>
      </CartProvider>
    </SearchProvider>
  );
}

export default App;
