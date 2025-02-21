import { createContext } from "react";

export type User = {
  id: string;
  email: string | null;
};

export type AuthContextType = {
  user: User | null | undefined;
  login: (email: string, password: string) => Promise<{ success: true } | { success: false; error: "invalid_credentials" | "other" }>;
  logout: () => Promise<{ success: true } | { success: false; errorMessage: string }>;
  signup: (email: string, password: string) => Promise<{ success: true } | { success: false; errorMessage: string }>;
  forgotPassword: (email: string) => Promise<{ success: true } | { success: false; errorMessage: string }>;
  resetPassword: (password: string) => Promise<{ success: true } | { success: false; errorMessage: string }>;
};

export const AuthContext = createContext<AuthContextType>({
  user: undefined,
  login: async () => {
    throw new Error("login() not implemented");
  },
  logout: async () => {
    throw new Error("logout() not implemented");
  },
  signup: async () => {
    throw new Error("signup() not implemented");
  },
  forgotPassword: async () => {
    throw new Error("forgotPassword() not implemented");
  },
  resetPassword: async () => {
    throw new Error("resetPassword() not implemented");
  },
});
