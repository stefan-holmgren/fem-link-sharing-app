import { useAuthContext } from "@/hooks/useAuthContext";
import { useQuery } from "@tanstack/react-query";
import { userProfileData } from "../data/userProfile.data";

export const useGetUserProfile = (userId: string | undefined) => {
  const { user } = useAuthContext();
  const localData = !!user?.isAnonymous;

  const { data, ...props } = useQuery({
    queryKey: ["userProfile", userId],
    queryFn: () => (userId ? userProfileData.getUserProfile(userId, localData) : null),
    enabled: !!userId,
  });
  return { ...props, userProfile: data };
};
