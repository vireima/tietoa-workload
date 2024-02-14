function makeCSV(data, filteredHeaders) {
  let rows = [];

  const headers = data
    .flatMap((obj) => Object.keys(obj))
    .filter(
      (header, index, array) =>
        array.indexOf(header) == index &&
        (!filteredHeaders || !filteredHeaders.includes(header))
    );

  rows.push(headers.join(","));

  data.forEach((obj) => {
    rows.push(
      headers
        .map((key) => (Array.isArray(obj[key]) ? `"${obj[key]}"` : obj[key]))
        .join(",")
    );
  });

  return rows.join("\n");
}

function download(users, workloads) {
  const csv_data = makeCSV(workloads, [
    "date",
    "week",
    "luxonDate",
    "datetime_luxon",
  ]);
  const blob = new Blob([csv_data], { type: "text/csv" });
  const url = window.URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.setAttribute("href", url);
  a.setAttribute("download", "kiirekysely_data.csv");
  a.click();
}

export default function CSVDownload({ users, workloads }) {
  return (
    <a href="#" onClick={() => download(users, workloads)}>
      Lataa CSV
    </a>
  );
}
