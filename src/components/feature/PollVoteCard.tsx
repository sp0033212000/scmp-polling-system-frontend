import React from "react";
import VoteBtn from "@/components/common/VoteBtn";
import uniqolor from "uniqolor";
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";
import { IoChatbubble } from "react-icons/io5";
import { isSameDay } from "date-fns";
import { OptionForPollDetail, PollDetailEntity } from "@/swagger/swagger.api";
import VoteResultDoughnut from "@/components/feature/VoteResultDoughnut";
import { SwaggerAPI } from "@/swagger";

type AnswerType = "Single" | "Multi";

export interface SerializedAnswerOption extends OptionForPollDetail {
  color: string;
}

export interface SerializedAnswer {
  type: AnswerType;
  options: SerializedAnswerOption[];
}

export interface PollVoteCardProps extends PollDetailEntity {
  answer: {
    id: number;
    type: AnswerType;
    options: OptionForPollDetail[];
  };
}

ChartJS.register(ArcElement, Tooltip, Legend);

const PollVoteCard: React.FC<PollVoteCardProps> = async ({
  title,
  answer,
  published_date,
  id,
}) => {
  const {
    data: { voted },
  } = await SwaggerAPI.voteApi.votedCheck({ poll_id: id });

  const serializedAnswer = {
    ...answer,
    options: answer.options?.map((option) => ({
      ...option,
      color: uniqolor(option.label).color,
    })),
  };

  const totalVotes = serializedAnswer.options?.reduce(
    (acc, option) => acc + option.count,
    0,
  );

  const isTodaysPoll = isSameDay(new Date(published_date * 1000), new Date());

  return (
    <div className={"w-full bg-blue-200 md:p-6 p-4 space-y-4"}>
      <div className={"md:flex space-y-4"}>
        <div className={"flex flex-col items-start space-y-4 md:flex-1"}>
          {isTodaysPoll && (
            <h2
              className={"flex items-center text-orange-500 font-bold text-3xl"}
            >
              <IoChatbubble className={"mr-2"} />
              Today&apos;s Poll
            </h2>
          )}
          <h2 className={"font-bold text-2xl"}>{title}</h2>
          <div className={"flex flex-col items-stretch space-y-2 w-fit"}>
            {serializedAnswer.options?.map((option) => (
              <VoteBtn
                key={option.id}
                color={option.color}
                poll_id={id}
                answer_id={answer.id}
                option_id={option.id}
                disabled={voted}
              >
                {option.label}
              </VoteBtn>
            ))}
          </div>
        </div>
        <div
          className={
            "md:max-w-72 max-w-56 mx-auto md:mr-0 md:ml-auto aspect-square"
          }
        >
          <VoteResultDoughnut {...serializedAnswer} />
        </div>
      </div>
      <div className={"text-center md:text-start text-gray-700"}>
        Total number of votes: {totalVotes}
      </div>
    </div>
  );
};

export default PollVoteCard;
