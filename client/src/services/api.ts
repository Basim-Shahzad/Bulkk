import axios, { AxiosError, type AxiosInstance, type AxiosRequestConfig, type AxiosResponse } from "axios";

/**
 * Optional: shape of your API error response
 */
export interface ApiError {
   message: string;
   code?: string;
   statusCode?: number;
}

/**
 * Extend Axios config with retry flag
 */
interface RetryConfig extends AxiosRequestConfig {
   _retry?: boolean;
}

const VITE_API_URL = import.meta.env.VITE_API_URL

/**
 * Create instance
 */
const api: AxiosInstance = axios.create({
   baseURL: `${VITE_API_URL}/api`,
   timeout: 15_000,
   withCredentials: true,
   headers: {
      "Content-Type": "application/json",
   },
});

/* ============================
   REQUEST INTERCEPTOR
============================ */
api.interceptors.request.use(
   (config) => {
      const token = localStorage.getItem("accessToken");

      if (token && config.headers) {
         config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
   },
   (error) => Promise.reject(error),
);

/* ============================
   RESPONSE INTERCEPTOR
============================ */
api.interceptors.response.use(
   (response: AxiosResponse) => response,
   async (error: AxiosError<ApiError>) => {
      const originalRequest = error.config as RetryConfig;

      if (error.response?.status === 401 && !originalRequest?._retry) {
         originalRequest._retry = true;

         try {
            const res = await axios.post<{ accessToken: string }>(
               `${import.meta.env.VITE_API_URL}/auth/refresh`,
               {},
               { withCredentials: true },
            );

            localStorage.setItem("accessToken", res.data.accessToken);

            originalRequest.headers = {
               ...originalRequest.headers,
               Authorization: `Bearer ${res.data.accessToken}`,
            };

            return api(originalRequest);
         } catch (refreshError) {
            localStorage.removeItem("accessToken");
            window.location.href = "/login";
            return Promise.reject(refreshError);
         }
      }

      return Promise.reject(error);
   },
);

export default api;
