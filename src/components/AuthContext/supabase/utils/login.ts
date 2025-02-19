import { AuthContextType } from "../../AuthContext";
import { supabase } from "@/config/supabase";

export const login: AuthContextType["login"] = async (email, password) => {
  const response = await supabase.auth.signInWithPassword({ email, password });
  if (response.error) {
    console.error("Failed to login", response.error);
    return { success: false, errorMessage: "Failed to login" };
  }
  return { success: true };
};
