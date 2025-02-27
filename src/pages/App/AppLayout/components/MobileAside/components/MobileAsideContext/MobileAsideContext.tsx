import { UserLink } from "@/pages/App/Links/data/userLinks.data";
import { createContext } from "react";

type MobileAsideContextType = {
  setShowSkeleton: (show: boolean) => void;
  setUserLinks: (userLinks: UserLink[]) => void;
};

export const MobileAsideContext = createContext<MobileAsideContextType>({
  setShowSkeleton: () => {},
  setUserLinks: () => {},
});
