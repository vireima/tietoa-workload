import { useLoaderData } from "react-router";

import ClickableCanvas from "../components/ClickableCanvas";

export default function Input() {
  const { user } = useLoaderData();
  return <ClickableCanvas user={user} />;
}
