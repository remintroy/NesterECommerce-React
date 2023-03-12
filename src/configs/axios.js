import axios from 'axios';

const SERVER_BASE_ORGIN = 'http://remin.com';
const SERVER_BASE_ORGINS = 'https://remin.com';
const SERVER_BASE_URL = `${SERVER_BASE_ORGIN}:8080`;

export const staticFilesBacked = SERVER_BASE_URL;
export const authBackend = axios.create({ baseURL: `${SERVER_BASE_ORGINS}:8083/auth`, withCredentials: true },);
export const productsBackend = axios.create({ baseURL: `${SERVER_BASE_ORGINS}:8083/product` });
export const cartBackend = axios.create({ baseURL: `${SERVER_BASE_ORGINS}:8083/cart` });
export const searchBackend = axios.create({ baseURL: `${SERVER_BASE_ORGIN}:8080/` });