import axios from 'axios';

const api = axios.create({
  baseURL: 'https://7390caaa0a05.ngrok.io/api',
});


export default api;
