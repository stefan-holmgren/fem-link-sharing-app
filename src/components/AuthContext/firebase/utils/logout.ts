import { auth } from "@/config/firebase";
import { AuthContextType } from "../../AuthContext";

export const logout: AuthContextType["logout"] = async () => {
  try {
    await auth.signOut();
    return { success: true };
  } catch (err) {
    console.error("Failed to logout", err);
    return { success: false, errorMessage: "Failed to logout" };
  }
};
