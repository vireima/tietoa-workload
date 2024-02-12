import { DateTime, Duration, Interval } from "luxon";
import { mean } from "simple-statistics";
import StatisticWidget from "./StatisticWidget";

function rolling(inputArray, size) {
  return Array.from(
    { length: inputArray.length - (size - 1) }, //get the appropriate length
    (_, index) => inputArray.slice(index, index + size) //create the windows
  );
}

export default function Trend({ users, workloads }) {
  const weekAgo = DateTime.now().minus({ days: 7 });
  const withinWeek = workloads.filter(
    (load) => DateTime.fromISO(load.date) >= weekAgo
  );

  const workloadLastWeek = withinWeek.map((load) => load.workload);
  const mentalloadLastWeek = withinWeek.map((load) => load.mentalload);

  const weekWindows = rolling(workloads, 7).map((loads) => {
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
          description="Kiireen määrä 7 vrk sisään vs. pitkä keskiarvo"
          percentage={true}
        />
        <StatisticWidget
          name="statistics-weekly-mentalload"
          header="Kiireen tuntu:"
          value={mean(mentalloadLastWeek)}
          reference_value={meanWeeklyMentalload}
          description="Kiireen tuntu 7 vrk sisään vs. pitkä keskiarvo"
          percentage={true}
        />
        <StatisticWidget
          name="statistics-weekly-count"
          header="Vastauksia:"
          value={withinWeek.filter((load) => !load.imputed).length}
          reference_value={meanWeeklyCount}
          description="Kiirekyselyn vastauksia 7 vrk sisään vs. viikot keskimäärin"
          percentage={false}
        />
      </div>
    </>
  );
}
