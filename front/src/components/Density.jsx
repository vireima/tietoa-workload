import VegaComponent from "./VegaComponent";

const spec = {
  $schema: "https://vega.github.io/schema/vega-lite/v5.json",
  title: "Kiirekyselyn tulosten jakautuminen",

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
export default function Density({ filteredLoads }) {
  return <VegaComponent data={{ loads: filteredLoads }} vega_spec={spec} />;
}
