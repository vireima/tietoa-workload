import VegaComponent from "./VegaComponent";
import { workload_color, mentalload_color } from "../config";

const spec = {
  $schema: "https://vega.github.io/schema/vega-lite/v5.json",
  title: "Ajanjakson keskimääräinen kiireen tuntu / määrä",
  height: 140,
  width: 540,
  data: { name: "loads" },
  transform: [
    { flatten: ["tags"], as: ["tag"] },
    // { fold: ["mentalload", "workload"], as: ["key", "value"] },
  ],

  hconcat: [
    {
      mark: { type: "bar", height: 12, color: mentalload_color },
      encoding: {
        x: {
          field: "mentalload",
          type: "quantitative",
          aggregate: "mean",
          title: false,
          axis: { labels: false },
        },
        y: {
          field: "tag",
          type: "nominal",
          title: null,
          sort: { field: "mentalload", op: "max", order: "descending" },
          axis: { labelPadding: 6 },
        },
        tooltip: [
          {
            field: "mentalload",
            aggregate: "mean",
            title: "Kiireen tuntu keskimäärin",
            format: ".0%",
          },
          {
            field: "mentalload",
            aggregate: "max",
            title: "Korkein kiireen tuntu",
            format: ".0%",
          },
        ],
      },
    },
    {
      mark: { type: "bar", height: 12, color: workload_color },
      encoding: {
        x: {
          field: "workload",
          type: "quantitative",
          aggregate: "mean",
          title: false,
          axis: { labels: false },
        },
        y: {
          field: "tag",
          type: "nominal",
          title: null,
          sort: { field: "workload", op: "max", order: "descending" },
          axis: { labelPadding: 6 },
        },
        tooltip: [
          {
            field: "workload",
            aggregate: "mean",
            title: "Kiireen määrä keskimäärin",
            format: ".0%",
          },
          {
            field: "workload",
            aggregate: "max",
            title: "Korkein kiireen määrä",
            format: ".0%",
          },
        ],
      },
    },
  ],
  config: {
    tick: {
      bandSize: 12,
      thickness: 2,
    },
    axis: {
      domain: false,
      ticks: false,
      title: false,
      grid: false,
    },
  },
};
export default function RankChartByTag({ workloads }) {
  return (
    <VegaComponent
      data={{ loads: workloads }}
      vega_spec={spec}
      height={140}
      hidden={!workloads || !workloads.length}
    />
  );
}
