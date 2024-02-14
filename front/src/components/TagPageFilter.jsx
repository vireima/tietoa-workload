import { useOutletContext, useParams } from "react-router-dom";
import NavigationColumn from "./NavigationColumn";
import FilteredDashboard from "./FilteredDashboard";
import Header from "./Header";

export default function TagPageFilter() {
  const { users, workloads } = useOutletContext();
  const { tag } = useParams();

  const filteredUsers = users.filter((userdata) => userdata.tags.includes(tag));
  const filteredUserIDs = filteredUsers.map((userdata) => userdata.user);
  const filteredWorkloads = workloads.data.filter((input) =>
    filteredUserIDs.includes(input.user)
  );

  return (
    <div className="column">
      <div>
        <Header text={`Kiirekysely ${tag}`} />
      </div>
      <div className="v2">
        <NavigationColumn users={users} tag={tag} />
        <FilteredDashboard
          users={users}
          filteredUsers={filteredUsers}
          filteredWorkloads={filteredWorkloads}
        />
      </div>
    </div>
  );
}
