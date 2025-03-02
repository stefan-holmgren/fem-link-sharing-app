import { supabase } from "@/config/supabase";
import { UserProfileData } from "../userProfile.data";

const downloadProfilePicture = async (profileImagePath: string) => {
  const { data: profilePicture, error: profilePictureError } = await supabase.storage.from("profile_pictures").download(profileImagePath);
  if (profilePictureError) {
    console.error("Error downloading profile picture: ", profilePictureError);
  }
  return profilePicture ? new File([profilePicture], profileImagePath, { type: profilePicture.type }) : undefined;
};

export const userProfileDataSupabase: UserProfileData = {
  async getUserProfile(user) {
    const { data: userProfile } = await supabase
      .from("user_profiles")
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
    const { data: existingUserProfile } = await supabase.from("user_profiles").select("profile_image_path").eq("user_id", user.id).limit(1).maybeSingle();

    const previousProfileImagePath: string | undefined = existingUserProfile?.profile_image_path;

    const newProfileImagePath =
      userProfile.profileImageFile && userProfile.profileImageFile.name !== previousProfileImagePath
        ? `${user.id}/profile_picture${Date.now().toString(36)}`
        : previousProfileImagePath;

    // If we have changed the profile picture, we need to delete the old one and upload the new one
    if (newProfileImagePath !== previousProfileImagePath) {
      if (previousProfileImagePath) {
        const { error: profilePictureDeleteError } = await supabase.storage.from("profile_pictures").remove([previousProfileImagePath]);
        if (profilePictureDeleteError) {
          console.error("Error deleting profile picture: ", profilePictureDeleteError);
        }
      }

      if (newProfileImagePath && userProfile.profileImageFile) {
        const { error: profilePictureUploadError } = await supabase.storage
          .from("profile_pictures")
          .upload(newProfileImagePath, userProfile.profileImageFile, { cacheControl: "3600" });
        if (profilePictureUploadError) {
          console.error("Error uploading profile picture: ", profilePictureUploadError);
        }
      }
    }

    const { error: userProfileUpdateError } = await supabase.from("user_profiles").upsert(
      {
        user_id: user.id,
        first_name: userProfile.firstName,
        last_name: userProfile.lastName,
        email: userProfile.email,
        profile_image_path: newProfileImagePath,
      },
      { onConflict: "user_id" }
    );

    if (userProfileUpdateError) {
      throw userProfileUpdateError;
    }
  },
};
