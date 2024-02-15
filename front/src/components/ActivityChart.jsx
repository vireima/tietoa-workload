import VegaComponent from "./VegaComponent";

const spec = {
  $schema: "https://vega.github.io/schema/vega-lite/v5.json",
  title: "Aktiivisuus",
  height: 140,
  data: { name: "loads" },
  mark: { type: "rect", strokeWidth: 20 },
  encoding: {
    x: {
      field: "date",
      timeUnit: "yearweek",
      type: "temporal",
      title: null,
    },
    y: {
      field: "date",
      timeUnit: "day",
      type: "ordinal",
      title: null,
    },

    color: {
      field: "mentalload",
      aggregate: "count",
      type: "quantitative",
      // legend: null,
      scale: {
        type: "quantize",
        scheme: "viridis",
        // scheme: ["#000004", "#51127c", "#b73779", "#fc8961", "#fcfdbf"],
      },
    },
    tooltip: [
      { field: "mentalload", aggregate: "count", title: "Mittaustuloksia" },
    ],
  },
};

export default function ActivityChart({ workloads }) {
  return <VegaComponent data={{ loads: workloads }} vega_spec={spec} />;
}
