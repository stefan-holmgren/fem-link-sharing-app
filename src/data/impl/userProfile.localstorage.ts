import { downloadFileAsDataUrl } from "@/utils/file.utils";
import { UserProfileData } from "../userProfile.data";

const userProfileKey = "fem-link-sharing-app:user_profile";
const userProfileImageKey = "fem-link-sharing-app:user_profile_image";

export const userProfileDataLocalStorage: UserProfileData = {
  async getUserProfile() {
    const userProfile = localStorage.getItem(userProfileKey);
    const userProfileImageDataUrl = localStorage.getItem(userProfileImageKey);

    if (!userProfile) {
      return null;
    }

    const blob = userProfileImageDataUrl ? await fetch(userProfileImageDataUrl).then((res) => res.blob()) : undefined;
    const profileImageFile = blob ? new File([blob], "profile-image", { type: blob.type }) : undefined;

    return { ...JSON.parse(userProfile), profileImageFile };
  },

  async getPublicUserProfile() {
    throw new Error("Method not implemented - no public user profile in local storage");
  },

  async updateUserProfile(_, userProfile) {
    const { profileImageFile, ...rest } = userProfile;
    localStorage.setItem(userProfileKey, JSON.stringify(rest));
    if (profileImageFile) {
      const imageDataUrl = await downloadFileAsDataUrl(profileImageFile);
      localStorage.setItem(userProfileImageKey, imageDataUrl);
    } else {
      localStorage.removeItem(userProfileImageKey);
    }
  },
};
