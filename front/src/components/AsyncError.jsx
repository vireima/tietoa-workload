import { useAsyncError, useRouteError } from "react-router";

export default function AsyncError() {
  const error = useAsyncError();
  console.error(error);

  return (
    <div>
      <p>error :(</p>
      <p>{error.message}</p>
    </div>
  );
}
