import { userProfileDataSupabase } from "./impl/userProfile.supabase";
import { userProfileDataLocalStorage } from "./impl/userProfile.localstorage";

export type UserProfile = {
  firstName: string;
  lastName: string;
  email?: string;
  profileImageFile?: File;
};

export interface UserProfileData {
  getUserProfile(userId: string): Promise<UserProfile | null>;
  updateUserProfile(userId: string, userProfile: UserProfile): Promise<void>;
}

export const userProfileData = {
  getUserProfile: (userId: string, local: boolean) => {
    if (local) {
      return userProfileDataLocalStorage.getUserProfile(userId);
    }
    return userProfileDataSupabase.getUserProfile(userId);
  },
  updateUserProfile: async (userId: string, userProfile: UserProfile, local: boolean) => {
    if (local) {
      return userProfileDataLocalStorage.updateUserProfile(userId, userProfile);
    }
    return userProfileDataSupabase.updateUserProfile(userId, userProfile);
  },
};
