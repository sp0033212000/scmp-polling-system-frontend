"use client";
import React, { PropsWithChildren, useCallback } from "react";
import classNames from "classnames";
import { CreateVoteDto } from "@/swagger/swagger.api";
import { SwaggerAPI } from "@/swagger";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

interface VoteBtnProps extends CreateVoteDto {
  color: string;
  disabled?: boolean;
  startVoting: (onVote: () => Promise<void>) => void;
}

const VoteBtn: React.FC<PropsWithChildren<VoteBtnProps>> = ({
  children,
  color,
  poll_id,
  option_id,
  answer_id,
  disabled,
  startVoting,
}) => {
  const router = useRouter();

  const vote = useCallback(
    () =>
      startVoting(async () => {
        try {
          await SwaggerAPI.voteApi.vote({
            poll_id,
            option_id,
            answer_id,
          });
          toast.success("Voted successfully");
          router.refresh();
        } catch (e) {
          const message =
            (e as any).response?.data?.message || "Failed to vote";
          toast.error(message);
        }
      }),
    [poll_id, option_id, answer_id, router, startVoting],
  );

  return (
    <button
      type={"button"}
      onClick={vote}
      className={classNames(
        "py-2 px-3",
        "bg-orange-200",
        "text-white font-medium",
        "disabled:opacity-50",
        "disabled:cursor-not-allowed",
      )}
      style={{ backgroundColor: color }}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default VoteBtn;
