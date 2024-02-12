import { Tooltip } from "react-tooltip";

export default function StatisticWidget({
  name,
  header,
  value,
  reference_value,
  description,
  percentage,
}) {
  const percentageFormatter = new Intl.NumberFormat("fi-FI", {
    style: "percent",
    maximumFractionDigits: 0,
  });
  const unitFormatter = new Intl.NumberFormat("fi-FI", {
    maximumFractionDigits: 0,
  });

  return (
    <>
      <div
        className="kpi-values widget"
        data-tooltip-id={name}
        data-tooltip-html={description}
        data-tooltip-place="top"
      >
        <h3>{header}</h3>
        {percentage ? (
          <>
            <span className="latest-value">
              {percentageFormatter.format(value)}
            </span>
            <span className="trend-value">
              ({percentageFormatter.format(reference_value)})
            </span>
          </>
        ) : (
          <>
            <span className="latest-value">{unitFormatter.format(value)}</span>
            <span className="trend-value">
              ({unitFormatter.format(reference_value)})
            </span>
          </>
        )}
      </div>
      <Tooltip id={name} />
    </>
  );
}
