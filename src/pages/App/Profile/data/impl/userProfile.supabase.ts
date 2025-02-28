import { supabase } from "@/config/supabase";
import { UserProfileData } from "../userProfile.data";

export const userProfileDataSupabase: UserProfileData = {
  async getUserProfile(user) {
    const { data: userProfile, error: userDataError } = await supabase
      .from("user_profiles")
      .select("first_name, last_name, email, profile_image_path")
      .eq("user_id", user.id)
      .limit(1)
      .single();

    if (userDataError) {
      throw userDataError;
    }

    const { data: profilePicture, error: profilePictureError } = await supabase.storage.from("profile_pictures").download(userProfile.profile_image_path);
    if (profilePictureError) {
      console.error("Error downloading profile picture: ", profilePictureError);
    }

    const profileImageFile = profilePicture ? new File([profilePicture], userProfile.profile_image_path, { type: profilePicture.type }) : undefined;

    return {
      firstName: userProfile.first_name,
      lastName: userProfile.last_name,
      email: userProfile.email,
      profileImageFile: profileImageFile,
    };
  },

  async updateUserProfile(user, userProfile) {
    const { data: existingUserProfile, error: userDataError } = await supabase
      .from("user_profiles")
      .select("profile_image_path")
      .eq("user_id", user.id)
      .limit(1)
      .single();

    if (userDataError) {
      throw userDataError;
    }

    const previousProfileImagePath: string = existingUserProfile?.profile_image_path;
    const newProfileImagePath =
      !previousProfileImagePath || userProfile.profileImageFile?.name !== previousProfileImagePath
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

      if (userProfile.profileImageFile) {
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
