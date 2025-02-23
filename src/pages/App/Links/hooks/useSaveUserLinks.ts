import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUserLinks, UserLink } from "../data/userLinks.data";
import { useAuthContext } from "@/components/AuthContext/useAuthContext";

export const useSaveUserLinks = () => {
  const queryClient = useQueryClient();
  const { user } = useAuthContext();

  return useMutation({
    mutationFn: ({ links }: { links: UserLink[] }) => {
      if (!user) {
        throw new Error("User is not authenticated");
      }
      return updateUserLinks(user, links);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userlinks", user?.id] });
    },
    onError: (error) => {
      console.error("Error saving links: ", error);
    },
  });
};
