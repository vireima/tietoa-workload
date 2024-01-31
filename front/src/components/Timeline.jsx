import VegaComponent from "./VegaComponent";

const spec = {
  $schema: "https://vega.github.io/schema/vega-lite/v5.json",
  title: "Kiire aikajanalla",

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
        },
      },
    },
  ],
};

export default function Timeline({ filteredLoads }) {
  return <VegaComponent data={{ loads: filteredLoads }} vega_spec={spec} />;
}
