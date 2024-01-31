import VegaComponent from "./VegaComponent";

const spec = {
  $schema: "https://vega.github.io/schema/vega-lite/v5.json",
  title: "Kiireen määrä ja tuntu",

  data: { name: "loads" },
  layer: [
    {
      mark: "point",
      encoding: {
        x: {
          field: "workload",
          type: "quantitative",
          scale: { domain: [0.0, 1.0] },
          title: "Kiireen määrä",
        },
        y: {
          field: "mentalload",
          type: "quantitative",
          scale: { domain: [0.0, 1.0] },
          title: "Kiireen tuntu",
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
  ],
};

export default function Load({ filteredLoads }) {
  return <VegaComponent data={{ loads: filteredLoads }} vega_spec={spec} />;
}
