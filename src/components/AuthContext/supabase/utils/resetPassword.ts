import { AuthContextType } from "../../AuthContext";
import { supabase } from "@/config/supabase";

export const resetPassword: AuthContextType["resetPassword"] = async (password) => {
  const response = await supabase.auth.updateUser({ password });
  if (response.error) {
    return { success: false, errorMessage: "Failed to reset password" };
  }
  return { success: true };
};
