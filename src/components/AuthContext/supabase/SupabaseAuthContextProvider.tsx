import { ReactNode, useEffect, useState } from "react";
import { AuthContext, User } from "../AuthContext";
import { supabase } from "@/config/supabase";
import { login } from "./utils/login";
import { logout } from "./utils/logout";
import { forgotPassword } from "./utils/forgotPassword";
import { resetPassword } from "./utils/resetPassword";
import { signup } from "./utils/signup";

type SupabaseAuthContextProviderProps = {
  children?: ReactNode;
};

export const SupabaseAuthContextProvider = ({ children }: SupabaseAuthContextProviderProps) => {
  const [user, setUser] = useState<User | null | undefined>(undefined);
  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ? { email: session.user.email ?? null, id: session.user.id, isAnonymous: session.user.is_anonymous ?? false } : null);
    });
    return () => subscription.unsubscribe();
  }, []);

  return <AuthContext.Provider value={{ user, login, logout, forgotPassword, resetPassword, signup }}>{children}</AuthContext.Provider>;
};
