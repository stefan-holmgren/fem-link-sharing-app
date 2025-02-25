import { use, useEffect } from "react";
import { MobileAsideContext } from "../components/MobileAside/components/MobileAsideContext/MobileAsideContext";

export const useMobileSkeleton = (show: boolean) => {
  const mobileAsideContext = use(MobileAsideContext);

  useEffect(() => {
    mobileAsideContext.setShowSkeleton(show);
  }, [mobileAsideContext, show]);
};
