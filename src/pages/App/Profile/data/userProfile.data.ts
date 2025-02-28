import { User } from "@/components/AuthContext/AuthContext";

export type UserProfile = {
  firstName: string;
  lastName: string;
  email?: string;
  profileImageUrl?: string;
};

export interface UserProfileData {
  getUserProfile(user: User): Promise<UserProfile>;
  updateUserProfile(user: User, userProfile: UserProfile): Promise<void>;
}

export const userProfileData: UserProfileData = {
  getUserProfile: async () => {
    return {
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@email.com",
      profileImageUrl: "https://picsum.photos/600",
    };
  },
  updateUserProfile: async () => {
    throw new Error("Not implemented");
  },
};
