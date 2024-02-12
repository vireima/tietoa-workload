import { Link, useOutletContext, useParams } from "react-router-dom";
import Display from "../routes/display";
import Timeline from "./Timeline";
import Load from "./Load";
import Density from "./Density";
import Trend from "./Trend";
import impute from "../utils/impute";
import { DateTime } from "luxon";
import Comments from "./Comments";
import NoData from "./notifications/NoData";

export default function TagFilter() {
  const { users, workloads } = useOutletContext();
  const { tag } = useParams();

  const tags = users
    .flatMap((user) => user.tags)
    .filter((tag, index, array) => array.indexOf(tag) == index);

  const filteredUsers = users.filter((userdata) => userdata.tags.includes(tag));
  const filteresUserIDs = filteredUsers.map((userdata) => userdata.user);
  const filteredWorkloads = workloads.data.filter((input) =>
    filteresUserIDs.includes(input.user)
  );

  const imputed = impute(
    filteredWorkloads,
    DateTime.now().minus({ days: 18 }),
    DateTime.now()
  );
  console.log("iIMPP", imputed);
  const imputedWorkloads = imputed.filter((input) =>
    filteresUserIDs.includes(input.user)
  );

  console.log("tag:", tag);
  console.log("users:", filteredUsers);
  console.log("workloads.data:", filteredWorkloads);

  // return <Display users={filteredUsers} workloads={filteredWorkloads} />;
  return (
    <>
      <div className="column">
        {tags.map((tg) => (
          <Link
            key={tg}
            to={`../${tg}`}
            relative="path"
            className={`navigation${tg == tag ? " selected" : ""}`}
          >
            {tg}
          </Link>
        ))}
      </div>
      {filteredWorkloads && filteredWorkloads?.length > 0 ? (
        <>
          <div className="column">
            <Trend users={filteredUsers} workloads={imputedWorkloads} />
            <Display users={filteredUsers} workloads={filteredWorkloads} />
            <Timeline filteredLoads={filteredWorkloads} />
            <Load filteredLoads={filteredWorkloads} />
            <Density filteredLoads={filteredWorkloads} />
          </div>
          <div className="column">
            <Comments users={filteredUsers} workloads={filteredWorkloads} />
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
