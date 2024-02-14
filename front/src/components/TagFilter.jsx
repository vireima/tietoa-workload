import React from "react";

export default function TagFilter({ users, workloads, tag, children }) {
  const renderChildren = () => {
    const filteredUsers = users.filter((userdata) =>
      userdata.tags.includes(tag)
    );
    const filteredUserIDs = filteredUsers.map((userdata) => userdata.user);
    const filteredWorkloads = workloads.data.filter((input) =>
      filteredUserIDs.includes(input.user)
    );

    return React.Children.map(children, (child) => {
      return React.cloneElement(child, {
        users: filteredUsers,
        workloads: filteredWorkloads,
      });
    });
  };

  return <>{renderChildren()}</>;
}
