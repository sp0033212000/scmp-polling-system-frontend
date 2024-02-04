import { SwaggerAPI } from "@/swagger";
import { PollDetailEntity } from "@/swagger/swagger.api";
import PollVoteCard from "@/components/feature/PollVoteCard";
import classNames from "classnames";
import PollCard from "@/components/feature/PollCard";
import type { NextPage } from "next";

const getPolls = async () => {
  const { data } = await SwaggerAPI.pollApi.findAll();
  return data;
};
const Poll: NextPage<{ params: { poll_id: string } }> = async ({
  params: { poll_id },
}) => {
  const polls = await getPolls();

  const separatedPolls = polls.reduce<{
    current: PollDetailEntity | null;
    rest: Array<PollDetailEntity>;
  }>(
    (previousValue, currentValue) => {
      if (currentValue.id === Number(poll_id)) {
        previousValue.current = currentValue;
      } else {
        previousValue.rest.push(currentValue);
      }
      return previousValue;
    },
    { current: null, rest: [] },
  );

  if (!separatedPolls.current) return null;

  return (
    <main className={"p-6"}>
      <PollVoteCard {...separatedPolls.current} />
      <div className={"relative mt-6 flex flex-wrap"}>
        {separatedPolls.rest.map((poll) => (
          <div
            key={poll.id}
            className={classNames(
              "group",
              "md:odd:pr-4 md:even:pl-4",
              "md:even:border-r-0 md:border-r border-gray-300",
              "w-full md:w-[calc(50%)]",
            )}
          >
            <div
              className={classNames(
                "md:group-odd:pr-0 md:group-even:pl-0",
                "p-4 border-b border-gray-300",
              )}
            >
              <PollCard {...poll} />
            </div>
          </div>
        ))}
        <div className={"absolute bottom-0 left-0 w-full h-px bg-white"} />
      </div>
    </main>
  );
};

export default Poll;
