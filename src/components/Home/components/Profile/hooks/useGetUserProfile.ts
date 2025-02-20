import { useAuthContext } from "@/components/AuthContext/useAuthContext";
import { useCallback, useEffect, useState, useTransition } from "react";
import * as up from "../data/userProfile.data";

export const useUserProfile = () => {
  const { user } = useAuthContext();
  const [isPending, createTransition] = useTransition();
  const [userProfile, setUserProfile] = useState<up.UserProfile | null | undefined>();

  useEffect(() => {
    if (!user) {
      return;
    }
    createTransition(async () => {
      setUserProfile(await up.getUserProfile(user));
    });
  }, [user, createTransition]);

  const updateUserProfile = useCallback(
    async (newUserProfile: up.UserProfile) => {
      if (!user) {
        return;
      }
      createTransition(async () => {
        await up.setUserProfile(user, newUserProfile);
        setUserProfile(newUserProfile);
      });
    },
    [user]
  );

  return { isPending, userProfile, updateUserProfile };
};
