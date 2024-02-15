import { useOutletContext, useParams } from "react-router";

import ClickableCanvas from "../components/ClickableCanvas";
import NoData from "../components/notifications/NoData";

export default function Input() {
  const { users } = useOutletContext();
  const { user } = useParams();

  const userdata = users.filter((u) => user === u.user);

  return userdata && userdata.length === 1 ? (
    <ClickableCanvas user={userdata[0]} />
  ) : (
    <NoData />
  );
}
