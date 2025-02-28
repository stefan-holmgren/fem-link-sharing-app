import { UserLink } from "@/pages/App/Links/data/userLinks.data";
import { UserProfile } from "@/pages/App/Profile/data/userProfile.data";
import { createContext } from "react";

type MobileAsideContextType = {
  setShowSkeleton: (show: boolean) => void;
  setUserLinks: (userLinks?: UserLink[] | null) => void;
  setUserProfile: (userProfle?: UserProfile | null) => void;
};

export const MobileAsideContext = createContext<MobileAsideContextType>({
  setShowSkeleton: () => {},
  setUserLinks: () => {},
  setUserProfile: () => {},
});
