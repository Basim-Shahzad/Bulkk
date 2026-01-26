export interface User {
   name: string;
   email: string;
   role: "admin" | "staff";
   storeName?: string;
   isActive: boolean;
}

export type AuthState = {
   user: User | null;
   accessToken: string | null;
   isAuthenticated: boolean;
};

export type AuthContextValue = AuthState & {
   setUser: React.Dispatch<React.SetStateAction<User | null>>;
   setAccessToken: React.Dispatch<React.SetStateAction<string | null>>;
};
