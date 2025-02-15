import { auth } from "@/config/firebase";
import { FirebaseError } from "firebase/app";
import { createUserWithEmailAndPassword } from "firebase/auth";

export const signup = async (email: string, password: string): Promise<{ success: true } | { success: false; errorMessage: string }> => {
  try {
    await createUserWithEmailAndPassword(auth, email, password);
    return {
      success: true,
    };
  } catch (err) {
    let errorMessage = "Failed to create account";
    if (err instanceof FirebaseError) {
      switch (err.code) {
        case "auth/email-already-in-use":
          errorMessage = "Email is already in use";
          break;
        case "auth/invalid-email":
          errorMessage = "Invalid email";
          break;
        case "auth/weak-password":
          errorMessage = "Password is too weak - should be 6 characters or longer";
          break;
        default:
          console.log(err.code);
      }
    }
    return { success: false, errorMessage };
  }
};
