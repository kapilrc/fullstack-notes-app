import axios from 'axios';

const baseURL = import.meta.env.VITE_API_ENDPOINT_URL;

const Api = axios.create({
  baseURL,
  headers: {
    accept: 'application/json',
    'Content-Type': 'application/json'
  }
});

export default Api;
