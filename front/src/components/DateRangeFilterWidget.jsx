import { useState } from "react";
import { DateTime, Interval } from "luxon";

export default function DateRangeFilterWidget({
  startDate,
  setStartDate,
  endDate,
  setEndDate,
}) {
  const recalculateRange = (a, b) => {
    return Interval.fromDateTimes(a, b).length("days");
  };

  const [range, setRange] = useState(recalculateRange(startDate, endDate));

  const handleEndDateChange = (e) => {
    if (e.target.value) {
      const endDate = DateTime.fromISO(e.target.value).setLocale("fi-FI");

      if (endDate > startDate) {
        setEndDate(endDate);
        setRange(recalculateRange(startDate, endDate));
      }
    }
  };

  const handleStartDateChange = (e) => {
    if (e.target.value) {
      const startDate = DateTime.fromISO(e.target.value).setLocale("fi-FI");

      if (startDate < endDate) {
        setStartDate(startDate);
        setRange(recalculateRange(startDate, endDate));
      }
    }
  };

  const handleRangeChange = (e) => {
    console.log(e.target.value);

    setRange(Number(e.target.value));

    const startDate = endDate.minus({ days: Number(e.target.value) });
    setStartDate(startDate);
  };

  return (
    <div className="widget" style={{ flexDirection: "column" }}>
      <div style={{ flexDirection: "row" }}>
        <div>
          <input
            type="datetime-local"
            onChange={handleStartDateChange}
            value={startDate.toFormat("yyyy-MM-dd'T'HH:mm")}
            id="startdate"
          />
          <label htmlFor="startdate">Alkupäivä</label>
        </div>
        <div>
          <input
            type="datetime-local"
            onChange={handleEndDateChange}
            value={endDate.toFormat("yyyy-MM-dd'T'HH:mm")}
            id="enddate"
          />
          <label htmlFor="enddate">Loppupäivä</label>
        </div>
      </div>
      <div>
        <label htmlFor="dateRange">{range} päivää</label>
        <input
          type="range"
          min="1"
          max="60"
          value={range}
          id="dateRange"
          onChange={handleRangeChange}
          style={{ direction: "rtl" }}
        />
      </div>
    </div>
  );
}
