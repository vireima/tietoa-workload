import CSVDownload from "./CSVDownload";

export default function Footer({ users, workloads }) {
  return (
    <div className="footer">
      Kiirekysely - <CSVDownload users={users} workloads={workloads.data} />
    </div>
  );
}
