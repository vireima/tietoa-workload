import Loading from "./Loading";

export default function NoData({ text }) {
  return <span className="text">{text ?? "Ei mittaustuloksia."}</span>;
}
