import { getPublicUserProfilePath, getUserProfilePicturePath, supabase } from "@/config/supabase";
import { UserLink } from "./userLinks.data";
import { UserProfile } from "./userProfile.data";

export type PublicProfile = {
  name?: string;
  email?: string;
  profileImageUrl?: string;
  userLinks?: UserLink[];
};

export const fetchPublicProfile = async (userId: string): Promise<PublicProfile> => {
  const publicDataUrl = supabase.storage.from("user_data").getPublicUrl(getPublicUserProfilePath(userId)).data.publicUrl;
  const response = await fetch(publicDataUrl);
  if (!response.ok) {
    throw new Error("Failed to fetch public profile");
  }
  return response.json();
};

export const savePublicProfile = async (userId: string, { userProfile, userLinks }: { userProfile?: UserProfile | null; userLinks: UserLink[] }) => {
  const name = userProfile?.firstName && userProfile?.lastName ? `${userProfile?.firstName} ${userProfile?.lastName}`.trim() : undefined;
  const profileImageUrl = userProfile?.profileImageFile
    ? supabase.storage.from("user_data").getPublicUrl(getUserProfilePicturePath(userId)).data.publicUrl
    : undefined;

  const publicProfile: PublicProfile = {
    name,
    email: userProfile?.email,
    profileImageUrl,
    userLinks,
  };

  return supabase.storage
    .from("user_data")
    .upload(getPublicUserProfilePath(userId), JSON.stringify(publicProfile), { upsert: true, contentType: "application/json", cacheControl: "3600" });
};
