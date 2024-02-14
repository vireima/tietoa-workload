import { useOutletContext, useParams } from "react-router";
import Header from "./Header";
import NavigationColumn from "./NavigationColumn";
import Column from "./Column";
import TagFilter from "./TagFilter";
import Load from "./Load";
import TimelineChart from "./TimelineChart";
import DateRangeFilter from "./DateRangeFilter";
import { useState } from "react";
import { DateTime, Interval } from "luxon";
import DateRangeFilterWidget from "./DateRangeFilterWidget";
import UserFilter from "./UserFilter";
import Comments from "./Comments";
import Density from "./Density";

export default function UserPage() {
  const { users, workloads } = useOutletContext();

  const [startDate, setStartDate] = useState(DateTime.now().minus({ days: 7 }));
  const [endDate, setEndDate] = useState(DateTime.now());

  return (
    <>
      <div>
        <Header text={`Kiirekysely`} />
      </div>
      <div className="v2">
        <Column>
          <NavigationColumn users={users} />
        </Column>
        <DateRangeFilter
          workloads={workloads.data}
          users={users}
          startDate={startDate}
          endDate={endDate}
        >
          <Column>
            <TimelineChart />
            <Load />

            <DateRangeFilterWidget
              startDate={startDate}
              setStartDate={setStartDate}
              endDate={endDate}
              setEndDate={setEndDate}
            />
          </Column>
          <Column>
            <Density />
            <Comments />
          </Column>
        </DateRangeFilter>
      </div>
    </>
  );
}
