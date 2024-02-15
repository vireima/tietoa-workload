import { useOutletContext, useParams } from "react-router";

import ClickableCanvas from "../components/ClickableCanvas";
import NoData from "../components/notifications/NoData";

export default function FastInput() {
  const { user } = useParams();

  return <ClickableCanvas user={{ user: user }} />;
}
