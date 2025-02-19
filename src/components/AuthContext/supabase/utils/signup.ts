import { supabase } from "@/config/supabase";
import { AuthContextType } from "../../AuthContext";

export const signup: AuthContextType["signup"] = async (email, password) => {
  const response = await supabase.auth.signUp({ email, password });
  if (response.error) {
    console.error("Failed to sign up", response.error);
    return { success: false, errorMessage: "Failed to sign up" };
  }
  return { success: true };
};
