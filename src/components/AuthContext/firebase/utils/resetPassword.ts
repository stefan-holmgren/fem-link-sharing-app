import { auth } from "@/config/firebase";
import { FirebaseError } from "firebase/app";
import { confirmPasswordReset } from "firebase/auth";
import { AuthContextType } from "../../AuthContext";

export const resetPassword: AuthContextType["resetPassword"] = async (password) => {
  const queryParams = new URLSearchParams(window.location.search);
  const mode = queryParams.get("mode");
  const oobCode = queryParams.get("oobCode");

  if (!oobCode || mode !== "resetPassword") {
    return { success: false, errorMessage: "Invalid reset link" };
  }

  try {
    await confirmPasswordReset(auth, oobCode, password);
    return { success: true };
  } catch (err) {
    if (err instanceof FirebaseError) {
      console.error(err);
    }
    return { success: false, errorMessage: "Failed to reset password" };
  }
};
