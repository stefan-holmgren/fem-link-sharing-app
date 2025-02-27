import { supabase } from "@/config/supabase";
import { UserLinksData } from "../userLinks.data";

export const userLinksDataSupabase: UserLinksData = {
  getUserLinks: async (user) => {
    const { data, error } = await supabase.from("user_links").select("links").eq("user_id", user.id).limit(1).single();
    if (error) {
      throw error;
    }

    return data.links ?? [];
  },

  updateUserLinks: async (user, userLinks) => {
    const { error } = await supabase.from("user_links").upsert({ user_id: user.id, links: userLinks }, { onConflict: "user_id" });
    if (error) {
      throw error;
    }
  },
};
