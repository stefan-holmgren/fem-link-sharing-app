import { auth } from "@/config/firebase";
import { AuthContextType } from "../../AuthContext";

export const logout: AuthContextType["logout"] = () => auth.signOut();
