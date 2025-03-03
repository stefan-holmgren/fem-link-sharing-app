import { AuthContextType } from "../../AuthContext";
import { supabase } from "@/config/supabase";

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
