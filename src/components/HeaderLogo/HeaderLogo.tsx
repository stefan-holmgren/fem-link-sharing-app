import styles from "./HeaderLogo.module.css";
import logoLarge from "@/assets/logo-devlinks-large.svg";
import logoSmall from "@/assets/logo-devlinks-small.svg";

export const HeaderLogo = () => {
  return (
    <picture className={styles["header-logo"]}>
      <source media="(min-width: 768px)" srcSet={logoLarge} />
      <source srcSet={logoSmall} />
      <img src={logoLarge} alt="Logo" />
    </picture>
  );
};
