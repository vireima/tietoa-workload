import { useLoaderData } from "react-router";

import ClickableCanvas from "../components/ClickableCanvas";

export default function Input() {
  const { user } = useLoaderData();
  console.log(user);
  return <ClickableCanvas user={user} />;
}
