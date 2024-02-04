import { ChartTypeRegistry, Plugin } from "chart.js";

export const InnerLabel: Plugin<keyof ChartTypeRegistry> = {
  id: "innerLabel",
  afterDatasetDraw(chart, args) {
    const { ctx } = chart;
    const meta = args.meta;
    const xCoor = meta.data[0].x;
    const yCoor = meta.data[0].y;
    ctx.save();
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.font = "bold 4.5rem sans-serif";
    ctx.fillStyle = "white";
    ctx.fillText("%", xCoor, yCoor);
    ctx.restore();
  },
};
