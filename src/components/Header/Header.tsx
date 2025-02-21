import { NavLink, useNavigate } from "react-router-dom";
import { HeaderLogo } from "../HeaderLogo/HeaderLogo";
import styles from "./Header.module.css";

export const Header = () => {
  const navigate = useNavigate();
  return (
    <header className={styles.header}>
      <nav>
        <HeaderLogo />
        <ul>
          <li>
            <NavLink to="/">
              <span>Links</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/profile">
              <span>Profile</span>
            </NavLink>
          </li>
        </ul>
        <button data-secondary onClick={() => navigate("/preview")}>
          <span>Preview</span>
        </button>
      </nav>
    </header>
  );
};
