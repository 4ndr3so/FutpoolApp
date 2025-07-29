
import React from 'react'
import classNames from "classnames";

type Props = {
    predictionScore:{home:number, away:number},
    realScore:{home:number, away:number},
    points:number
}





function PointsPerMatch({ predictionScore, realScore, points }: Props) {
  const isExact =
    predictionScore.home === realScore.home && predictionScore.away === realScore.away;

  const resultClass = classNames(
    "px-3 py-1 rounded font-semibold text-sm w-fit",
    {
      "bg-green-100 text-green-800 border border-green-400": isExact,
      "bg-yellow-100 text-yellow-800 border border-yellow-400": !isExact && points > 0,
      "bg-red-100 text-red-800 border border-red-400": points === 0,
    }
  );

  return (
    <div className="bg-white p-4 rounded shadow space-y-2 border border-gray-200">
      <div className="text-gray-600">
        <p className="font-medium">
          🧠 Prediction:{" "}
          <span className="text-black">
            {predictionScore.home} - {predictionScore.away}
          </span>
        </p>
        <p className="font-medium">
          ✅ Real Score:{" "}
          <span className="text-black">
            {realScore.home} - {realScore.away}
          </span>
        </p>
      </div>
      <div className={resultClass}>
        Points Awarded: {points}
      </div>
    </div>
  );
}


export default PointsPerMatch