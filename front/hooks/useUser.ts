// hooks/useCompetitions.ts


import { User } from "@/app/types";
import { apiFetchUserById } from "@/services/api/userApi";
import { useQuery } from "@tanstack/react-query";




export const useUserById = (userId: string) => {
  return useQuery<User>({
    queryKey: ["user", userId],
    queryFn: () => apiFetchUserById(userId),
    enabled: !!userId,
  });
};
