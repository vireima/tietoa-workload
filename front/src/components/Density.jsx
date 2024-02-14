import VegaComponent from "./VegaComponent";

const spec = {
  $schema: "https://vega.github.io/schema/vega-lite/v5.json",
  title: "Kiirekyselyn tulosten jakautuminen",
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
      mark: { type: "area", line: true },
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
          stack: null,
        },
        color: {
          field: "key",
          legend: {
            labelExpr:
              "datum.label == 'mentalload' ? 'Kiireen tuntu' : datum.label == 'workload' ? 'Kiireen määrä' : ''",
          },
        },
        fillOpacity: { value: 0.1 },
      },
    },
  ],
};
export default function Density({ workloads }) {
  return <VegaComponent data={{ loads: workloads }} vega_spec={spec} />;
}
