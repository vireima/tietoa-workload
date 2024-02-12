import { Outlet, useLoaderData, defer, Await } from "react-router-dom";
import { config } from "../config";
import React from "react";
import axios from "axios";
import Loading from "../components/notifications/Loading";
import NoData from "../components/notifications/NoData";

export async function loader({ params }) {
  const usersPromise = axios
    .get(`${config.API_URL}/users`)
    .then((response) => response.data);
  const workloadDataPromise = axios
    .get(`${config.API_URL}/loads`)
    .then((response) => response.data);

  const allPromise = Promise.all([usersPromise, workloadDataPromise]).then(
    (values) => {
      return { users: values[0], workloads: values[1] };
    }
  );

  return defer({ data: allPromise });
}

export default function Data() {
  const loadedData = useLoaderData();
  return (
    <React.Suspense fallback={<Loading />}>
      <Await resolve={loadedData.data} errorElement={<NoData />}>
        {(data) => (
          <div className="v2">
            <Outlet context={data} />
          </div>
        )}
      </Await>
    </React.Suspense>
  );
}
