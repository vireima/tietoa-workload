import React from "react";

export default function TestFilter(props) {
  const renderChildren = () => {
    return React.Children.map(props.children, (child) => {
      return React.cloneElement(child, {
        filtered: props.filtered.filter((f) => f !== "A"),
      });
    });
  };
  return <div>{renderChildren()}</div>;
}
