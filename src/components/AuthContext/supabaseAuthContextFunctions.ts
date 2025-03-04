import { supabase } from "@/config/supabase";
import { AuthContextType, User, UserChangeCallback } from "./AuthContext";

let user: User | undefined | null = undefined;

let userChangeCallback: UserChangeCallback | undefined = undefined;

supabase.auth.onAuthStateChange((_event, session) => { 
  user = session?.user ? { email: session.user.email ?? null, id: session.user.id, isAnonymous: session.user.is_anonymous ?? false } : null;   
  userChangeCallback?.(user);
});

export const getUser = () => user;

export const onUserChange = (callback: UserChangeCallback) => {
  if (userChangeCallback) {
    throw new Error("Callback already set");
  }
  userChangeCallback = callback;
};

export const login: AuthContextType["login"] = async (email, password) => {
  const response = await supabase.auth.signInWithPassword({ email, password });
  if (response.error) {
    switch (response.error.code) {
      case "invalid_credentials":
        return { success: false, error: "invalid_credentials" };
    }
    return { success: false, error: "other" };
  }
  return { success: true };
};

export const logout: AuthContextType["logout"] = async () => {
  const response = await supabase.auth.signOut();
  if (response.error) {
    return { success: false, errorMessage: "Failed to logout" };
  }
  return { success: true };
};

export const forgotPassword: AuthContextType["forgotPassword"] = async (email) => {
  const redirectTo = `${window.location.origin}/reset-password`;
  const response = await supabase.auth.resetPasswordForEmail(email, { redirectTo });
  if (response.error) {
    return { success: false, errorMessage: "Failed to send reset email" };
  }
  return { success: true };
};

export const resetPassword: AuthContextType["resetPassword"] = async (password) => {
  const response = await supabase.auth.updateUser({ password });
  if (response.error) {
    return { success: false, errorMessage: "Failed to reset password" };
  }
  return { success: true };
};

export const signup: AuthContextType["signup"] = async (email, password) => {
  const response = await supabase.auth.signUp({ email, password });
  if (response.error) {
    return { success: false, errorMessage: "Failed to sign up" };
  }
  return { success: true };
};
