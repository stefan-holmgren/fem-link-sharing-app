import { useAuthContext } from "@/hooks/useAuthContext";
import { useQuery } from "@tanstack/react-query";
import { userProfileData } from "../data/userProfile.data";

export const useGetUserProfile = () => {
  const { user } = useAuthContext();

  const { data, ...props } = useQuery({
    queryKey: ["userProfile", user?.id],
    queryFn: () => (user ? userProfileData.getUserProfile(user) : null),
    enabled: !!user,
  });
  return { ...props, userProfile: data };
};
