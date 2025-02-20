import { User } from "@/components/AuthContext/AuthContext";
import { supabase } from "@/config/supabase";

export type UserLink = {
  platform: "github" | "youtube";
  url: string;
};

export const getUserLinks = async (user: User): Promise<UserLink[]> => {
  const { data, error } = await supabase.from("user_links").select("links").eq("user_id", user.id).limit(1).single();
  if (error) {
    throw error;
  }

  return data.links ?? [];
};

export const updateUserLinks = async (user: User, userLinks: UserLink[]) => {
  const { error } = await supabase.from("user_links").upsert({ user_id: user.id, links: userLinks }, { onConflict: "user_id" });
  if (error) {
    throw error;
  }
};
