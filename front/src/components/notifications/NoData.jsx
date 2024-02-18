export default function NoData({ text }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%",
        minHeight: "3em",
      }}
    >
      <span className="invalid-content">{text ?? "Ei mittaustuloksia."}</span>
    </div>
  );
}
