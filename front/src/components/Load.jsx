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
      mark: "point",
      encoding: {
        x: {
          field: "workload",
          type: "quantitative",
          scale: { domain: [0.0, 1.0] },
        },
        y: {
          field: "mentalload",
          type: "quantitative",
          scale: { domain: [0.0, 1.0] },
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
  ],
};

const LineChart = createClassFromSpec({ mode: "vega-lite", spec: spec });

const Load = ({ filteredLoads }) => {
  const dat = { loads: filteredLoads };
  return <LineChart spec={spec} data={dat} />;
};

export default Load;
