const prod = {
  API_URL: "https://tietoa.up.railway.app",
  // API_URL_USERS: "http://tietoa.up.railway.app/users",
};

const dev = {
  API_URL: "http://localhost:8000",
};

export const default_spec = {
  width: 400,
  height: 400,
  background: "rgba(0, 0, 0, 0)",

  config: {
    font: "consolas",
    titleFontWeight: "normal",

    axis: {
      gridOpacity: 0.05,
      labelFontWeight: "normal",
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
  // view: {
  //   fill: "rgba(127.5, 127.5, 127.5, 0.1)",
  //   titleColor: "gray",
  // },
  // config: {
  //   font: "consolas",
  //   axis: {
  //     grid: true,
  //     gridOpacity: 0.05,
  //     labelFontWeight: "normal",
  //     labelColor: "gray",
  //     titleFontWeight: "normal",
  //     titleColor: "gray",
  //     titlePadding: 14,
  //   },
  //   header: {
  //     titleColor: "red",
  //   },
  //   legend: {
  //     title: null,
  //     labelColor: "gray",
  //     labelExpr:
  //       "datum.label == 'mentalload' ? 'Kiireen tuntu' : datum.label == 'workload' ? 'Kiireen määrä' : datum.label",
  //   },
  // },
};

export const default_theme_dark = "dark";
export const default_theme_light = "default";

export const config = process.env.NODE_ENV === "development" ? dev : prod;
