import { supabase } from "@/config/supabase";
import { UserLinksData } from "../userLinks.data";

export const userLinksDataSupabase: UserLinksData = {
  getUserLinks: async (userId) => {
    const { data, error } = await supabase.from("link_sharing").select("links").eq("user_id", userId).limit(1).single();
    if (error) {
      throw error;
    }

    return data.links ?? [];
  },

  updateUserLinks: async (userId, userLinks) => {
    const { error } = await supabase.from("link_sharing").upsert({ user_id: userId, links: userLinks }, { onConflict: "user_id" });
    if (error) {
      throw error;
    }
  },
};
