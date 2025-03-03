import { userLinksDataLocalStorage } from "./impl/userLinks.localstorage";
import { userLinksDataSupabase } from "./impl/userLinks.supabase";

export const platforms = ["github", "frontend-mentor", "x", "linkedin", "youtube"] as const;
export type Platform = (typeof platforms)[number];

export type UserLink = {
  platform: Platform;
  url: string;
};

export interface UserLinksData {
  getUserLinks(userId: string): Promise<UserLink[]>;
  updateUserLinks(userId: string, userLinks: UserLink[]): Promise<void>;
}

export const userLinksData = {
  getUserLinks: async (userId: string, local: boolean) => {
    if (local) {
      return userLinksDataLocalStorage.getUserLinks(userId);
    }
    return userLinksDataSupabase.getUserLinks(userId);
  },
  updateUserLinks: async (userId: string, userLinks: UserLink[], local: boolean) => {
    if (local) {
      return userLinksDataLocalStorage.updateUserLinks(userId, userLinks);
    }
    return userLinksDataSupabase.updateUserLinks(userId, userLinks);
  },
};
