import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export function getApiErrorMessage(err: unknown, fallback = 'Ocorreu um erro inesperado.'): string {
  if (axios.isAxiosError(err)) {
    const data = err.response?.data as { erro?: string; error?: string } | undefined;
    return data?.erro || data?.error || fallback;
  }
  if (err instanceof Error) {
    return err.message;
  }
  return fallback;
}