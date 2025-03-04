import { AuthContextType, User, UserChangeCallback } from "./AuthContext";

const anonymousUser: User = {
  email: null,
  id: "anonymous",
  isAnonymous: true,
}

let user: User | null | undefined = localStorage.getItem("fem-link-sharing-app:signed_in_anonymously") === "true" ? anonymousUser : null;

let userChangeCallback: UserChangeCallback | undefined = undefined;

export const onUserChange = (callback: UserChangeCallback) => {
  if (userChangeCallback) {
  throw new Error("Callback already set");
  }
  userChangeCallback = callback;
};

export const getUser = () => user;

export const loginAnonymously: AuthContextType["loginAnonymously"] = async () => {
    localStorage.setItem("fem-link-sharing-app:signed_in_anonymously", "true");
    user = anonymousUser
    userChangeCallback?.(user);
    return { success: true };
  };


export const logout: AuthContextType["logout"] = async () => {
  localStorage.removeItem("fem-link-sharing-app:signed_in_anonymously");
  user = null;
  userChangeCallback?.(user);
  return { success: true };
};
