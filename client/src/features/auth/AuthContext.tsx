import React, { createContext, useEffect, useMemo, useState } from "react";
import type { AuthState, User, AuthContextValue } from "./types";
import { setupInterceptors } from "../../services/api";
import api from "../../services/api";

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const initialState: AuthState = {
   user: null,
   accessToken: null,
   isAuthenticated: false,
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
   const [user, setUser] = useState<User | null>(initialState.user);
   const [accessToken, setAccessToken] = useState<string | null>(initialState.accessToken);

   useEffect(() => {
      // On app mount, try to get current user with existing cookies
      const restoreAuth = async () => {
         try {
            const { data } = await api.get("/auth/me"); // Add this endpoint to your backend
            setAccessToken(data.accessToken);
            setUser(data.user);
            setupInterceptors(data.accessToken);
         } catch (error) {
            // No valid session, user is logged out
            setupInterceptors(null);
         }
      };

      restoreAuth();
   }, []);

   useEffect(() => {
      setupInterceptors(accessToken);
   }, [accessToken]);

   const value = useMemo<AuthContextValue>(() => {
      return {
         user,
         setUser,
         accessToken,
         setAccessToken,
         isAuthenticated: Boolean(accessToken),
      };
   }, [user, accessToken]);

   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export { AuthContext };
