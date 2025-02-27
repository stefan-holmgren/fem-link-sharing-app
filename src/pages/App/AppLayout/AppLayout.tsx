import styles from "./AppLayout.module.css";
import { Header } from "@/components/Header/Header";
import { MobileAside } from "./components/MobileAside/MobileAside";
import { Outlet } from "react-router-dom";
import { useState } from "react";
import { MobileAsideContext } from "./components/MobileAside/components/MobileAsideContext/MobileAsideContext";
import { UserLink } from "../Links/data/userLinks.data";

export const AppLayout = () => {
  const [showSkeleton, setShowSkeleton] = useState(true);
  const [userLinks, setUserLinks] = useState<UserLink[]>([]);

  return (
    <div className={styles["app-layout"]}>
      <Header />
      <div>
        <MobileAsideContext.Provider value={{ setShowSkeleton, setUserLinks }}>
          <MobileAside showSkeleton={showSkeleton} userLinks={userLinks} />
          <main>
            <Outlet />
          </main>
        </MobileAsideContext.Provider>
      </div>
    </div>
  );
};
