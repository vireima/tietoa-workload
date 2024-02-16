import { useParams } from "react-router";

import ClickableCanvas from "../components/ClickableCanvas";

export default function FastInput() {
  const { user } = useParams();

  return <ClickableCanvas user={{ user: user }} />;
}
