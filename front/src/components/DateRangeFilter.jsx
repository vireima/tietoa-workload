import React from "react";
import impute from "../utils/impute";
import { DateTime, Interval } from "luxon";
import NoData from "./notifications/NoData";

export default function DateRangeFilter({
  users,
  workloads,
  children,
  startDate,
  endDate,
}) {
  const minDate = DateTime.min(
    ...workloads.map((load) => load.datetime_luxon),
    startDate
  );

  const userdataById = new Map(new Set(users.map((user) => [user.user, user])));

  const renderChildren = () => {
    const dateFilteredWorkloads = workloads.filter((load) => {
      return load.datetime_luxon >= startDate && load.datetime_luxon <= endDate;
    });

    const imputedWorkloads = impute(workloads, minDate, endDate);
    const dateFilteredImputedWorkloads = imputedWorkloads.filter((load) => {
      return load.date_luxon >= startDate && load.date_luxon <= endDate;
    });

    dateFilteredImputedWorkloads.forEach((load) => {
      load.username = userdataById.get(load.user).username;
    });

    console.log("DateRangeFilter filteredWorkloads", dateFilteredWorkloads);

    return dateFilteredImputedWorkloads.length > 0 ? (
      React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          users: users,
          workloads: dateFilteredWorkloads,
          imputed: dateFilteredImputedWorkloads,
        });
      })
    ) : (
      <NoData />
    );
  };

  return <>{renderChildren()}</>;
}
