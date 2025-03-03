import { useParams } from "react-router-dom";
import styles from "./Public.module.css";
import { useGetUserLinks } from "@/hooks/useGetUserLinks";
import { useGetPublicUserProfile } from "@/hooks/useGetPublicUserProfile";
import NotFound404 from "../NotFound404/NotFound404";

const Public = () => {
  const userId: string | undefined = useParams().userId;
  const { userLinks } = useGetUserLinks(userId);
  const { userProfile } = useGetPublicUserProfile(userId);

  if (!userId) {
    return <NotFound404 />;
  }

  return (
    <main className={styles.public}>
      <h1>Public</h1>
      <p>UserId: {userId}</p>
      <p>User Links: {JSON.stringify(userLinks)}</p>
      <p>User Profile: {JSON.stringify(userProfile)}</p>
    </main>
  );
};

export default Public;
