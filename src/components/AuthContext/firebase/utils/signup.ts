import { auth } from "@/config/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { AuthContextType } from "../../AuthContext";
import { FirebaseError } from "firebase/app";

const succeed = () => ({ success: true } as const);
const fail = (errorMessage: string) => ({ success: false, errorMessage } as const);

export const signup: AuthContextType["signup"] = async (email, password) => {
  try {
    await createUserWithEmailAndPassword(auth, email, password);
    return succeed();
  } catch (err) {
    if (err instanceof FirebaseError) {
      switch (err.code) {
        case "auth/email-already-in-use":
          return fail("Email is already in use");
        case "auth/invalid-email":
          return fail("Invalid email");
        case "auth/weak-password":
          return fail("Password is too weak - should be 6 characters or longer");
      }
    }
    return fail("Failed to create account");
  }
};
