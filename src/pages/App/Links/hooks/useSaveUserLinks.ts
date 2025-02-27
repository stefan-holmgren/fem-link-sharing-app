import { useMutation, useQueryClient } from "@tanstack/react-query";
import { userLinksData, UserLink } from "../data/userLinks.data";
import { useAuthContext } from "@/hooks/useAuthContext";

export const useSaveUserLinks = () => {
  const queryClient = useQueryClient();
  const { user } = useAuthContext();

  return useMutation({
    mutationFn: ({ links }: { links: UserLink[] }) => {
      if (!user) {
        throw new Error("User is not authenticated");
      }
      return userLinksData.updateUserLinks(user, links);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userlinks", user?.id] });
    },
    onError: (error) => {
      console.error("Error saving links: ", error);
    },
  });
};
