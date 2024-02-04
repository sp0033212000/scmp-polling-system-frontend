"use client";
import { ArcElement, Chart as ChartJS, type ChartData } from "chart.js";
import { SerializedAnswer } from "@/components/feature/PollVoteCard";
import React, { useMemo } from "react";
import { cloneDeep } from "lodash";
import { Doughnut } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { InnerLabel } from "@/lib/chartjs/plugin";

ChartJS.register(ArcElement, ChartDataLabels, InnerLabel);

interface VoteResultDoughnutProps extends SerializedAnswer {}

const VoteResultDoughnut: React.FC<VoteResultDoughnutProps> = ({ options }) => {
  const chartData = useMemo(() => {
    const data = options?.reduce<ChartData<"doughnut">>(
      (previousValue, currentValue) => {
        const cloned = cloneDeep(previousValue);
        cloned.datasets[0].data.push(currentValue.count);
        (cloned.datasets[0]!.backgroundColor as Array<string>).push(
          currentValue.color,
        );
        return cloned;
      },
      {
        datasets: [
          {
            data: [],
            backgroundColor: [],
          },
        ],
      } as ChartData<"doughnut">,
    );
    if (data?.datasets[0].data.reduce((a, b) => a + b, 0) === 0) {
      data.datasets[0].data = [1];
      (data.datasets[0].backgroundColor as Array<string>) = ["#f0f0f0"];
    }
    return data;
  }, [options]);

  if (!options) return null;

  return (
    <div className={"relative w-full h-full"}>
      <Doughnut
        data={chartData}
        fallbackContent={"Loading..."}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          aspectRatio: 1,
          plugins: {
            tooltip: {
              enabled: false,
            },
            datalabels: {
              formatter: (value, ctx) => {
                const total =
                  (
                    ctx.chart?.config?.data?.datasets?.[0]
                      ?.data as Array<number>
                  )?.reduce((acc, data) => acc + data, 0) ?? 0;
                return `${Math.round((value * 100) / total)}`;
              },
              color: "white",
              font: {
                size: 18,
              },
            },
          },
          elements: {},
        }}
      />
    </div>
  );
};

export default VoteResultDoughnut;
