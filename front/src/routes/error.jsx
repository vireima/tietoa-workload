import { useRouteError } from "react-router";

export default function Error() {
  const error = useRouteError();
  console.error(error);

  return (
    <div>
      <p>error :(</p>
      <p>{error.statusText || error.messgae}</p>
    </div>
  );
}
