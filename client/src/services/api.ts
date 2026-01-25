import axios, { type AxiosInstance } from "axios";

/**
 * Optional: shape of your API error response
 */
export interface ApiError {
   message: string;
   code?: string;
   statusCode?: number;
}

const VITE_API_URL = import.meta.env.VITE_API_URL;

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

api.interceptors.request.use((config) => {
   const token = localStorage.getItem("accessToken");
   if (token) config.headers.Authorization = `Bearer ${token}`;
   return config;
});

/* ============================
   RESPONSE INTERCEPTOR
============================ */
api.interceptors.response.use(
   (res) => res,
   async (err) => {
      if (err.response?.status === 401) {
         const { data } = await api.post("/auth/refresh");
         localStorage.setItem("accessToken", data.accessToken);
         err.config.headers.Authorization = `Bearer ${data.accessToken}`;
         return api(err.config);
      }
      return Promise.reject(err);
   },
);

export default api;
