import { useEffect, useRef } from "react";
import { Mobile } from "./components/Mobile/Mobile";
import styles from "./MobileAside.module.css";
import { UserLink } from "@/pages/App/Links/data/userLinks.data";
import { UserProfile } from "@/pages/App/Profile/data/userProfile.data";

type MobileAsideProps = {
  showSkeleton?: boolean;
  userLinks?: UserLink[] | null;
  userProfile?: UserProfile | null;
};
export const MobileAside = ({ showSkeleton, userLinks, userProfile }: MobileAsideProps) => {
  const asideRef = useRef<HTMLElement>(null);
  const mobileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const aside = asideRef.current;
    const mobile = mobileRef.current;

    if (!aside || !mobile) {
      return;
    }

    const calculateScale = () => {
      const computedStyle = getComputedStyle(aside);
      const asideHeight = aside.clientHeight - parseFloat(computedStyle.paddingTop) - parseFloat(computedStyle.paddingBottom);
      const asideWidth = aside.clientWidth - parseFloat(computedStyle.paddingLeft) - parseFloat(computedStyle.paddingRight);

      const calculateScaleFactor = (containerSize: number, contentSize: number) => Math.min(1.0, Math.max(containerSize / contentSize, 0.5));

      const yScale = calculateScaleFactor(asideHeight, mobile.clientHeight);
      const xScale = calculateScaleFactor(asideWidth, mobile.clientWidth);
      const scale = Math.min(xScale, yScale);

      aside.style.setProperty("--scale-content", scale.toString());
    };

    const resizeObserver = new ResizeObserver(calculateScale);
    resizeObserver.observe(aside);

    calculateScale();
    return () => resizeObserver.disconnect();
  }, []);

  return (
    <aside className={styles["mobile-aside"]} ref={asideRef}>
      <Mobile className={styles.mobile} showSkeleton={showSkeleton} userLinks={userLinks} userProfile={userProfile} ref={mobileRef} />
    </aside>
  );
};
