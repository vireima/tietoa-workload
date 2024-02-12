import { createClassFromSpec } from "react-vega";
import {
  default_spec,
  default_theme_light,
  default_theme_dark,
} from "../config";
import { useState, useEffect } from "react";

export default function VegaComponent({ vega_spec, data }) {
  const [mode, setMode] = useState("light");
  const spec = { ...default_spec, ...vega_spec };
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
    <div className="chart widget">
      <Chart
        spec={spec}
        data={data}
        actions={false}
        theme={mode == "light" ? default_theme_light : default_theme_dark}
      />
    </div>
  );
}
