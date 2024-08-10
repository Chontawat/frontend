import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:4000/api'
});

export const addShoes = (shoesData) => api.post('/Shoes', shoesData);
export const getShoes = () => api.get('/Shoes');
export const getShoesbyId = (id) => api.get(`/Shoes/${id}`);
export const updateShoes = (id, studentData) => api.put(`/Shoes/${id}`, studentData);
export const deleteShoes = (id) => api.delete(`/Shoes/${id}`);

export default api;
