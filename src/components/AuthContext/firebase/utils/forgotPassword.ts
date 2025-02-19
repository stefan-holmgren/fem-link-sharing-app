import { auth } from "@/config/firebase";
import { FirebaseError } from "firebase/app";
import { sendPasswordResetEmail } from "firebase/auth";
import { AuthContextType } from "../../AuthContext";

export const forgotPassword: AuthContextType["forgotPassword"] = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    return { success: true };
  } catch (err) {
    let errorMessage = "Failed to send reset email";
    if (err instanceof FirebaseError) {
      switch (err.code) {
        case "auth/invalid-email":
          errorMessage = "Invalid e-mail";
          break;
        default:
          console.error("Unrecognized error code", err.code);
      }
    }
    return { success: false, errorMessage };
  }
};
