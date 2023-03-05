import axios from 'axios';

const SERVER_BASE_URL = 'http://localhost/'

export const searchBackend = axios.create({ baseURL: SERVER_BASE_URL });
export const productsBackend = axios.create({ baseURL: SERVER_BASE_URL });