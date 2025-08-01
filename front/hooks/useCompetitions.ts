// hooks/useCompetitions.ts
import { Competition } from "@/types";
import { fetchActiveCompetitions } from "@/services/api/fetchActiveCompetitions";
import { useQuery } from "@tanstack/react-query";



export const useCompetitions = () => {
    return useQuery<Competition[]>({
        queryKey: ["competitions"],
         queryFn: fetchActiveCompetitions,
    });
};
