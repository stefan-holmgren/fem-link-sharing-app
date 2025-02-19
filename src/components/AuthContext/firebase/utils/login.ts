import { auth } from "@/config/firebase";
import { AuthContextType } from "../../AuthContext";
import { signInWithEmailAndPassword } from "firebase/auth";
import { FirebaseError } from "firebase/app";

export const login: AuthContextType["login"] = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    return { success: true };
  } catch (err) {
    let errorMessage = "Failed to login";
    if (err instanceof FirebaseError) {
      switch (err.code) {
        case "auth/invalid-credential":
        case "auth/invalid-email":
        case "auth/missing-password":
          errorMessage = "Invalid email or password";
          break;
        default:
          console.error("Unrecognized error code", err.code);
      }
    }
    return { success: false, errorMessage };
  }
};
