import { User } from "@/components/AuthContext/AuthContext";
import { supabase } from "@/config/supabase";

export type UserProfile = {
  profileImageUrl?: string;
};

export const getUserProfile = async (user: User): Promise<UserProfile | null> => {
  const { data, error } = await supabase.from("user_profiles").select("*").eq("user_id", user.id).limit(1).single();
  if (!data) {
    return null;
  }
  if (error) {
    console.error("Failed to get user profile", error);
    throw error;
  }
  return { profileImageUrl: data.profile_image_url };
};

export const setUserProfile = async (user: User, userProfile: UserProfile) => {
  const { error } = await supabase
    .from("user_profiles")
    .upsert({ user_id: user.id, profile_image_url: userProfile.profileImageUrl }, { onConflict: "user_id" });
  if (error) {
    console.error("Failed to update user profile", error);
    throw error;
  }
};
