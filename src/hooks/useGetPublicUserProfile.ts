import { useQuery } from "@tanstack/react-query";
import { userProfileData } from "../data/userProfile.data";

export const useGetPublicUserProfile = (userId: string | undefined) => {
  const { data, ...props } = useQuery({
    queryKey: ["publicUserProfile", userId],
    queryFn: () => (userId ? userProfileData.getPublicUserProfile(userId) : null),
    enabled: !!userId,
  });
  return { ...props, userProfile: data };
};
