import { supabase } from "@/config/supabase";
import { AuthContextType } from "../../AuthContext";

export const logout: AuthContextType["logout"] = async () => {
  const response = await supabase.auth.signOut();
  if (response.error) {
    console.error("Failed to logout", response.error);
    return { success: false, errorMessage: "Failed to logout" };
  }
  return { success: true };
};
