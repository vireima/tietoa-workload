import VegaComponent from "./VegaComponent";

const spec = {
  $schema: "https://vega.github.io/schema/vega-lite/v5.json",
  title: "Kiirekyselyn tulosten jakautuminen",
  height: 40,
  data: { name: "loads" },

  transform: [{ fold: ["mentalload", "workload"] }],
  mark: { type: "line" },
  encoding: {
    x: {
      field: "date",
      type: "temporal",
      title: "Kiireen määrä / tuntu",
    },
    y: {
      field: "value",
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
    row: {
      field: "user",
      type: "nominal",
    },
  },
};

export default function TrellisChart({ filteredLoads }) {
  console.log(filteredLoads);
  return <VegaComponent data={{ loads: filteredLoads }} vega_spec={spec} />;
}
