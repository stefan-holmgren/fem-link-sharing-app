import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/config/firebase";
import { FirebaseError } from "firebase/app";

export const login = async (email: string, password: string): Promise<{ success: true } | { success: false; errorMessage: string }> => {
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
