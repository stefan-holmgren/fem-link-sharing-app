import { User } from "@/components/AuthContext/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { getUserLinks } from "../utils/userLinks.utils";

export const useGetUserLinks = (user: User) => {
  const { data, ...props } = useQuery({ queryKey: ["userlinks", user.id], queryFn: () => getUserLinks(user) });
  return { ...props, userLinks: data };
};
