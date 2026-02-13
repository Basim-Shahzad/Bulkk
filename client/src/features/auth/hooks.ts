import { useQueryClient, useMutation } from "@tanstack/react-query";
import { AuthContext } from "./AuthContext";
import { authApi } from "./api";
import { useContext } from "react";

export function useAuth() {
   const context = useContext(AuthContext);

   if (!context) {
      throw new Error("useAuth must be used within an AuthProvider");
   }

   return context;
}

export const useSignup = () => {
   const { setUser, setAccessToken } = useAuth();
   return useMutation({
      mutationFn: authApi.signup,
      onSuccess: async (data) => {
         const { accessToken, user } = data;
         setUser(user);
         setAccessToken(accessToken);
      },
   });
};

export const useLogin = () => {
   const { setUser, setAccessToken } = useAuth();
   return useMutation({
      mutationFn: authApi.login,
      onSuccess: async (data) => {
         const { accessToken, user } = data;
         setUser(user);
         setAccessToken(accessToken);
      },
   });
};

export const useLogout = () => {
   const queryClient = useQueryClient();
   const { setUser, setAccessToken } = useAuth();

   return useMutation({
      mutationFn: authApi.logout,
      onSuccess: async () => {
         setUser(null);
         setAccessToken(null);
         queryClient.clear();
      },
   });
};

export const useChangePassword = () => {
   const { setUser } = useAuth();
   return useMutation({
      mutationFn: authApi.changePassword,
      onSuccess: async (data) => {
         const { user } = data;
         setUser(user);
      },
   });
};