import axios from 'axios';
import Auth from './Auth';

axios.interceptors.request.use(async (config) => {
  if (config.url.includes('auth/jwt')) {
    return config;
  }

  const tokens = await Auth.checkTokens();

  if (tokens && tokens.encoded) {
    // eslint-disable-next-line
    config.headers.authorization = `JWT ${tokens.encoded}`;
  }

  return config;
}, (error) => Promise.reject(error));

axios.interceptors.response.use((response) => response, (error) => {
  if (error.response && (error.response.status === 401 || error.response.status === 403)) {
    Auth.logOut();
  }

  return Promise.reject(error);
});
