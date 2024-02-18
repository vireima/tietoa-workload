import { mentalload_color, workload_color } from "../config";
import VegaComponent from "./VegaComponent";

const spec = {
  $schema: "https://vega.github.io/schema/vega-lite/v5.json",
  title: "Kiireen määrä aikajanalla",

  data: { name: "imputed" },
  transform: [{ flatten: ["tags"], as: ["tag"] }],

  layer: [
    {
      mark: {
        type: "line",
        interpolate: "monotone",
        opacity: 1,
        size: 3,
      },
      encoding: {
        x: {
          field: "date",
          type: "temporal",
        },
        y: {
          field: "workload",
          type: "quantitative",
          aggregate: "mean",
          scale: { domain: [0.0, 1.0] },
          axis: { format: ".0%" },
          title: null,
        },
        color: { field: "tag" },
        tooltip: [
          {
            field: "date",
            type: "temporal",
            title: "Päiväys",
            formatType: "time",
            format: "%-d.%-m.%Y",
          },
          {
            field: "workload",
            title: "Kiireen määrä keskimäärin",
            aggregate: "mean",
            format: ".0%",
          },
          {
            field: "mentalload",
            title: "Korkein kiireen määrä",
            aggregate: "max",
            format: ".0%",
          },
        ],
      },
    },
    {
      data: { name: "loads" },
      transform: [{ flatten: ["tags"], as: ["tag"] }],
      mark: {
        type: "circle",
        opacity: 0.75,
        size: 5,
      },
      encoding: {
        x: {
          field: "datetime",
          type: "temporal",
        },
        y: {
          field: "workload",
          type: "quantitative",
          scale: { domain: [0.0, 1.0] },
          axis: null,
        },
        color: { field: "tag" },
      },
    },

    {
      data: { name: "loads" },
      transform: [{ flatten: ["tags"], as: ["tag"] }],
      mark: {
        type: "bar",
        color: "gray",
        opacity: 0.2,
      },
      encoding: {
        x: {
          field: "date",
          type: "temporal",
        },
        y: {
          field: "workload",
          type: "quantitative",
          aggregate: "count",
          title: "Vastausten määrä",
        },
      },
    },
  ],
  resolve: { scale: { y: "independent" } },
};

export default function WorkloadTimelineByTagChart({ workloads, imputed }) {
  return (
    <VegaComponent
      data={{ loads: workloads, imputed: imputed }}
      vega_spec={spec}
      height={470}
      hidden={!workloads || !workloads.length}
    />
  );
}
