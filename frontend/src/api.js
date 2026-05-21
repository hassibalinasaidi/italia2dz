import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || '/api',
  withCredentials: true,
});

export const getProducts = (params) => api.get('/products/', { params });
export const getProduct = (slug) => api.get(`/products/${slug}/`);
export const getCategories = () => api.get('/products/categories/');

export const getCart = () => api.get('/cart/');
export const addToCart = (productId, quantity = 1) =>
  api.post('/cart/add/', { product_id: productId, quantity });
export const updateCartItem = (itemId, quantity) =>
  api.patch(`/cart/items/${itemId}/`, { quantity });
export const removeCartItem = (itemId) =>
  api.delete(`/cart/items/${itemId}/`);
export const clearCart = () => api.delete('/cart/');

export const createOrder = (data) => api.post('/orders/', data);
export const getOrder = (id) => api.get(`/orders/${id}/`);
