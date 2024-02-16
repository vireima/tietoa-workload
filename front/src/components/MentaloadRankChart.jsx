import VegaComponent from "./VegaComponent";
import { workload_color, mentalload_color } from "../config";

const spec = {
  $schema: "https://vega.github.io/schema/vega-lite/v5.json",
  title: "Ahdistuneimmat",
  height: 100,
  width: 540,
  data: { name: "loads" },
  layer: [
    {
      mark: { type: "bar", height: 12, color: mentalload_color },
      encoding: {
        x: {
          field: "mentalload",
          type: "quantitative",
          aggregate: "max",
          title: false,
          axis: { labels: false },
        },
        y: {
          field: "slack.profile.display_name",
          type: "nominal",
          title: null,
          sort: { field: "mentalload", op: "max", order: "descending" },
        },
        tooltip: [
          {
            field: "mentalload",
            aggregate: "max",
            title: "Korkein kiireen tuntu",
            format: ".0%",
          },
          {
            field: "mentalload",
            aggregate: "mean",
            title: "Kiireen  tuntu keskimäärin",
            format: ".0%",
          },
        ],
      },
    },
    {
      mark: { type: "tick", color: "white" },
      encoding: {
        x: {
          field: "mentalload",
          type: "quantitative",
          aggregate: "mean",
        },
        y: {
          field: "slack.profile.display_name",
          type: "nominal",
          title: null,
          sort: null,
        },
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
export default function MentalloadRankChart({ workloads }) {
  return (
    <VegaComponent
      data={{ loads: workloads }}
      vega_spec={spec}
      height={100}
      hidden={!workloads || !workloads.length}
    />
  );
}
