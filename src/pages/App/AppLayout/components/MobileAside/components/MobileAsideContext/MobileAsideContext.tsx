import { createContext } from "react";

type MobileAsideContextType = {
  showSkeleton: boolean;
  setShowSkeleton: (show: boolean) => void;
};

export const MobileAsideContext = createContext<MobileAsideContextType>({
  showSkeleton: false,
  setShowSkeleton: () => {},
});
