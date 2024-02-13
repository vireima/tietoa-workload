import { DateTime, Duration, Interval } from "luxon";
import { mean } from "simple-statistics";
import StatisticWidget from "./StatisticWidget";

function rolling(inputArray, size) {
  return Array.from(
    { length: inputArray.length - (size - 1) }, //get the appropriate length
    (_, index) => inputArray.slice(index, index + size) //create the windows
  );
}

export default function Trend({ users, workloads, range }) {
  const weekAgo = DateTime.now().minus({ days: range });
  const withinRange = workloads.filter(
    (load) => DateTime.fromISO(load.date) >= weekAgo
  );

  const workloadLastWeek = withinRange.map((load) => load.workload);
  const mentalloadLastWeek = withinRange.map((load) => load.mentalload);

  const weekWindows = rolling(workloads, range).map((loads) => {
    return {
      workload: mean(loads.map((load) => load.workload)),
      mentalload: mean(loads.map((load) => load.mentalload)),
      count: loads.filter((load) => !load.imputed).length,
    };
  });

  const meanWeeklyCount = mean(weekWindows.map((load) => load.count));
  const meanWeeklyWorkload = mean(weekWindows.map((load) => load.workload));
  const meanWeeklyMentalload = mean(weekWindows.map((load) => load.mentalload));

  return (
    <>
      <div>
        <StatisticWidget
          name="statistics-weekly-workload"
          header="Kiireen määrä:"
          value={mean(workloadLastWeek)}
          reference_value={meanWeeklyWorkload}
          description={`<p>Kiireen määrä keskimäärin<br />- viimeisen ${range} vrk sisään<br/>- suhteessa kaikkien ${range} vrk jaksojen keskiarvoon</p>`}
          percentage={true}
        />
        <StatisticWidget
          name="statistics-weekly-mentalload"
          header="Kiireen tuntu:"
          value={mean(mentalloadLastWeek)}
          reference_value={meanWeeklyMentalload}
          description={`<p>Kiireen tuntu keskimäärin<br/>- viimeisen ${range} vrk sisään<br/>- suhteessa kaikkien ${range} vrk jaksojen keskiarvoon</p>`}
          percentage={true}
        />
        <StatisticWidget
          name="statistics-weekly-count"
          header="Vastauksia:"
          value={withinRange.filter((load) => !load.imputed).length}
          reference_value={meanWeeklyCount}
          description={`<p>Kiirekyselyn vastausten määrä<br/>- viimeisen ${range} vrk sisään<br/>- suhteessa kaikkien ${range} vrk jaksojen keskimääräiseen vastausmäärään</p>`}
          percentage={false}
        />
      </div>
    </>
  );
}
