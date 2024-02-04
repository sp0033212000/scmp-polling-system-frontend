"use client";

import VoteBtn from "@/components/common/VoteBtn";
import React, { useCallback } from "react";
import { SerializedAnswerOption } from "@/components/feature/PollVoteCard";

const VoteBtnGroup: React.FC<{
  poll_id: number;
  answer_id: number;
  options: SerializedAnswerOption[];
  voted: boolean;
}> = ({ poll_id, answer_id, options, voted }) => {
  const [isVoting, setIsVoting] = React.useState(false);

  const startVoting = useCallback(async (onVote: () => Promise<void>) => {
    try {
      setIsVoting(true);
      await onVote();
    } finally {
      setIsVoting(false);
    }
  }, []);

  return (
    <div className={"flex flex-col items-stretch space-y-2 w-fit"}>
      {options?.map((option) => (
        <VoteBtn
          key={option.id}
          color={option.color}
          poll_id={poll_id}
          answer_id={answer_id}
          option_id={option.id}
          disabled={voted || isVoting}
          startVoting={startVoting}
        >
          {option.label}
        </VoteBtn>
      ))}
    </div>
  );
};

export default VoteBtnGroup;
