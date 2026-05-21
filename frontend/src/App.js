import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import OrderConfirmationPage from './pages/OrderConfirmationPage';

export default function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <Navbar />
        <main style={{ maxWidth: 1200, margin: '0 auto', padding: '24px 16px' }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/products/:slug" element={<ProductDetailPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/orders/:id/confirmation" element={<OrderConfirmationPage />} />
          </Routes>
        </main>
      </CartProvider>
    </BrowserRouter>
  );
}
