import { use, useEffect } from "react";
import { MobileAsideContext } from "../components/MobileAside/components/MobileAsideContext/MobileAsideContext";
import { UserLink } from "@/data/userLinks.data";
import { UserProfile } from "@/data/userProfile.data";

type UseMobileMockupProps = {
  showSkeleton?: boolean;
  userLinks?: UserLink[] | null;
  userProfile?: UserProfile | null;
};

export const useMobileMockup = ({ showSkeleton = true, userLinks, userProfile }: UseMobileMockupProps) => {
  const mobileAsideContext = use(MobileAsideContext);

  useEffect(() => {
    mobileAsideContext.setShowSkeleton(showSkeleton);
    mobileAsideContext.setUserLinks(userLinks);
    mobileAsideContext.setUserProfile(userProfile);
  }, [mobileAsideContext, showSkeleton, userLinks, userProfile]);
};
