import styles from "./AppLayout.module.css";
import { Header } from "@/components/Header/Header";
import { MobileAside } from "./components/MobileAside/MobileAside";
import { Outlet } from "react-router-dom";
import { useState } from "react";
import { MobileAsideContext } from "./components/MobileAside/components/MobileAsideContext/MobileAsideContext";
import { UserLink } from "../Links/data/userLinks.data";
import { UserProfile } from "../Profile/data/userProfile.data";

export const AppLayout = () => {
  const [showSkeleton, setShowSkeleton] = useState(true);
  const [userLinks, setUserLinks] = useState<UserLink[] | null>();
  const [userProfile, setUserProfile] = useState<UserProfile | null>();

  return (
    <div className={styles["app-layout"]}>
      <Header />
      <div>
        <MobileAsideContext.Provider value={{ setShowSkeleton, setUserLinks, setUserProfile }}>
          <MobileAside showSkeleton={showSkeleton} userLinks={userLinks} userProfile={userProfile} />
          <main>
            <Outlet />
          </main>
        </MobileAsideContext.Provider>
      </div>
    </div>
  );
};
