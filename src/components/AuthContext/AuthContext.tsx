import { createContext } from "react";

export type User = {
  id: string;
  email: string | null;
};

type AuthContext = {
  user: User | null | undefined;
};

export const AuthContext = createContext<AuthContext>({ user: undefined });
