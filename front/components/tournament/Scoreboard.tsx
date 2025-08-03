// components/tournament/Scoreboard.tsx
import { useScoreboard } from "@/hooks/useScoreboard";

type Props = {
  tournamentId: string;
};

export default function Scoreboard({ tournamentId }: Props) {
  const { data: scoreboard, isLoading, isError } = useScoreboard(tournamentId);

  if (isLoading) return <p>Loading scoreboard...</p>;
  if (isError || !scoreboard) return <p>Failed to load scoreboard.</p>;

  return (
    <div className="bg-white rounded shadow p-4">
      <h3 className="text-lg font-bold mb-4">Scoreboard</h3>
      <table className="w-full table-auto text-sm text-left">
        <thead>
          <tr className="text-gray-600 border-b">
            <th className="p-2">#</th>
            <th className="p-2">User ID</th>
            <th className="p-2 text-right">Points</th>
          </tr>
        </thead>
        <tbody>
          {scoreboard
            .sort((a, b) => b.points - a.points)
            .map((participant, index) => (
              <tr key={participant.userId} className="border-b">
                <td className="p-2">{index + 1}</td>
                <td className="p-2">{participant.username}</td>
                <td className="p-2 text-right font-semibold">{participant.points}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
