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
import Density from "./Density";
import Comments from "./Comments";
import ActivityChart from "./ActivityChart";
import GroupedTimelineChart from "./GroupedTimelineChart";
import { Link } from "react-router-dom";

export default function UserPage() {
  const { users, workloads } = useOutletContext();
  const { user } = useParams();

  const [startDate, setStartDate] = useState(DateTime.now().minus({ days: 7 }));
  const [endDate, setEndDate] = useState(DateTime.now());

  const current_user = users.filter((userdata) => user === userdata.user)[0];

  console.log("UserPage workloads", workloads);

  return (
    <>
      <div>
        <Header text={`Kiirekysely, ${current_user.username}`} />
        <Link to={`/i/${user}`}>Lisää kiiremerkintä</Link>
      </div>
      <div className="v2">
        <Column>
          <NavigationColumn users={users} />
        </Column>
        <UserFilter workloads={workloads} users={users} userId={user}>
          <DateRangeFilter startDate={startDate} endDate={endDate}>
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
              <ActivityChart />
            </Column>
          </DateRangeFilter>
        </UserFilter>
      </div>
    </>
  );
}
