import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(import.meta.env.VITE_SUPABASE_PROJECT_URL, import.meta.env.VITE_SUPABASE_API_KEY);

export const getUserProfilePicturePath = (userId: string) => `${userId}/link_sharing_profile_picture`;

export const getPublicUserProfilePath = (userId: string) => `${userId}/link-sharing.json`;
