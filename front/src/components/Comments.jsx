import { DateTime } from "luxon";
import NoData from "./notifications/NoData";
import { Link } from "react-router-dom";

export default function Comments({ users, workloads }) {
  const format = {
    weekday: "short",
    year: "numeric",
    day: "numeric",
    month: "numeric",
  };

  const usernames = new Map(
    new Set(users.map((user) => [user.user, user.username]))
  );
  const comments = workloads.filter((load) => load.comment);
  comments.forEach((comment) => {
    comment.luxonDate = DateTime.fromISO(comment.datetime).setLocale("fi-FI");
  });

  const minDate = DateTime.min(...comments.map((comment) => comment.luxonDate));
  const maxDate = DateTime.max(...comments.map((comment) => comment.luxonDate));

  return (
    <div className="widget">
      <div style={{ margin: "1em 2em" }}>
        {comments && comments?.length > 0 ? (
          <>
            <h3>Kommentit</h3>
            <p>
              Väliltä {minDate.toLocaleString(format)} ..{" "}
              {maxDate.toLocaleString(format)}{" "}
            </p>
            <ul className="data-list content-comments">
              {comments.map((comment, index) => (
                <li key={index}>
                  <span className="content-date">
                    {comment.luxonDate.toLocaleString(format)}
                  </span>
                  <span className="content-username">
                    <Link to={`/v2/u/${comment.user}`} relative="path">
                      {usernames.get(comment.user)}
                    </Link>
                  </span>
                  : <span className="content-comment">{comment.comment}</span>
                </li>
              ))}
            </ul>
          </>
        ) : (
          <NoData text={"Ei kommentteja."} />
        )}
      </div>
    </div>
  );
}
