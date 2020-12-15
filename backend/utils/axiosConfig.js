import axios from 'axios';

const env = process.env.NODE_ENV; // current environment

export const app = axios.create({
  baseURL:
    env === 'production'
      ? 'http://example.com/api/' // production
      : 'http://localhost:5000/api/', // development
});