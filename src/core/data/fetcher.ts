import axios, { AxiosError } from 'axios';
import { LS, LSKeys } from '../local-store';
import { signout } from '../login/signout';

export const AX = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
});

const token = LS.getItem(LSKeys.AuthToken, '');

if (token) {
  AX.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

AX.interceptors.response.use(
  response => response,
  (error: AxiosError) => {
    console.debug('errors', error.toJSON());
    if (error.response?.status === 401) {
      console.debug('AAAA');
      signout();
      window.location.replace('/login');
    }

    throw error;
  },
);
