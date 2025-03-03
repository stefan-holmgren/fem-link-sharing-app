import { useAuthContext } from "@/hooks/useAuthContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UserProfile, userProfileData } from "../data/userProfile.data";

export const useSaveUserProfile = () => {
  const queryClient = useQueryClient();
  const { user } = useAuthContext();

  return useMutation({
    mutationFn: ({ userProfile }: { userProfile: UserProfile }) => {
      if (!user) {
        throw new Error("User is not authenticated");
      }
      const localData = user.isAnonymous;
      return userProfileData.updateUserProfile(user.id, userProfile, localData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userProfile", user?.id] });
    },
    onError: (error) => {
      console.error("Error saving user profile: ", error);
    },
  });
};
