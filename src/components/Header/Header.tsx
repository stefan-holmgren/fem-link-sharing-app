import styles from "./Header.module.css";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { HeaderLogo } from "../HeaderLogo/HeaderLogo";
import LinkIcon from "@/assets/icon-link.svg?react";
import ProfileIcon from "@/assets/icon-profile-details-header.svg?react";
import PreviewIcon from "@/assets/icon-preview-header.svg?react";
import { Button } from "@/components/Button/Button";
import { useAnimate } from "motion/react";
import { useCallback, useEffect } from "react";

export const Header = () => {
  const [scope, animate] = useAnimate();
  const navigate = useNavigate();
  const location = useLocation();

  const resetAnimatedBackground = useCallback(() => {
    const activeLink = scope.current.querySelector(".active");
    if (!activeLink) {
      return;
    }
    const { offsetLeft, offsetWidth } = activeLink;

    scope.current.style.setProperty("--_width", `${offsetWidth}px`);
    scope.current.style.setProperty("--_left", `${offsetLeft}px`);
  }, [scope]);

  useEffect(() => {
    resetAnimatedBackground();

    const resizeObserver = new ResizeObserver(() => {
      resetAnimatedBackground();
    });

    resizeObserver.observe(scope.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, [resetAnimatedBackground, scope]);

  useEffect(() => {
    const activeLink = scope.current.querySelector(".active");
    if (!activeLink) {
      return;
    }

    const { offsetLeft, offsetWidth } = activeLink;
    animate(scope.current, { "--_width": `${offsetWidth}px`, "--_left": `${offsetLeft}px` }, { duration: 0.2 });
  }, [animate, location, scope]);

  return (
    <header className={styles.header}>
      <nav>
        <HeaderLogo />
        <ul ref={scope}>
          <li>
            <NavLink to="/">
              <LinkIcon aria-hidden />
              <span>Links</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/profile">
              <ProfileIcon aria-hidden />
              <span>Profile Details</span>
            </NavLink>
          </li>
        </ul>
        <Button variant="secondary" onClick={() => navigate(`/preview`, { state: { from: location.pathname } })}>
          <PreviewIcon aria-hidden />
          <span>Preview</span>
        </Button>
      </nav>
    </header>
  );
};
