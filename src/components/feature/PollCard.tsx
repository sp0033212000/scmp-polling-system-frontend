import React, { useMemo } from "react";
import { PollVoteCardProps } from "@/components/feature/PollVoteCard";
import { format } from "date-fns";
import Link from "next/link";

const PollCard: React.FC<PollVoteCardProps> = ({
  id,
  title,
  published_date,
}) => {
  // format example: "15 JAN 2018"
  const theDate = useMemo(
    () => format(new Date(published_date * 1000), "dd MMM yyyy"),
    [published_date],
  );
  return (
    <Link href={`/${id}`} className={"flex items-start w-full"}>
      <div className={"mr-4 w-[6.25rem] h-[6.25rem] flex-shrink-0"}>
        <Placeholder />
      </div>
      <div className={"flex flex-col justify-center"}>
        <p className={"text-gray-500"}>{theDate}</p>
        <h3 className={"font-bold"}>{title}</h3>
      </div>
    </Link>
  );
};

export default PollCard;

const Placeholder = () => {
  const data = [50, 50]; // Represents the two data points
  const colors = ["#FF6384", "#36A2EB"]; // Colors for each data point
  const total = data.reduce((a, b) => a + b, 0);

  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const strokes = data.map((value) => (value / total) * circumference);

  return (
    <div className={"relative"}>
      <svg viewBox="0 0 100 100">
        <circle
          r={radius}
          cx="50"
          cy="50"
          fill="transparent"
          stroke={colors[0]}
          strokeWidth="20"
          strokeDasharray={`${strokes[0]} ${circumference}`}
          transform="rotate(45 50 50)"
        />
        <circle
          r={radius}
          cx="50"
          cy="50"
          fill="transparent"
          stroke={colors[1]}
          strokeWidth="20"
          strokeDasharray={`${strokes[1]} ${circumference}`}
          strokeDashoffset={circumference}
          transform="rotate(45 50 50)"
        />
      </svg>
      <div className={"absolute inset-0 flex items-center justify-center"}>
        <p className={"font-bold text-3xl"}>%</p>
      </div>
    </div>
  );
};
