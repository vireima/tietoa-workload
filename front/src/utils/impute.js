import { DateTime, Duration, Interval } from "luxon";
import { mean } from "simple-statistics";

function calculateDailyMeans(data) {
  const byDate = Object.groupBy(data, (value) => value.date);
  const calculatedDailyMeans = [];

  Object.keys(byDate).forEach((date) =>
    calculatedDailyMeans.push({
      workload: mean(byDate[date].map((x) => x.workload)),
      mentalload: mean(byDate[date].map((x) => x.mentalload)),
      date: DateTime.fromISO(date),
    })
  );

  calculatedDailyMeans.sort((a, b) => (a.date < b.date ? -1 : 1));
  return calculatedDailyMeans;
}

function imputeArray(data, minDate, maxDate) {
  data.forEach((value) => (value.date = value.datetime_luxon.toISODate()));

  const calculatedDailyMeans = calculateDailyMeans(data);

  const interval = Interval.fromDateTimes(
    minDate.startOf("day"),
    maxDate.endOf("day")
  );
  const allDates = interval.splitBy(Duration.fromObject({ days: 1 }));

  // Main imputation loop
  let i = 0;
  const imputed = allDates.map((dateInterval, index, array) => {
    const date = dateInterval.start;
    const lastValue = calculatedDailyMeans[i];

    // Case A, imputing before (or at) the first value in data
    if (date <= lastValue.date) {
      return {
        workload: lastValue.workload,
        mentalload: lastValue.mentalload,
        date_luxon: date,
        imputed: !date.hasSame(lastValue.date, "day"),
      };

      // Case B, imputing between to values in data
    } else if (i + 1 < calculatedDailyMeans.length) {
      const nextValue = calculatedDailyMeans[i + 1];

      // Linear interpolation between two values
      if (date < nextValue.date) {
        const lenMax = Interval.fromDateTimes(
          lastValue.date,
          nextValue.date
        ).length("days");
        const lenCurrent = Interval.fromDateTimes(lastValue.date, date).length(
          "days"
        );
        const ratio = lenCurrent / lenMax;

        return {
          workload:
            lastValue.workload * (1 - ratio) + nextValue.workload * ratio,
          mentalload:
            lastValue.mentalload * (1 - ratio) + nextValue.mentalload * ratio,
          date_luxon: date,
          imputed: true,
        };

        // We're at a value in date; proceed and move to the next interval
      } else {
        i += 1;
        return {
          workload: nextValue.workload,
          mentalload: nextValue.mentalload,
          date_luxon: date,
          imputed: !date.hasSame(nextValue.date, "day"),
        };
      }

      // Case C, imputing after the last value in data
    } else {
      const nextValue = calculatedDailyMeans[calculatedDailyMeans.length - 1];

      return {
        workload: nextValue.workload,
        mentalload: nextValue.mentalload,
        date_luxon: date,
        imputed: true,
      };
    }
  });

  return imputed;
}

export default function impute(data, minDate, maxDate) {
  const byUser = Object.groupBy(data, ({ user }) => user);

  const imputed = [];
  Object.keys(byUser).forEach((user) =>
    imputed.push(
      ...imputeArray(byUser[user], minDate, maxDate).map((val) => {
        const newVal = { ...val, user: user };
        newVal.date = newVal.date_luxon.toISODate();
        return newVal;
      })
    )
  );

  return imputed;
}
