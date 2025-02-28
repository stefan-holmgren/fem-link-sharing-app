import { User } from "@/components/AuthContext/AuthContext";
import { userProfileDataSupabase } from "./impl/userProfile.supabase";

export type UserProfile = {
  firstName: string;
  lastName: string;
  email?: string;
  profileImageFile?: File;
};

export interface UserProfileData {
  getUserProfile(user: User): Promise<UserProfile>;
  updateUserProfile(user: User, userProfile: UserProfile): Promise<void>;
}

export const userProfileData: UserProfileData = {
  getUserProfile: (user) => {
    return userProfileDataSupabase.getUserProfile(user);
  },
  updateUserProfile: async (user, userProfile) => {
    return userProfileDataSupabase.updateUserProfile(user, userProfile);
  },
};
