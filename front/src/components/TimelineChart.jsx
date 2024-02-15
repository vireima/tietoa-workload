import VegaComponent from "./VegaComponent";

const spec = {
  $schema: "https://vega.github.io/schema/vega-lite/v5.json",
  title: "Kiire aikajanalla",

  data: { name: "loads" },

  layer: [
    {
      transform: [{ fold: ["mentalload", "workload"] }],
      mark: { type: "point", filled: true, opacity: 1, size: 50 },
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
        shape: {
          field: "username",
        },
        tooltip: [
          {
            field: "username",
            type: "nominal",
            title: "Nimi",
          },
          {
            field: "datetime",
            type: "temporal",
            title: "Päiväys",
            formatType: "time",
            format: "%-d.%-m.%Y %H:%M",
          },
          {
            field: "mentalload",
            title: "Kiireen tuntu",
            format: ".0%",
          },
          {
            field: "workload",
            title: "Kiireen määrä",
            format: ".0%",
          },
          {
            field: "comment",
            type: "nominal",
            title: "Kommentti",
          },
        ],
      },
    },
    {
      data: { name: "imputed" },
      mark: {
        type: "line",
        point: { opacity: 0.2 },
        interpolate: "basis",
        opacity: 0.2,
      },
      transform: [
        { fold: ["mentalload", "workload"] },
        {
          aggregate: [{ op: "mean", field: "value", as: "agg_value" }],
          groupby: ["date", "key"],
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
        color: { field: "key" },
        tooltip: [
          {
            field: "agg_value",
            title: "Vuorokauden keskiarvo",
            format: ".0%",
          },
          {
            field: "date",
            type: "temporal",
            title: "Päiväys",
            formatType: "time",
            format: "%-d.%-m.%Y",
          },
        ],
      },
    },
  ],
};

export default function TimelineChart({ workloads, imputed }) {
  return (
    <VegaComponent
      data={{ loads: workloads, imputed: imputed }}
      vega_spec={spec}
    />
  );
}
