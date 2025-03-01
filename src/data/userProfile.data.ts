import { User } from "@/components/AuthContext/AuthContext";
import { userProfileDataSupabase } from "./impl/userProfile.supabase";
import { userProfileDataLocalStorage } from "./impl/userProfile.localstorage";

export type UserProfile = {
  firstName: string;
  lastName: string;
  email?: string;
  profileImageFile?: File;
};

export interface UserProfileData {
  getUserProfile(user: User): Promise<UserProfile | null>;
  updateUserProfile(user: User, userProfile: UserProfile): Promise<void>;
}

export const userProfileData: UserProfileData = {
  getUserProfile: (user) => {
    if (user.isAnonymous) {
      return userProfileDataLocalStorage.getUserProfile(user);
    }
    return userProfileDataSupabase.getUserProfile(user);
  },
  updateUserProfile: async (user, userProfile) => {
    if (user.isAnonymous) {
      return userProfileDataLocalStorage.updateUserProfile(user, userProfile);
    }
    return userProfileDataSupabase.updateUserProfile(user, userProfile);
  },
};
