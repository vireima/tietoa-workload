const prod = {
  API_URL: "https://tietoa.up.railway.app",
};

const dev = {
  API_URL: "http://localhost:8000",
};

export const config = process.env.NODE_ENV === "development" ? dev : prod;

export const tableau20 = [
  "#1f77b4",
  "#aec7e8",
  "#ff7f0e",
  "#ffbb78",
  "#2ca02c",
  "#98df8a",
  "#d62728",
  "#ff9896",
  "#9467bd",
  "#c5b0d5",
  "#8c564b",
  "#c49c94",
  "#e377c2",
  "#f7b6d2",
  "#7f7f7f",
  "#c7c7c7",
  "#bcbd22",
  "#dbdb8d",
  "#17becf",
  "#9edae5",
];

// export const mentalload_color = tableau20[6];
// export const workload_color = tableau20[8];
export const mentalload_color = "rgb(237,102,93)";
export const workload_color = "rgb(109,204,218)";
export const default_spec = {
  width: 400,
  height: 400,
  background: "rgba(0, 0, 0, 0)",

  view: { stroke: null },

  config: {
    font: "consolas",
    titleFontWeight: "normal",

    axis: {
      ticks: false,
      gridOpacity: 0.05,
      labelFontWeight: "normal",
      labelFlush: true,
      labelPadding: 7,
      titleFontWeight: "normal",
      titleColor: "gray",
      titlePadding: 14,
      domainColor: "gray",
      tickColor: "gray",
    },

    legend: {
      title: null,
      labelExpr:
        "datum.label == 'mentalload' ? 'Kiireen tuntu' : datum.label == 'workload' ? 'Kiireen määrä' : datum.label",
    },

    style: {
      "guide-label": {
        fill: "gray",
      },
    },
  },
};

export const default_theme_dark = "dark";
export const default_theme_light = "default";

export const default_time_format_locale = {
  dateTime: "%A, %-d. %Bta %Y klo %X",
  date: "%-d.%-m.%Y",
  time: "%H:%M:%S",
  periods: ["a.m.", "p.m."],
  days: [
    "sunnuntai",
    "maanantai",
    "tiistai",
    "keskiviikko",
    "torstai",
    "perjantai",
    "lauantai",
  ],
  shortDays: ["Su", "Ma", "Ti", "Ke", "To", "Pe", "La"],
  months: [
    "tammikuu",
    "helmikuu",
    "maaliskuu",
    "huhtikuu",
    "toukokuu",
    "kesäkuu",
    "heinäkuu",
    "elokuu",
    "syyskuu",
    "lokakuu",
    "marraskuu",
    "joulukuu",
  ],
  shortMonths: [
    "Tammi",
    "Helmi",
    "Maalis",
    "Huhti",
    "Touko",
    "Kesä",
    "Heinä",
    "Elo",
    "Syys",
    "Loka",
    "Marras",
    "Joulu",
  ],
};
