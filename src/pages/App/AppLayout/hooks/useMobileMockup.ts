import { use, useEffect } from "react";
import { MobileAsideContext } from "../components/MobileAside/components/MobileAsideContext/MobileAsideContext";
import { UserLink } from "../../Links/data/userLinks.data";

type UseMobileMockupProps = {
  showSkeleton?: boolean;
  userLinks: UserLink[];
};

export const useMobileMockup = ({ showSkeleton = true, userLinks }: UseMobileMockupProps) => {
  const mobileAsideContext = use(MobileAsideContext);

  useEffect(() => {
    mobileAsideContext.setShowSkeleton(showSkeleton);
    mobileAsideContext.setUserLinks(userLinks);
  }, [mobileAsideContext, showSkeleton, userLinks]);
};
