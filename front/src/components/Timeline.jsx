import { Vega, VegaLite, createClassFromSpec } from "react-vega";
import { default_spec } from "../config";

const spec = {
  $schema: "https://vega.github.io/schema/vega-lite/v5.json",
  description: "A simple bar chart with embedded data.",
  ...default_spec,

  width: 400,
  height: 400,

  data: { name: "loads" },

  layer: [
    {
      transform: [{ fold: ["mentalload", "workload"] }],
      mark: { type: "point", filled: true },
      encoding: {
        x: {
          field: "datetime",
          type: "temporal",
          title: null,
        },
        y: {
          field: "value",
          type: "quantitative",
          scale: { domain: [0.0, 1.0] },
          title: null,
        },
        color: {
          field: "key",
          legend: {
            labelExpr:
              "datum.label == 'mentalload' ? 'Kiireen tuntu' : datum.label == 'workload' ? 'Kiireen määrä' : ''",
          },
        },
        tooltip: [
          {
            field: "username",
            type: "nominal",
          },
          {
            field: "comment",
            type: "nominal",
          },
          {
            field: "datetime",
            type: "temporal",
          },
        ],
      },
    },
    {
      transform: [
        { fold: ["mentalload", "workload"] },
        { timeUnit: "yearmonthdate", field: "datetime", as: "date" },
        { loess: "value", on: "date", groupby: ["key"] },
      ],
      mark: "line",
      encoding: {
        x: {
          field: "date",
          type: "temporal",
        },
        y: {
          field: "value",
          type: "quantitative",
          scale: { domain: [0.0, 1.0] },
        },
        color: {
          field: "key",
          legend: {
            labelExpr:
              "datum.label == 'mentalload' ? 'Kiireen tuntu' : datum.label == 'workload' ? 'Kiireen määrä' : ''",
          },
        },
      },
    },
  ],
};

const LineChart = createClassFromSpec({ mode: "vega-lite", spec: spec });

const Timeline = ({ filteredLoads }) => {
  const dat = { loads: filteredLoads };
  return <LineChart spec={spec} data={dat} />;
};

export default Timeline;
