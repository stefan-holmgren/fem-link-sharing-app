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
      throw profilePictureError;
    }

    const profileImageFile = new File([profilePicture], userProfile.profile_image_path, { type: profilePicture.type });

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

    if (existingUserProfile) {
      const previousProfileImagePath: string = existingUserProfile.profile_image_path;
      if (userProfile.profileImageFile?.name !== previousProfileImagePath) {
        const { error: profilePictureDeleteError } = await supabase.storage.from("profile_pictures").remove([previousProfileImagePath]);
        if (profilePictureDeleteError) {
          throw profilePictureDeleteError;
        }
      }
    }

    const newProfileImagePath = `${user.id}/profile_picture${Date.now().toString(36)}`;
    if (userProfile.profileImageFile) {
      const { error: profilePictureUploadError } = await supabase.storage
        .from("profile_pictures")
        .upload(newProfileImagePath, userProfile.profileImageFile, { cacheControl: "3600" });
      if (profilePictureUploadError) {
        throw profilePictureUploadError;
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
