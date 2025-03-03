import { lazy, useEffect, useState } from "react";
import { fetchPublicProfile, PublicProfile as PublicProfileType } from "@/data/publicProfile.data";
import PublicProfile from "@/components/PublicProfile/PublicProfile";

const NotFound404 = lazy(() => import("../NotFound404/NotFound404"));

const Public = () => {
  const userId = window.location.pathname.split("/").pop();
  const [publicProfile, setPublicProfile] = useState<PublicProfileType | null>(null);
  const [error, setError] = useState<unknown | null>(null);

  useEffect(() => {
    if (!userId) {
      return;
    }
    fetchPublicProfile(userId).then(setPublicProfile).catch(setError);
  }, [userId]);

  if (!userId || error) {
    return <NotFound404 />;
  }

  if (!publicProfile) {
    return null;
  }

  return <PublicProfile publicProfile={publicProfile} />;
};

export default Public;
