// hooks/useCompetitions.ts
import { useQuery } from "@tanstack/react-query";

export type Competition = {
    id: number;
    name: string;
    code: string;
    emblem: string;
};

export const useCompetitions = () => {
    return useQuery<Competition[]>({
        queryKey: ["competitions"],
        queryFn: async () => {
            const res = await fetch("http://localhost:8080/api/competitions/active");
            if (!res.ok) throw new Error("Failed to fetch competitions");
            return res.json();
        }
    });
};
