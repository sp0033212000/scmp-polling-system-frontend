import classNames from "classnames";
import { SwaggerAPI } from "@/swagger";
import PollVoteCard from "@/components/feature/PollVoteCard";
import PollCard from "@/components/feature/PollCard";

const getPolls = async () => {
  const { data } = await SwaggerAPI.pollApi.findAll();
  return data;
};
export default async function Home() {
  const polls = await getPolls();

  const separatedPolls = {
    newest: polls[0],
    rest: polls.slice(1),
  };

  return (
    <main className={"p-6"}>
      <PollVoteCard {...separatedPolls.newest} />
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
}
