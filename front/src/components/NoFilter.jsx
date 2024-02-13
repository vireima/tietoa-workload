import { useOutletContext, useParams } from "react-router-dom";
import NavigationColumn from "./NavigationColumn";
import FilteredDashboard from "./FilteredDashboard";
import Header from "./Header";

export default function NoFilter() {
  const { users, workloads } = useOutletContext();

  return (
    <div className="column">
      <div>
        <Header text={`Kiirekysely, kaikki tulokset`} />
      </div>
      <div className="v2">
        <NavigationColumn users={users} />
        <FilteredDashboard
          users={users}
          filteredUsers={users}
          filteredWorkloads={workloads.data}
        />
      </div>
    </div>
  );
}
