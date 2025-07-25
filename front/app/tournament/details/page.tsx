"use client";

"use client";

import React from 'react';
import MatchPrediction from '@/components/match/MatchPrediction';
import { useMatchSummary } from '@/hooks/useMatchSum';

const MatchDetails = () => {
  const id = "w0OkZslXLw3ZXr85sGAQ"; // tournament or competition ID
  const { data, isLoading, error } = useMatchSummary(id);

  console.log("MatchDetails data:", data);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading match data.</p>;
  if (!data || data.length === 0) return <p>No matches found.</p>;

  return (
    <div className="space-y-6">
      {data.map((match, index) => (
        <MatchPrediction
          key={`${match.utcDate}-${match.homeTeamName}-${match.awayTeamName}-${index}`}
          matchSummary={match}
        />
      ))}
    </div>
  );
};

export default MatchDetails;
