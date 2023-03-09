import axios from 'axios';

const SERVER_BASE_URL = 'http://192.168.1.15';

export const staticFilesBacked = SERVER_BASE_URL;
export const searchBackend = axios.create({ baseURL: SERVER_BASE_URL });
export const productsBackend = axios.create({ baseURL: `${SERVER_BASE_URL}:8083` });