import { auth } from "@/config/firebase";
import { FirebaseError } from "firebase/app";
import { confirmPasswordReset } from "firebase/auth";
import { AuthContextType } from "../../AuthContext";

export const resetPassword: AuthContextType["resetPassword"] = async (code, password) => {
  try {
    await confirmPasswordReset(auth, code, password);
    return { success: true };
  } catch (err) {
    if (err instanceof FirebaseError) {
      console.error(err);
    }
    return { success: false, errorMessage: "Failed to reset password" };
  }
};
