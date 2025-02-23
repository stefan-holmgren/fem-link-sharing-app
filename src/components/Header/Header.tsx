import styles from "./Header.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import { HeaderLogo } from "../HeaderLogo/HeaderLogo";
import LinkIcon from "@/assets/icon-link.svg?react";
import ProfileIcon from "@/assets/icon-profile-details-header.svg?react";
import PreviewIcon from "@/assets/icon-preview-header.svg?react";
import { Button } from "@/components/Button/Button";

export const Header = () => {
  const navigate = useNavigate();
  return (
    <header className={styles.header}>
      <nav>
        <HeaderLogo />
        <ul>
          <li>
            <NavLink to="/">
              <LinkIcon />
              <span>Links</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/profile">
              <ProfileIcon />
              <span>Profile</span>
            </NavLink>
          </li>
        </ul>
        <Button variant="secondary" onClick={() => navigate("/preview")}>
          <PreviewIcon />
          <span>Preview</span>
        </Button>
      </nav>
    </header>
  );
};
