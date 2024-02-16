import { createClassFromSpec } from "react-vega";
import {
  default_spec,
  default_theme_light,
  default_theme_dark,
  default_time_format_locale,
} from "../config";
import { useState, useEffect } from "react";

export default function VegaComponent({ vega_spec, data, height, hidden }) {
  const [mode, setMode] = useState("light");
  const spec = { ...default_spec, ...vega_spec };

  // TODO: make this make more sense...
  spec.config = { ...default_spec.config, ...vega_spec?.config };
  // spec.config.axis = {
  //   ...default_spec.config.axis,
  //   ...vega_spec?.config?.axis,
  // };
  // spec.config.legend = {
  //   ...default_spec.config.legend,
  //   ...vega_spec?.config?.legend,
  // };

  const Chart = createClassFromSpec({ mode: "vega-lite", spec: spec });

  useEffect(() => {
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", (event) => {
        setMode(event.matches ? "dark" : "light");
      });

    setMode(
      window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light"
    );

    return () => {
      window
        .matchMedia("(prefers-color-scheme: dark)")
        .removeEventListener("change", () => {});
    };
  }, []);

  return (
    <div className="chart widget" style={{ minHeight: height }}>
      {!hidden ? (
        <Chart
          spec={spec}
          data={data}
          actions={false}
          theme={mode == "light" ? default_theme_light : default_theme_dark}
          timeFormatLocale={default_time_format_locale}
        />
      ) : (
        <></>
      )}
    </div>
  );
}
