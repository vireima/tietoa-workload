import TimelineChart from "./TimelineChart";
import Load from "./Load";
import Density from "./Density";
import Trend from "./Trend";
import impute from "../utils/impute";
import { DateTime, Interval } from "luxon";
import Comments from "./Comments";
import NoData from "./notifications/NoData";
import DateRangeFilterWidget from "./DateRangeFilterWidget";
import { useState } from "react";
import TrellisChart from "./TrellisChart";
import ActivityChart from "./ActivityChart";
import TestFilter from "./TestFilter";
import TestFilterWidget from "./TestFilterWidget";

export default function FilteredDashboard({
  users,
  filteredUsers,
  filteredWorkloads,
}) {
  const [startDate, setStartDate] = useState(DateTime.now().minus({ days: 7 }));
  const [endDate, setEndDate] = useState(DateTime.now());
  const minDate = DateTime.min(
    ...filteredWorkloads.map((load) => load.datetime_luxon),
    startDate
  );

  const dateFilteredWorkloads = filteredWorkloads.filter((load) => {
    return load.datetime_luxon >= startDate && load.datetime_luxon <= endDate;
  });

  // const imputedWorkloads = impute(filteredWorkloads, startDate, endDate);
  const imputedWorkloads = impute(filteredWorkloads, minDate, endDate);
  const dateFilteredImputedWorkloads = imputedWorkloads.filter((load) => {
    return load.date_luxon >= startDate && load.date_luxon <= endDate;
  });

  return (
    <>
      {filteredWorkloads && filteredWorkloads?.length > 0 ? (
        <>
          <div className="column">
            <TestFilter filtered={["A", "B", "C"]} a={"kukka"}>
              <TestFilterWidget filtered={["123", "G"]} />
              <TestFilterWidget a={"kekkonen"} />
              <p>Testiriviä.</p>
            </TestFilter>
            <TimelineChart
              filteredLoads={dateFilteredWorkloads}
              imputedLoads={dateFilteredImputedWorkloads}
            />
            <TrellisChart filteredLoads={dateFilteredImputedWorkloads} />
            <ActivityChart filteredLoads={filteredWorkloads} />
            <Load filteredLoads={dateFilteredWorkloads} />
            <Density filteredLoads={dateFilteredWorkloads} />
          </div>
          <div className="column">
            <Trend
              users={filteredUsers}
              workloads={imputedWorkloads}
              range={Interval.fromDateTimes(startDate, endDate).length("days")}
            />
            <Comments users={users} workloads={dateFilteredWorkloads} />
            <DateRangeFilterWidget
              startDate={startDate}
              setStartDate={setStartDate}
              endDate={endDate}
              setEndDate={setEndDate}
            />
          </div>
        </>
      ) : (
        <div className="column">
          <NoData />
        </div>
      )}
    </>
  );
}
