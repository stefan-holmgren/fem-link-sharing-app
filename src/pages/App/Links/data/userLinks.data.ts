import { User } from "@/components/AuthContext/AuthContext";
import { userLinksDataLocalStorage } from "./impl/userLinks.localstorage";
import { userLinksDataSupabase } from "./impl/userLinks.supabase";

export const platforms = ["github", "frontend-mentor", "x", "linkedin", "youtube"] as const;
export type Platform = (typeof platforms)[number];

export type UserLink = {
  platform: Platform;
  url: string;
};

export interface UserLinksData {
  getUserLinks(user: User): Promise<UserLink[]>;
  updateUserLinks(user: User, userLinks: UserLink[]): Promise<void>;
}

export const userLinksData: UserLinksData = {
  getUserLinks: async (user) => {
    if (user.isAnonymous) {
      return userLinksDataLocalStorage.getUserLinks(user);
    }
    return userLinksDataSupabase.getUserLinks(user);
  },
  updateUserLinks: async (user, userLinks) => {
    if (user.isAnonymous) {
      return userLinksDataLocalStorage.updateUserLinks(user, userLinks);
    }
    return userLinksDataSupabase.updateUserLinks(user, userLinks);
  },
};
