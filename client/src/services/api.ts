import axios, { type AxiosInstance } from "axios";

export interface ApiError {
   message: string;
   code?: string;
   statusCode?: number;
}

const VITE_API_URL = import.meta.env.VITE_API_URL;

const api: AxiosInstance = axios.create({
   baseURL: `${VITE_API_URL}/api`,
   timeout: 15_000,
   withCredentials: true, // This sends cookies automatically
   headers: {
      "Content-Type": "application/json",
   },
});

let isRefreshing = false;
let refreshPromise: Promise<any> | null = null;

export function setupInterceptors(accessToken: string | null) {
   api.interceptors.request.clear();
   api.interceptors.response.clear();

   api.interceptors.request.use((config) => {
      if (accessToken) {
         config.headers.Authorization = `Bearer ${accessToken}`;
      }
      return config;
   });

   api.interceptors.response.use(
      (res) => res,
      async (err) => {
         const originalRequest = err.config;

         // ❌ NEVER intercept refresh itself
         if (originalRequest?.url?.includes("/auth/refresh")) {
            return Promise.reject(err);
         }

         if (err.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            // 🔒 prevent multiple refresh calls
            if (!isRefreshing) {
               isRefreshing = true;
               refreshPromise = api.post("/auth/refresh").finally(() => {
                  isRefreshing = false;
                  refreshPromise = null;
               });
            }

            try {
               await refreshPromise;
               return api(originalRequest);
            } catch {
               return Promise.reject(err); // logout happens elsewhere
            }
         }

         return Promise.reject(err);
      },
   );
}

export default api;
