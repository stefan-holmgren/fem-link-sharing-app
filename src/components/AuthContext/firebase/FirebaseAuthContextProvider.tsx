import { ReactNode, useEffect, useState } from "react";
import { AuthContext, User } from "../AuthContext";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/config/firebase";
import { login } from "./utils/login";
import { logout } from "./utils/logout";
import { forgotPassword } from "./utils/forgotPassword";
import { resetPassword } from "./utils/resetPassword";
import { signup } from "./utils/signup";

type FirebaseAuthContextProviderProps = {
  children?: ReactNode;
};

export const FirebaseAuthContextProvider = ({ children }: FirebaseAuthContextProviderProps) => {
  const [user, setUser] = useState<User | null | undefined>(undefined);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authorizedUser) => {
      setUser(authorizedUser ? { id: authorizedUser.uid, email: authorizedUser.email } : null);
    });
    return unsubscribe;
  }, []);

  return <AuthContext.Provider value={{ user, login, logout, forgotPassword, resetPassword, signup }}>{children}</AuthContext.Provider>;
};
