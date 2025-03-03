import { getUserProfilePicturePath, supabase } from "@/config/supabase";
import { UserProfileData } from "../userProfile.data";

const downloadProfilePicture = async (profileImagePath: string) => {
  const { data: profilePicture } = await supabase.storage.from("user_data").download(profileImagePath);
  return profilePicture ? new File([profilePicture], profileImagePath, { type: profilePicture.type }) : undefined;
};

const fetchUserProfileFromSupabase = async (
  userId: string
): Promise<{
  first_name?: string;
  last_name?: string;
  email?: string;
  profile_image_path?: string;
} | null> => {
  const { data } = await supabase.from("link_sharing").select("first_name, last_name, email, profile_image_path").eq("user_id", userId).limit(1).maybeSingle();

  if (!data) {
    return null;
  }

  return {
    first_name: data.first_name,
    last_name: data.last_name,
    email: data.email,
    profile_image_path: data.profile_image_path,
  };
};

export const userProfileDataSupabase: UserProfileData = {
  async getUserProfile(userId) {
    const userProfile = await fetchUserProfileFromSupabase(userId);
    if (!userProfile) {
      return null;
    }

    const profileImageFile = userProfile.profile_image_path ? await downloadProfilePicture(userProfile.profile_image_path) : undefined;

    return {
      firstName: userProfile.first_name ?? "",
      lastName: userProfile.last_name ?? "",
      email: userProfile.email,
      profileImageFile: profileImageFile,
    };
  },

  async updateUserProfile(userId, userProfile) {
    const profileImagePath = userProfile.profileImageFile ? getUserProfilePicturePath(userId) : undefined;
    if (userProfile.profileImageFile && profileImagePath) {
      await supabase.storage.from("user_data").upload(profileImagePath, userProfile.profileImageFile, { upsert: true, cacheControl: "3600" });
    }

    const { error: userProfileUpdateError } = await supabase.from("link_sharing").upsert(
      {
        user_id: userId,
        first_name: userProfile.firstName,
        last_name: userProfile.lastName,
        email: userProfile.email,
        profile_image_path: profileImagePath,
      },
      { onConflict: "user_id" }
    );

    if (userProfileUpdateError) {
      throw userProfileUpdateError;
    }
  },
};
