import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUserLinks, UserLink } from "../data/userLinks.data";
import { User } from "@/components/AuthContext/AuthContext";

export const useSaveUserLinks = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ user, links }: { user: User; links: UserLink[] }) => updateUserLinks(user, links),
    onSuccess: (_data, { user }) => {
      alert("Links saved successfully!");
      queryClient.invalidateQueries({ queryKey: ["userlinks", user.id] });
    },
    onError: (error) => {
      console.error("Error saving links: ", error);
      alert("Failed to save links.");
    },
  });
};
