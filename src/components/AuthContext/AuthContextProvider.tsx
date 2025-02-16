import { ReactNode, useEffect, useState } from "react";
import { AuthContext, User } from "./AuthContext";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/config/firebase";

type AuthContextProviderProps = {
  children?: ReactNode;
};

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [user, setUser] = useState<User | null | undefined>(undefined);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authorizedUser) => {
      setUser(authorizedUser ? { id: authorizedUser.uid, email: authorizedUser.email } : null);
    });
    return unsubscribe;
  }, []);

  return <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>;
};
