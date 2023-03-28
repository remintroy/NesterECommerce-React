import axios from 'axios';

const SERVER_BASE_ORGIN = 'https://remin.com/serverold';
const SERVER_BASE_ORGINS = 'https://remin.com/server';
const SERVER_BASE_URL = `${SERVER_BASE_ORGIN}`;

export const staticFilesBacked = SERVER_BASE_URL;
export const authBackend = axios.create({ baseURL: `${SERVER_BASE_ORGINS}/auth`, withCredentials: true },);
export const productsBackend = axios.create({ baseURL: `${SERVER_BASE_ORGINS}/product` });
export const cartBackend = axios.create({ baseURL: `${SERVER_BASE_ORGINS}/cart` });
export const searchBackend = axios.create({ baseURL: `${SERVER_BASE_ORGIN}/` });
export const ordersBackend = axios.create({ baseURL: `${SERVER_BASE_ORGINS}/orders` });