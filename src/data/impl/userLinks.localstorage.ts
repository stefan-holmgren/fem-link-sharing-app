import { UserLinksData } from "../userLinks.data";

const userLinksKey = "fem-link-sharing-app:user_links";

export const userLinksDataLocalStorage: UserLinksData = {
  getUserLinks: async () => {
    const userLinks = localStorage.getItem(userLinksKey);
    if (!userLinks) {
      return [];
    }
    return JSON.parse(userLinks);
  },
  updateUserLinks: async (_, userLinks) => {
    localStorage.setItem(userLinksKey, JSON.stringify(userLinks));
  },
};
