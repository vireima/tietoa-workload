import { Vega, VegaLite, createClassFromSpec } from "react-vega";
import { default_spec } from "../config";

const spec = {
  $schema: "https://vega.github.io/schema/vega-lite/v5.json",
  description: "A simple bar chart with embedded data.",
  ...default_spec,
  title: "Kiireen jakautuminen",
  width: 400,
  height: 200,

  data: { name: "loads" },
  layer: [
    {
      transform: [
        { fold: ["mentalload", "workload"] },
        {
          density: "value",
          counts: true,
          extent: [0, 1],
          groupby: ["key"],
          as: ["dvalue", "density"],
        },
      ],
      mark: { type: "line" },
      encoding: {
        x: {
          field: "dvalue",
          type: "quantitative",
          title: "Kiireen määrä / tuntu",
        },
        y: {
          field: "density",
          type: "quantitative",
          title: null,
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
    // {
    //   mark: { type: "line" },
    //   transform: [{ density: "workload", counts: true, extent: [0, 1] }],
    //   encoding: {
    //     x: {
    //       field: "value",
    //       type: "quantitative",
    //       title: "Kiireen määrä",
    //     },
    //     y: {
    //       field: "density",
    //       type: "quantitative",
    //     },
    //     color: { value: "red" },
    //   },
    // },
  ],
};

const LineChart = createClassFromSpec({ mode: "vega-lite", spec: spec });

const Timeline = ({ filteredLoads }) => {
  const dat = { loads: filteredLoads };
  return <LineChart spec={spec} data={dat} actions={false} theme="dark" />;
};

export default Timeline;
