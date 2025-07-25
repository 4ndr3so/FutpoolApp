// hooks/useCompetitions.ts


import { useUserById } from "@/services/api/userApi";




export const useUser = (userId: string) => {
    //other logic if needed
    return useUserById(userId);
};
