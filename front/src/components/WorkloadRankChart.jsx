import VegaComponent from "./VegaComponent";
import { workload_color, mentalload_color } from "../config";

const spec = {
  $schema: "https://vega.github.io/schema/vega-lite/v5.json",
  title: "Kiireisimmät",
  height: 140,
  width: 540,
  data: { name: "loads" },
  layer: [
    {
      mark: { type: "bar", height: 12, color: workload_color },
      encoding: {
        x: {
          field: "workload",
          type: "quantitative",
          aggregate: "max",
          title: false,
          axis: { labels: false },
        },
        y: {
          field: "slack.profile.display_name",
          type: "nominal",
          title: null,
          sort: { field: "workload", op: "max", order: "descending" },
        },
        tooltip: [
          {
            field: "workload",
            aggregate: "max",
            title: "Korkein kiireen määrä",
            format: ".0%",
          },
          {
            field: "workload",
            aggregate: "mean",
            title: "Kiireen määrä keskimäärin",
            format: ".0%",
          },
        ],
      },
    },
    {
      mark: { type: "tick", color: "white" },
      encoding: {
        x: {
          field: "workload",
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
export default function WorkloadRankChart({ workloads }) {
  return (
    <VegaComponent
      data={{ loads: workloads }}
      vega_spec={spec}
      height={140}
      hidden={!workloads || !workloads.length}
    />
  );
}
