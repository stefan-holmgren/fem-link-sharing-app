import { useQuery } from "@tanstack/react-query";
import { userLinksData } from "../data/userLinks.data";
import { useAuthContext } from "@/hooks/useAuthContext";

export const useGetUserLinks = () => {
  const { user } = useAuthContext();

  const { data, ...props } = useQuery({
    queryKey: ["userlinks", user?.id],
    queryFn: () => (user ? userLinksData.getUserLinks(user) : []),
    enabled: !!user,
  });
  return { ...props, userLinks: data };
};
