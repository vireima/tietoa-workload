import { useOutletContext, useParams } from "react-router-dom";
import NavigationColumn from "./NavigationColumn";
import FilteredDashboard from "./FilteredDashboard";
import Header from "./Header";

export default function UserFilter() {
  const { users, workloads } = useOutletContext();
  const { user } = useParams();

  const filteredUsers = users.filter((userdata) => user === userdata.user);
  const filteredWorkloads = workloads.data.filter(
    (input) => user === input.user
  );

  console.log(user, filteredUsers);

  return (
    <div className="column">
      <div>
        <Header text={`Kiirekysely, ${filteredUsers[0].username}`} />
      </div>
      <div className="v2">
        <NavigationColumn users={users} />
        <FilteredDashboard
          users={users}
          filteredUsers={filteredUsers}
          filteredWorkloads={filteredWorkloads}
        />
      </div>
    </div>
  );
}
