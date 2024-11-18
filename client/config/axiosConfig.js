import axios from 'axios';

const baseURL = 'http://localhost:3000';

const UnprotectedAPI = axios.create({
  baseURL,
});

const ProtectedAPI = axios.create({
  baseURL,
});

ProtectedAPI.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem('accessToken');
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

ProtectedAPI.interceptors.response.use(
  (response) => response, // If the response is successful, return it as is.
  async (error) => {
    const originalRequest = error.config;
    console.log("Access token not valid!");

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {

        const refreshToken = localStorage.getItem('refreshToken');

        if (!refreshToken) {
          throw new Error('Refresh token not available');
        }

        const { data } = await UnprotectedAPI.post('/auth/refresh', { refreshToken });

        console.log("Data from refresh endpoint : ",data);

        localStorage.setItem('accessToken', data.accessToken);
        localStorage.setItem('refreshToken', data.refreshToken);

        originalRequest.headers['Authorization'] = `Bearer ${data.accessToken}`;

        return ProtectedAPI(originalRequest);

      } catch (refreshError) {
        console.error('Refresh Token Expired:', refreshError);
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        window.location.href = '/login';
      }
    }

    // If the error is not related to token expiry, reject the promise
    return Promise.reject(error);
  }
);

export { UnprotectedAPI, ProtectedAPI };

