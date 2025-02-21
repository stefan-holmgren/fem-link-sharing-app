import styles from "./Links.module.css";
import { useAuthContext } from "../../../components/AuthContext/useAuthContext";
import { Link } from "react-router-dom";
import { LinkForm } from "./components/LinkForm/LinkForm";
import { Profile } from "./components/Profile/Profile";

export const Links = () => {
  const { user } = useAuthContext();

  return (
    <main className={styles.links}>
      <h1>Home</h1>
      {user ? (
        <>
          <p>Welcome, {user.email}</p>
          <Link to="/logout">Logout</Link>
        </>
      ) : (
        <p>{user === undefined ? "Loading..." : <Link to="/login">Login</Link>}</p>
      )}
      {!!user && <Profile user={user} />}
      {!!user && <LinkForm user={user} />}
    </main>
  );
};
