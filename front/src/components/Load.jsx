import { Vega, VegaLite, createClassFromSpec } from "react-vega";

const spec = {
  $schema: "https://vega.github.io/schema/vega-lite/v5.json",
  description: "A simple bar chart with embedded data.",
  width: 400,
  mark: "point",
  data: { name: "loads" },
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
  },
};

const LineChart = createClassFromSpec({ mode: "vega-lite", spec: spec });

const Load = ({ filteredLoads }) => {
  const dat = { loads: filteredLoads };
  console.log(filteredLoads);
  return (
    <div>
      <p>{filteredLoads.length}</p>
      <LineChart spec={spec} data={dat} />
    </div>
  );
};

export default Load;
