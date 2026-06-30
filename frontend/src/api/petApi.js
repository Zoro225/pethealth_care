import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:8080/pets',
  headers: { 'Content-Type': 'application/json' },
});

export const getAllPets    = ()         => API.get('');
export const getPetById   = (id)       => API.get(`/${id}`);
export const addPet       = (data)     => API.post('', data);
export const updatePet    = (id, data) => API.put(`/${id}`, data);
export const deletePet    = (id)       => API.delete(`/${id}`);
export const searchPet    = (name)     => API.get(`/search?name=${encodeURIComponent(name)}`);
export const getDashboard = ()         => API.get('/dashboard');
