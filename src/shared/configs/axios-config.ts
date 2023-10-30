import axios from 'axios';

export const $api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

$api.interceptors.request.use((config) => {
  config['headers'] = config.headers ?? {};
  config.headers['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
  return config;
});
