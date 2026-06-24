import axios from 'axios';
import { refreshToken as refreshTokenService } from "../services/auth.service"
import { getAccessToken, getRefreshToken, removeSession, setSession } from '../auth/auth.utils';

const baseURL = 'https://localhost:7081/api';

const axiosInstance = axios.create({ baseURL });

let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

/* ---------- REQUEST ---------- */
axiosInstance.interceptors.request.use((request) => {
  const token = getAccessToken();
  if (token) {
    request.headers.Authorization = `Bearer ${token}`
  }
  return request
});

/* ---------- RESPONSE ---------- */
axiosInstance.interceptors.response.use(
  (response) => response,

  async (error) => {

    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {

      if (isRefreshing) {

        return new Promise(function (resolve, reject) {

          failedQueue.push({ resolve, reject });

        }).then((token) => {

          originalRequest.headers["Authorization"] = "Bearer " + token;
          return axiosInstance(originalRequest);

        }).catch((err) => {
          return Promise.reject(err);
        });

      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {

        const refreshToken = getRefreshToken();

        if (!refreshToken) {
          throw new Error("No refresh token");
        }

        const data = await refreshTokenService(refreshToken);

        const newAccessToken = data.accessToken;
        const newRefreshToken = data.refreshToken;

        setSession(newAccessToken, newRefreshToken);

        processQueue(null, newAccessToken);

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        return axiosInstance(originalRequest);

      } catch (err) {

        processQueue(err, null);

        removeSession();
        window.location.href = "/login";

        return Promise.reject(err);

      } finally {

        isRefreshing = false;

      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;