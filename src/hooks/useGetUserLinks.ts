import { useQuery } from "@tanstack/react-query";
import { userLinksData } from "../data/userLinks.data";
import { useAuthContext } from "./useAuthContext";

export const useGetUserLinks = (userId: string | undefined) => {
  const { user } = useAuthContext();
  const localData = !!user?.isAnonymous;

  const { data, ...props } = useQuery({
    queryKey: ["userlinks", userId],
    queryFn: () => (userId ? userLinksData.getUserLinks(userId, localData) : []),
    enabled: !!userId,
  });
  return { ...props, userLinks: data };
};
