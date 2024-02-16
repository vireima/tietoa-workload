import VegaComponent from "./VegaComponent";

const spec = {
  $schema: "https://vega.github.io/schema/vega-lite/v5.json",
  title: "Kiireen määrä ja tuntu",

  data: { name: "loads" },
  layer: [
    {
      mark: { type: "point", filled: true, angle: 45 },
      encoding: {
        x: {
          field: "workload",
          type: "quantitative",
          scale: { domain: [0.0, 1.0] },
          title: "Kiireen määrä",
          axis: {
            titlePadding: -35,
          },
        },
        y: {
          field: "mentalload",
          type: "quantitative",
          scale: { domain: [0.0, 1.0] },
          title: "Kiireen tuntu",
          axis: {
            titlePadding: -40,
          },
        },
        size: {
          condition: {
            test: "datum.comment != null",
            value: 100,
          },
          value: 15,
        },
        shape: {
          condition: {
            test: "datum.comment != null",
            value: "cross",
          },
          value: "circle",
        },
        color: {
          field: "slack.profile.display_name",
        },
        tooltip: [
          {
            field: "slack.profile.display_name",
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

export default function Load(props) {
  console.log("Load, props", props);
  return <VegaComponent data={{ loads: props.workloads }} vega_spec={spec} />;
}
