import Timeline from "./Timeline";
import Load from "./Load";
import Density from "./Density";
import Trend from "./Trend";
import impute from "../utils/impute";
import { DateTime, Interval } from "luxon";
import Comments from "./Comments";
import NoData from "./notifications/NoData";
import DateRangeFilterWidget from "./DateRangeFilterWidget";
import { useState } from "react";

export default function FilteredDashboard({
  users,
  filteredUsers,
  filteredWorkloads,
}) {
  const [startDate, setStartDate] = useState(DateTime.now().minus({ days: 7 }));
  const [endDate, setEndDate] = useState(DateTime.now());
  const minDate = DateTime.min(
    ...filteredWorkloads.map((load) => load.datetime_luxon)
  );

  const dateFilteredWorkloads = filteredWorkloads.filter((load) => {
    return load.datetime_luxon >= startDate && load.datetime_luxon <= endDate;
  });

  // const imputedWorkloads = impute(filteredWorkloads, startDate, endDate);
  const imputedWorkloads = impute(filteredWorkloads, minDate, endDate);

  return (
    <>
      {filteredWorkloads && filteredWorkloads?.length > 0 ? (
        <>
          <div className="column">
            <Timeline filteredLoads={dateFilteredWorkloads} />
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
