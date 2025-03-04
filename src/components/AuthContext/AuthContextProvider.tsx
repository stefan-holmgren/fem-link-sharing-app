import { ReactNode, useEffect, useRef, useState } from "react";
import * as supabaseAuthContextFunctions from "./supabaseAuthContextFunctions.ts";
import * as localStorageAuthContextFunctions from "./localStorageAuthContextFunctions.ts";
import { AuthContext, User } from "./AuthContext";

type AuthContextProviderProps = {
  children?: ReactNode;
};

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [isLoggedinAnonymously, setIsLoggedinAnonymously] = useState(localStorage.getItem("fem-link-sharing-app:signed_in_anonymously") === "true");
  const [user, setUser] = useState<User | null | undefined>(undefined);
  const initRef = useRef(false);

  useEffect(() => {
    if (initRef.current) {
      return;
    }
    initRef.current = true;

    const anonymousUser = localStorageAuthContextFunctions.getUser();
    const realUser = supabaseAuthContextFunctions.getUser();

    if (anonymousUser) {
      setIsLoggedinAnonymously(true);
      setUser(anonymousUser);
    } else {
      setUser(realUser);
    }

    localStorageAuthContextFunctions.onUserChange((newUser) => {
      setIsLoggedinAnonymously(!!newUser);
      setUser(newUser);
    });

    supabaseAuthContextFunctions.onUserChange((newUser) => {
      setUser(newUser);
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        loginAnonymously: localStorageAuthContextFunctions.loginAnonymously,
        login: supabaseAuthContextFunctions.login,
        logout: isLoggedinAnonymously ? localStorageAuthContextFunctions.logout : supabaseAuthContextFunctions.logout,
        forgotPassword: supabaseAuthContextFunctions.forgotPassword,
        resetPassword: supabaseAuthContextFunctions.resetPassword,
        signup: supabaseAuthContextFunctions.signup,
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
