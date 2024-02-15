import VegaComponent from "./VegaComponent";

const spec = {
  $schema: "https://vega.github.io/schema/vega-lite/v5.json",
  title: "Kiire aikajanalla",
  // height: 50,
  data: { name: "imputed" },
  mark: {
    type: "line",
    point: { opacity: 1 },
    interpolate: "basis",
  },
  transform: [
    { fold: ["mentalload", "workload"] },
    {
      aggregate: [{ op: "mean", field: "value", as: "agg_value" }],
      groupby: ["date", "key", "username"],
    },
  ],
  encoding: {
    x: {
      field: "date",
      type: "temporal",
    },
    y: {
      field: "agg_value",
      type: "quantitative",
      scale: { domain: [0.0, 1.0] },
    },
    row: { field: "key" },
    color: { field: "username" },
    // tooltip: [
    //   {
    //     field: "agg_value",
    //     title: "Vuorokauden keskiarvo",
    //     format: ".0%",
    //   },
    //   {
    //     field: "date",
    //     type: "temporal",
    //     title: "Päiväys",
    //     formatType: "time",
    //     format: "%-d.%-m.%Y",
    //   },
    // ],
  },
};

export default function GroupedTimelineChart({ workloads, imputed }) {
  console.log("IMP", imputed);
  return <VegaComponent data={{ imputed: imputed }} vega_spec={spec} />;
}
