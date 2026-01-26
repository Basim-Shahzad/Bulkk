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

         // If 401 and haven't retried yet
         if (err.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
               const { data } = await api.post("/auth/refresh");
               // Backend will automatically send new refreshToken in httpOnly cookie
               // You just need to update the accessToken in state
               return api(originalRequest);
            } catch (refreshError) {
               // Refresh failed, user needs to login again
               return Promise.reject(refreshError);
            }
         }

         return Promise.reject(err);
      },
   );
}

export default api;