import { use, useEffect } from "react";
import { MobileAsideContext } from "../components/MobileAside/components/MobileAsideContext/MobileAsideContext";

type UseMobileMockupProps = {
  showSkeleton?: boolean;
};

export const useMobileMockup = ({ showSkeleton = true }: UseMobileMockupProps) => {
  const mobileAsideContext = use(MobileAsideContext);

  useEffect(() => {
    mobileAsideContext.setShowSkeleton(showSkeleton);
  }, [mobileAsideContext, showSkeleton]);
};
