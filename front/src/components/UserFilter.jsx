import React from "react";

export default function UserFilter({ users, workloads, userId, children }) {
  const renderChildren = () => {
    const user = users.filter((userdata) => userdata.user === userId);
    const filteredWorkloads = workloads.data.filter(
      (input) => userId === input.user
    );

    return React.Children.map(children, (child) => {
      return React.cloneElement(child, {
        users: users,
        workloads: filteredWorkloads,
      });
    });
  };

  return <>{renderChildren()}</>;
}
