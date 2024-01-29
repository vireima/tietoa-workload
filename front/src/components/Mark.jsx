export default function Mark({ visible, success, size, position }) {
  const classes = `mark ${
    success === true ? "success" : success === false ? "fail" : "awaiting"
  }`;
  //   console.log(visible, position, success);
  return (
    <>
      {visible ? (
        <span
          className={classes}
          style={{
            width: size,
            height: size,
            left: position.x - size / 2.0,
            top: position.y - size / 2.0,
          }}
        ></span>
      ) : (
        <></>
      )}
    </>
  );
}
