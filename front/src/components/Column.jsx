import React from "react";

export default function Column(props) {
  const { children, ...other } = props;
  return (
    <div className="column">
      {React.Children.map(props.children, (child) => {
        return React.cloneElement(child, other);
      })}
    </div>
  );
}
