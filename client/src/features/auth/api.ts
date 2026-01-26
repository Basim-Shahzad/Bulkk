import api from "../../services/api";

interface LoginCredentials {
   email: string;
   password: string;
}
interface SignupCredentials extends LoginCredentials {
   name: string;
   storeName: string;
}

export const authApi = {
   login: async (loginData : LoginCredentials) => {
      const { data } = await api.post("/auth/login/", loginData);
      return data;
   },
   signup: async (signupData : SignupCredentials) => {
      await api.post("/auth/signup/", signupData);

      return authApi.login({
         email : signupData.email,
         password : signupData.password
      })
   },
   logout: async () => {
      await api.post('/auth/logout')
   },
   refresh: async () => {
      await api.post('/auth/refresh')
   },
};