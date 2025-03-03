import { AuthContextType } from "../../AuthContext";
import { supabase } from "@/config/supabase";

export const forgotPassword: AuthContextType["forgotPassword"] = async (email) => {
  const redirectTo = `${window.location.origin}/reset-password`;
  const response = await supabase.auth.resetPasswordForEmail(email, { redirectTo });
  if (response.error) {
    return { success: false, errorMessage: "Failed to send reset email" };
  }
  return { success: true };
};
