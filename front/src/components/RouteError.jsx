import { useRouteError } from "react-router";

export default function RouteError() {
  const error = useRouteError();
  console.error(error);

  return (
    <div>
      <p>error :(</p>
      <p>{error.statusText || error.message}</p>
    </div>
  );
}
