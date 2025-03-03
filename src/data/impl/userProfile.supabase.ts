import { supabase } from "@/config/supabase";
import { UserProfileData } from "../userProfile.data";

const downloadProfilePicture = async (profileImagePath: string) => {
  const { data: profilePicture, error: profilePictureError } = await supabase.storage.from("user_data").download(profileImagePath);
  if (profilePictureError) {
    console.error("Error downloading profile picture: ", profilePictureError);
  }
  return profilePicture ? new File([profilePicture], profileImagePath, { type: profilePicture.type }) : undefined;
};

export const userProfileDataSupabase: UserProfileData = {
  async getUserProfile(user) {
    const { data: userProfile } = await supabase
      .from("link_sharing")
      .select("first_name, last_name, email, profile_image_path")
      .eq("user_id", user.id)
      .limit(1)
      .maybeSingle();

    if (!userProfile) {
      return null;
    }

    const profileImageFile = userProfile.profile_image_path ? await downloadProfilePicture(userProfile.profile_image_path) : undefined;

    return {
      firstName: userProfile.first_name,
      lastName: userProfile.last_name,
      email: userProfile.email,
      profileImageFile: profileImageFile,
    };
  },

  async updateUserProfile(user, userProfile) {
    const profileImagePath = userProfile.profileImageFile ? `${user.id}/link_sharing_profile_picture` : undefined;
    if (userProfile.profileImageFile && profileImagePath) {
      const { error: profilePictureUploadError } = await supabase.storage
        .from("user_data")
        .upload(profileImagePath, userProfile.profileImageFile, { upsert: true, cacheControl: "3600" });
      if (profilePictureUploadError) {
        console.error("Error uploading profile picture: ", profilePictureUploadError);
      }
    }

    const { error: userProfileUpdateError } = await supabase.from("link_sharing").upsert(
      {
        user_id: user.id,
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
